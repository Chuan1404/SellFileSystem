package com.server.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.backend.models.Tag;

import java.util.Optional;


@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {
    public boolean existsByName(String name);
    public Optional<Tag> findByName(String name);
}
