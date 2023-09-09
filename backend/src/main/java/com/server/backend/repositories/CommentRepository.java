package com.server.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.backend.models.Comment;


@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
