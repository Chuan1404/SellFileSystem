package com.server.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.server.backend.models.Tag;

import java.util.List;
import java.util.Optional;


@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {
    Optional<Tag> findByName(String name);

    @Query("select t.name from Tag t where t.name like :kw%")
    List<String> findByKw(String kw);

    List<Tag> findAll();
    @Query(value = "select * from Tag t limit 10", nativeQuery = true)
    List<Tag> findTop();
}
