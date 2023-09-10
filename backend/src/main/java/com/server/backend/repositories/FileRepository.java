package com.server.backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.server.backend.models.FileUploaded;



@Repository
public interface FileRepository extends JpaRepository<FileUploaded, Integer> {
    @Query("SELECT DISTINCT f from Receipt r join r.files f where r.user.id = :userId")
    Page<FileUploaded> findPaid(String userId, Pageable pageable);
}
