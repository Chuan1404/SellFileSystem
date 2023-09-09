package com.server.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.backend.models.Favorite;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
}
