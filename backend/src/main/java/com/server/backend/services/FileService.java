package com.server.backend.services;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

import com.server.backend.dto.FileUploadedDTO;
import com.server.backend.dto.request.UpdateFileRequest;
import com.server.backend.dto.response.ErrorResponse;
import com.server.backend.enums.FileQuality;
import com.server.backend.models.*;
import com.server.backend.repositories.specification.FileSpecification;
import com.server.backend.utils.FileHandler;
import com.server.backend.utils.ImageHandler;
import com.server.backend.utils.Pagination;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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
    private ReceiptService receiptService;

    @Autowired
    private ImageHandler imageHandler;

    @Autowired
    private AmazonS3Service amazonS3Service;

    @Autowired
    private TagService tagService;

    @Autowired
    private FileSpecification fileSpecification;

    @Autowired
    private Pagination pagination;

    // get files
    public Page<FileUploadedDTO> getFiles(Map<String, String> params, boolean isAllowUnActived) {


        // pagination
        Pageable pageable = pagination.page(params.get("page"), params.get("limit"));

        // query
        List<Specification> specs = new ArrayList<>();

        if (!isAllowUnActived) specs.add(fileSpecification.activeFiles());
        if (params.get("kw") != null) specs.add(fileSpecification.fileTags(params.get("kw")));
        if (params.get("fromPrice") != null && !params.get("fromPrice").isEmpty()) specs.add(fileSpecification.fromPrice(Double.parseDouble(params.get("fromPrice"))));
        if (params.get("toPrice") != null && !params.get("toPrice").isEmpty()) specs.add(fileSpecification.toPrice(Double.parseDouble(params.get("toPrice"))));
        if (params.get("type") != null) specs.add(fileSpecification.fileType(List.of(params.get("type").split(","))));


        Page<FileUploaded> page = fileRepository.findAll(specs.stream()
                .reduce(Specification.where(null), Specification::and), pageable);

        List<FileUploadedDTO> dtoList = page
                .getContent()
                .stream()
                .map(FileUploadedDTO::new)
                .collect(Collectors.toList());
        Page<FileUploadedDTO> dtoPage = new PageImpl<>(dtoList, page.getPageable(), page.getTotalElements());

        return dtoPage;
    }

    // get file by id
    public FileUploaded getFileById(String id) {
        int intId = 0;
        try {
            intId = Integer.parseInt(id);
        } catch (Exception err) {
            return null;
        }
        return fileRepository.findById(intId).orElse(null);
    }

    // get file by id
    public FileUploaded getFileById(Integer id) {
        return fileRepository.findById(id).orElse(null);
    }

    // get gile by user id
    public Page<FileUploaded> getFileByUserId(Map<String, String> params) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // pagination
        Pageable pageable = pagination.page(params.get("page"), params.get("limit"));
        Page<FileUploaded> page = fileRepository.findByUserId(user.getId(), pageable);

        return page;
    }

    // check the file has enough condition to push on Amazon or not
    public ResponseEntity<?> checkFile(MultipartFile multipartFile) {
        File file = FileHandler.multipartToFile(multipartFile);
        if (multipartFile.getContentType().startsWith("image/")) {
            ResponseEntity response = imageHandler.checkFile(file);
            file.delete();
            return response;
        }
        return ResponseEntity.badRequest().body(new ErrorResponse(String.format("Không hỗ trợ loại file này", multipartFile.getContentType())));
    }

    // upload file to Amazone
    @Transactional
    public FileUploaded uploadFile(MultipartFile multipartFile) {
        File file = FileHandler.multipartToFile(multipartFile);
        BufferedImage image = FileHandler.fileToBufferedImage(file);
        Map<String, String> result = new HashMap<>();

        if (multipartFile.getContentType().startsWith("image/")) {
            for (FileQuality fileQuality : FileQuality.values()) {

                // not handle avatar type
                if (fileQuality == FileQuality.AVATAR) continue;
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
                } else
                    result.put(fileQuality.name().toLowerCase(), amazonS3Service.uploadFile(processedFile, fileQuality));
                processedFile.delete();
            }
        }
        var fileUploaded = FileUploaded.builder();
        fileUploaded.medium(result.get("medium"));
        fileUploaded.high(result.get("high"));
        fileUploaded.root(result.get("root"));
        fileUploaded.display(result.get("display"));
        fileUploaded.size(multipartFile.getSize());
        fileUploaded.width(image.getWidth());
        fileUploaded.height(image.getHeight());
        fileUploaded.type(FileHandler.getTypeFromMultiPart(multipartFile));
        fileUploaded.user((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        fileUploaded.isActive(true);

        return fileUploaded.build();
    }

    // save file
    public FileUploaded saveOrUpdateFile(FileUploaded fileUploaded, UpdateFileRequest request) {
        if (fileUploaded.getId() != null) {
            fileUploaded.setTag(tagService.saveAllTags(request.getTags()));
            fileUploaded.setPrice(request.getPrice());
            fileUploaded.setTitle(request.getTitle());
            fileUploaded.setIsActive(request.getIsActive());
        }
        return fileRepository.save(fileUploaded);
    }

    // download
    public ResponseEntity downloadFile(UsageRight usageRight, double targetWidth, double targetHeight) {
        byte[] data = amazonS3Service.downloadFile(usageRight.getFile());
        File outputFile = new File("outputFile." + usageRight.getFile().getType());
        try (FileOutputStream outputStream = new FileOutputStream(outputFile)) {
            outputStream.write(data);
            File file = imageHandler.resizedFile(outputFile, targetWidth, targetHeight);
            outputFile.delete();
            data = Files.readAllBytes(Paths.get(file.getPath()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        ByteArrayResource resource = new ByteArrayResource(data);
        return ResponseEntity
                .ok()
                .contentLength(data.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment")
                .body(resource);

    }

    // delete
    @Transactional
    public FileUploaded deleteFile(int id) {
        FileUploaded fileUploaded = this.getFileById(id);
        List<Receipt> receiptList = receiptService.getReceiptsContainFile(fileUploaded);
        FileUploaded tmp = FileUploaded.builder()
                .display(fileUploaded.getDisplay())
                .medium(fileUploaded.getMedium())
                .high(fileUploaded.getHigh())
                .root(fileUploaded.getRoot())
                .build();

        // set file null in receipt
        for (Receipt receipt : receiptList) {
            receipt.setFiles((receipt.getFiles().stream().map(file -> {
                if (file.getId() != id) return file;
                else return null;
            }).collect(Collectors.toSet())));
            receiptService.saveOrUpdate(receipt);
        }
        // delete file
        fileRepository.deleteById(id);

        return tmp;
    }
}
