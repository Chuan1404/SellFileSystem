package com.server.backend.controllers;

import com.server.backend.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/tag")
@CrossOrigin
public class TagController {
    @Autowired
    private TagService tagService;

    @PostMapping("/add")
    public ResponseEntity<?> addTags(@RequestBody Set<String> tagNames) {
        return ResponseEntity.ok(tagService.saveAllTags(tagNames));
    }
}
