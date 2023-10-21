package com.server.backend.repositories;

import com.server.backend.models.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.server.backend.models.FileUploaded;

import java.util.List;
import java.util.Set;


@Repository
public interface FileRepository extends JpaRepository<FileUploaded, Integer>, JpaSpecificationExecutor<FileUploaded> {
    Page<FileUploaded> findAll(Pageable pageable);

    Page<FileUploaded> findByUserId(String id, Pageable pageable);
}
