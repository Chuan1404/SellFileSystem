package com.server.backend.services;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;

import com.server.backend.dto.FileUploadedDTO;
import com.server.backend.dto.request.UpdateFileRequest;
import com.server.backend.dto.response.ErrorResponse;
import com.server.backend.enums.FileQuality;
import com.server.backend.enums.UserRole;
import com.server.backend.models.FileUploaded;
import com.server.backend.models.User;
import com.server.backend.utils.FileHandler;
import com.server.backend.utils.ImageHandler;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.server.backend.repositories.FileRepository;
import org.springframework.web.multipart.MultipartFile;



@Service
public class FileService {
    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private ImageHandler imageHandler;

    @Autowired
    private AmazonS3Service amazonS3Service;

    @Autowired
    private TagService tagService;

    // get
    public Page<FileUploadedDTO> getFiles(Map<String, String> params) {
        Pageable pageable = null;
        int limit = 0;
        int pageNumber = 0;
        if (params.get("limit") == null) {
            params.put("limit", "15");
        }

        if (params.get("page") == null || Integer.parseInt(params.get("page")) < 1) {
            params.put("page", "1");
        }
        try {
            limit = Integer.parseInt(params.get("limit"));
            pageNumber = Integer.parseInt(params.get("page"));
            pageable = PageRequest.of(pageNumber - 1, limit);
        } catch (NumberFormatException numberFormatException) {
            return null;
        }
        Page<FileUploaded> page = fileRepository.findAll(pageable);
        List<FileUploadedDTO> dtoList = page
                .getContent()
                .stream()
                .map(FileUploadedDTO::new)
                .collect(Collectors.toList());
        Page<FileUploadedDTO> dtoPage = new PageImpl<>(dtoList, page.getPageable(), page.getTotalElements());

        return dtoPage;
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

    // check the file has enough condition to push on Amazon or not
    public ResponseEntity<?> checkFile(MultipartFile multipartFile) {
        File file = FileHandler.multipartToFile(multipartFile);
        if (multipartFile.getContentType().startsWith("image/")) {
            ResponseEntity response = imageHandler.checkFile(file);
            file.delete();
            return response;
        }
        return ResponseEntity.badRequest().body(new ErrorResponse(String.format("Not support this file type", multipartFile.getName())));
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
        fileUploaded.user((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        fileUploaded.isActive(true);
        return fileUploaded.build();
    }

    public FileUploaded updateByRequest(Integer id, UpdateFileRequest request) {
        FileUploaded fileUploaded = fileRepository.findById(id).orElse(null);

        return this.saveOrUpdateFile(fileUploaded, request);
    }

    public FileUploaded saveOrUpdateFile(FileUploaded fileUploaded, UpdateFileRequest request) {
        if(fileUploaded.getId() > 0) {
            fileUploaded.setTag(tagService.saveAllTags(request.getTags()));
            fileUploaded.setPrice(request.getPrice());
            fileUploaded.setTitle(request.getTitle());
        }
        return fileRepository.save(fileUploaded);

    }

}
