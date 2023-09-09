package com.server.backend.services;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.*;
import java.util.List;

import com.server.backend.dto.response.ErrorResponse;
import com.server.backend.enums.FileQuality;
import com.server.backend.models.FileUploaded;
import com.server.backend.models.User;
import com.server.backend.utils.FileHandler;
import com.server.backend.utils.ImageHandler;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.server.backend.repositories.FileRepository;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;


@Service
public class FileService {
    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private ImageHandler imageHandler;

    @Autowired
    private AmazonS3Service amazonS3Service;

    public Page<FileUploaded> getFiles(Map<String, String> params) {
        Pageable pageable = null;
        int limit = 0;
        int page = 0;
        if (params.get("limit") == null) {
            params.put("limit", "5");
        }

        if (params.get("page") == null || Integer.parseInt(params.get("page")) < 1) {
            params.put("page", "1");
        }
        try {
            limit = Integer.parseInt(params.get("limit"));
            page = Integer.parseInt(params.get("page"));
            pageable = PageRequest.of(page - 1, limit);
        } catch (NumberFormatException numberFormatException) {
            return null;
        }
        return fileRepository.findAll(pageable);
    }

    // check the file has enough condition to push on Amazon or not
    public ResponseEntity<?> checkFile(MultipartFile multipartFile) {
        File file = FileHandler.multipartToFile(multipartFile);
        if (multipartFile.getContentType().startsWith("image/")) {
            ResponseEntity response = imageHandler.checkFile(file);
            file.delete();
            return response;
        }
        return null;
    }


    public FileUploaded getFileById(String id) {
        int intId = 0;
        try {
            intId = Integer.parseInt(id);

        } catch (Exception err) {
            return null;
        }
        return fileRepository.findById(intId).orElse(null);
    }

    public FileUploaded getFileById(Integer id) {
        return fileRepository.findById(id).orElse(null);
    }
    // upload file to Amazone
    @Transactional
    public FileUploaded uploadFile(MultipartFile multipartFile) {
        File file = FileHandler.multipartToFile(multipartFile);
        Map<String, String> result = new HashMap<>();

        if (multipartFile.getContentType().startsWith("image/")) {
            for (FileQuality fileQuality : FileQuality.values()) {

                // not handle avatar type
                if(fileQuality == FileQuality.AVATAR) continue;
                // if root file -> upload
                if (fileQuality == FileQuality.ROOT) {
                    result.put(fileQuality.name().toLowerCase(), amazonS3Service.uploadFile(file, fileQuality));
                    continue;
                }

                // else process file before upload
                File processedFile = imageHandler.resizedFile(file, imageHandler.getSize(fileQuality));

                if (fileQuality != FileQuality.DISPLAY) {
                    File copyRight = imageHandler.addCopyRight(processedFile);
                    result.put(fileQuality.name().toLowerCase(), amazonS3Service.uploadFile(copyRight, fileQuality));
                    copyRight.delete();
                }
                else
                    result.put(fileQuality.name().toLowerCase(), amazonS3Service.uploadFile(processedFile, fileQuality));
                processedFile.delete();
            }
        }
        var fileUploaded = FileUploaded.builder();
        fileUploaded.low(result.get("low"));
        fileUploaded.medium(result.get("medium"));
        fileUploaded.high(result.get("high"));
        fileUploaded.root(result.get("root"));
        fileUploaded.display(result.get("display"));
        fileUploaded.price(0.0);
        fileUploaded.user((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        fileUploaded.isActive(true);
        return fileUploaded.build();
    }


    public FileUploaded saveFile(FileUploaded fileUploaded) {
        return fileRepository.save(fileUploaded);
    }

}
