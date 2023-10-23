package com.server.backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.server.backend.models.Comment;

import java.util.List;
import java.util.Optional;


@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer>, JpaSpecificationExecutor<Comment> {
    Optional<Comment> findById(int id);

    Page<Comment> findAll(Pageable pageable);

 }
