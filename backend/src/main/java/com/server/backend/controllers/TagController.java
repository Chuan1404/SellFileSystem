package com.server.backend.controllers;

import com.server.backend.dto.response.Message;
import com.server.backend.models.Tag;
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

    @GetMapping("/")
    public ResponseEntity<?> getTagsByKw(@RequestParam(name = "q")  String kw) {
        return ResponseEntity.ok(tagService.getTagsByKw(kw));
    }

    @GetMapping("/top")
    public ResponseEntity<?> getTopTags() {
        List<String> tags = tagService.getTop().stream().map(tag -> tag.getName()).toList();
        return ResponseEntity.ok(tags);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addTags(@RequestBody Set<String> tagNames) {
        return ResponseEntity.ok(tagService.saveAllTags(tagNames));
    }
}
