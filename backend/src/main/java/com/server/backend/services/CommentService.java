package com.server.backend.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.server.backend.dto.request.AddCommentRequest;
import com.server.backend.models.User;
import com.server.backend.repositories.specification.CommentSpecification;
import com.server.backend.utils.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.server.backend.models.Comment;
import com.server.backend.repositories.CommentRepository;


@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private Pagination pagination;

    @Autowired
    private FileService fileService;

    @Autowired
    private CommentSpecification commentSpecification;

    public Page<Comment> getAllComments(Map<String, String> params) {
        // pagination
        Pageable pageable = pagination.page(params.get("page"), params.get("limit"));

        List<Specification> specs = new ArrayList<>();
        specs.add(commentSpecification.sortByTime());

        if (params.get("fileId") != null)
            specs.add(commentSpecification.ofFile(Integer.parseInt(params.get("fileId"))));

        return commentRepository.findAll(specs.stream().reduce(Specification.where(null), Specification::and), pageable);
    }

    public Comment getCommentById(int id) {
        return commentRepository.findById(id).orElse(null);
    }

    public Comment addComment(AddCommentRequest request) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var comment = Comment.builder();
        if (user != null) {
            comment.content(request.content);
            comment.user(user);
            comment.file(fileService.getFileById(request.fileId));
            comment.createdDate(LocalDateTime.now());
        }

        return commentRepository.save(comment.build());
    }
}
