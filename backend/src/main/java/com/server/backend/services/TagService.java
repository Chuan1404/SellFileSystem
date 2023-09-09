package com.server.backend.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.backend.models.Tag;
import com.server.backend.repositories.TagRepository;

@Service
public class TagService {
    @Autowired
    private TagRepository tagRepository;

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public Tag getTagById(int id) {
        return tagRepository.findById(id).get();
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
