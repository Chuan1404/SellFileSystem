package com.server.backend.services;

import java.util.*;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.server.backend.models.Tag;
import com.server.backend.repositories.TagRepository;

@Service
public class TagService {
    @Autowired
    private TagRepository tagRepository;


    public List<String> getTagsByKw(String kw) {
        return tagRepository.findByKw(kw);
    }

    public List<Tag> getTop() {
        return tagRepository.findTop();
    }

    @Transactional
    public Set<Tag> saveAllTags(Set<String> tags) {
        tags = tags.stream().filter(item -> !item.trim().isEmpty()).map(item -> item.trim().toLowerCase()).collect(Collectors.toSet());
        Set<Tag> toTags = new HashSet<>();

        for (String tagName : tags) {
            Tag existTag = tagRepository.findByName(tagName).orElse(null);
            if (existTag == null) {
                existTag = Tag.builder().name(tagName).build();
                tagRepository.save(existTag);
            }
            toTags.add(existTag);
        }
        return toTags;
    }
}
