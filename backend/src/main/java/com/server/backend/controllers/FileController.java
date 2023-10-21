package com.server.backend.controllers;


import com.server.backend.dto.FileUploadedDTO;
import com.server.backend.dto.request.UpdateFileRequest;
import com.server.backend.dto.response.ErrorResponse;
import com.server.backend.dto.response.Message;
import com.server.backend.models.FileUploaded;
import com.server.backend.models.Tag;
import com.server.backend.models.UsageRight;
import com.server.backend.services.AmazonS3Service;
import com.server.backend.services.FileService;
import com.server.backend.services.TagService;
import com.server.backend.services.UsageRightService;
import com.server.backend.utils.FileHandler;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.*;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/file")
@CrossOrigin
public class FileController {

    @Autowired
    private FileService fileService;

    @Autowired
    private TagService tagService;

    @Autowired
    private UsageRightService usageRightService;

    @Autowired
    private AmazonS3Service amazonS3Service;

    @GetMapping(value = "/")
    public ResponseEntity<?> index(@RequestParam Map<String, String> params) {
        Page<FileUploadedDTO> pages = fileService.getFiles(params, false);
        if (pages == null) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Parameter are not valid"));
        }
        return ResponseEntity.ok(pages);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> detail(@PathVariable String id) {
        FileUploaded fileUploaded = fileService.getFileById(id);

        if (fileUploaded == null) return ResponseEntity.badRequest().body(new ErrorResponse("File does not exist"));
        return ResponseEntity.ok(new FileUploadedDTO(fileUploaded));
    }

    @PostMapping(value = "/check")
    public ResponseEntity<?> checkFile(@RequestParam(name = "file") MultipartFile multipartFile) {
        return fileService.checkFile(multipartFile);
    }

    @PostMapping(value = "/upload")
    @Transactional
    public ResponseEntity<?> uploadFile(@RequestParam(name = "file") MultipartFile multipartFile, @RequestParam(name = "tags") String tagStr, @RequestParam(name = "title") String title, @RequestParam(name = "price") Double price) {
        Set<Tag> tags = tagService.saveAllTags(Arrays.stream(tagStr.split(",")).collect(Collectors.toSet()));
        FileUploaded fileUploaded = fileService.uploadFile(multipartFile);
        fileUploaded.setTag(tags);
        fileUploaded.setTitle(title);
        fileUploaded.setPrice(price);
        fileUploaded.setType(FileHandler.getTypeFromMultiPart(multipartFile));
        System.out.println(FileHandler.getTypeFromMultiPart(multipartFile));
        fileService.saveOrUpdateFile(fileUploaded, null);

        return ResponseEntity.ok(new FileUploadedDTO(fileUploaded));
    }

    @PostMapping(value = "/update/{id}")
    public ResponseEntity<?> uploadFile(@PathVariable Integer id, UpdateFileRequest updateFileRequest) {
        FileUploaded fileUploaded = fileService.getFileById(id);
        fileUploaded = fileService.saveOrUpdateFile(fileUploaded, updateFileRequest);
        return ResponseEntity.ok(new FileUploadedDTO(fileUploaded));
    }

    @GetMapping(value = "/download/{id}")
    public ResponseEntity<?> downloadFile(@PathVariable int id, @RequestParam double width, @RequestParam double height) {
        UsageRight usageRight = usageRightService.getUserRightByFileId(id);
        if(usageRightService.checkExpireDate(usageRight))
            return fileService.downloadFile(usageRight, width, height);
        return null;
    }

    @DeleteMapping (value = "/delete/{id}")
    public ResponseEntity<?> deleteFile(@PathVariable int id) {
        try {
            FileUploaded tmp = fileService.deleteFile(id);
            amazonS3Service.deleteFile(tmp);
        }
        catch (Exception exception) {
            System.out.println(exception.getMessage());
            return ResponseEntity.badRequest().body(new ErrorResponse(exception.getMessage()));
        }
            return ResponseEntity.ok(new Message("Xóa thành công"));
    }
}
