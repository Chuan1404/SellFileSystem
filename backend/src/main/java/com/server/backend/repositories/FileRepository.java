package com.server.backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.backend.models.FileUploaded;



@Repository
public interface FileRepository extends JpaRepository<FileUploaded, Integer> {
    Page<FileUploaded> findAll(Pageable pageable);
}
