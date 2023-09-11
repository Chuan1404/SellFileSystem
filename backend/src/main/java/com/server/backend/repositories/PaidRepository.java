package com.server.backend.repositories;

import com.server.backend.models.Paid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaidRepository extends JpaRepository<Paid, Integer> {
    Optional<Paid> findByUserIdAndFileId(String userId, int fileId);
    Page<Paid> findByUserId(String userId, Pageable pageable);
}
