package com.server.backend.controllers;


import com.server.backend.dto.response.ErrorResponse;
import com.server.backend.models.FileUploaded;
import com.server.backend.models.Tag;
import com.server.backend.services.AmazonS3Service;
import com.server.backend.services.FileService;
import com.server.backend.services.TagService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
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
    private AmazonS3Service amazonS3Service;

    @GetMapping(value = "/")
    public ResponseEntity<?> index(@RequestParam Map<String, String> params) {
        Page<FileUploaded> pages = fileService.getFiles(params);
        if (pages == null) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Parameter are not valid"));
        }
        return ResponseEntity.ok(pages);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> detail(@PathVariable String id) {
        FileUploaded fileUploaded = fileService.getFileById(id);
        if (fileUploaded == null) return ResponseEntity.badRequest().body(new ErrorResponse("File does not exist"));
        return ResponseEntity.ok(fileUploaded);
    }

    @PostMapping(value = "/check")
    public ResponseEntity<?> checkFile(@RequestParam(name = "file") MultipartFile multipartFile) {
        return fileService.checkFile(multipartFile);
    }

    @PostMapping(value = "/upload")
    @Transactional
    public ResponseEntity<?> uploadFile(@RequestParam(name = "file") MultipartFile multipartFile, @RequestParam(name = "tags") String tagStr, @RequestParam(name = "title") String title) {
        Set<Tag> tags = tagService.saveAllTags(Arrays.stream(tagStr.split(",")).collect(Collectors.toSet()));
        FileUploaded fileUploaded = fileService.uploadFile(multipartFile);
        fileUploaded.setTag(tags);
        fileUploaded.setTitle(title);

        fileService.saveFile(fileUploaded);

        return ResponseEntity.ok(fileUploaded);
    }

    @GetMapping(value = "/download/{id}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String id) {
        FileUploaded file = fileService.getFileById(id);
        byte[] data = amazonS3Service.downloadFile(file);
        ByteArrayResource resource = new ByteArrayResource(data);
        return ResponseEntity
        .ok()
        .contentLength(data.length)
        .header("Content-type", "application/octet-stream")
        .header("Content-disposition", "attachment")
        .body(resource);
    }
//
//    @GetMapping(value = "/delete/{filename}")
//    public ResponseEntity<String> deleteFile(@PathVariable String filename) {
//        return ResponseEntity.ok(amazonS3Service.deleteFile(filename));
//    }
}
