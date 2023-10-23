package com.server.backend.controllers;

import com.server.backend.dto.request.AddCommentRequest;
import com.server.backend.dto.response.ErrorResponse;
import com.server.backend.dto.response.Message;
import com.server.backend.models.Comment;
import com.server.backend.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/comment")
@CrossOrigin
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/")
    public ResponseEntity<?> getComment(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(commentService.getAllComments(params));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addComment(@RequestBody AddCommentRequest request) {
        Comment comment = commentService.addComment(request);
        if(comment == null) return ResponseEntity.badRequest().body(new ErrorResponse("Fail"));
        return ResponseEntity.ok(comment);
    }


}
