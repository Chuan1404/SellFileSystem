package com.server.backend.repositories;

import com.server.backend.models.UsageRight;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsageRightRepository extends JpaRepository<UsageRight, Integer> {
    Optional<UsageRight> findByUserIdAndFileId(String userId, int fileId);
    Page<UsageRight> findByUserId(String userId, Pageable pageable);

    @Query(value = "SELECT u FROM UsageRight u JOIN u.file f where f.id = :id")
    List<UsageRight> findByFileId(Integer id);
}
