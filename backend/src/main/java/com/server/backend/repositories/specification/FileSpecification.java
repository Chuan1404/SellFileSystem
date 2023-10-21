package com.server.backend.repositories.specification;

import com.server.backend.enums.FileType;
import com.server.backend.models.FileUploaded;
import com.server.backend.models.Tag;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class FileSpecification {
    public Specification<FileUploaded> activeFiles() {
        return (root, query, criteriaBuilder) -> criteriaBuilder.isTrue(root.get("isActive"));
    }

    ;


    public Specification<FileUploaded> fileTags(String kw) {
        return (root, query, criteriaBuilder) -> {
            query.distinct(true);
            Join<FileUploaded, Tag> tagJoin = root.join("Tag");
            return criteriaBuilder.like(tagJoin.get("name"), "%" + kw + "%");
        };
    }

    public Specification<FileUploaded> fromPrice(double price) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.greaterThanOrEqualTo(root.get("price"), price);

    }

    public Specification<FileUploaded> toPrice(double price) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.lessThanOrEqualTo(root.get("price"), price);

    }

    public Specification<FileUploaded> fileType(List<String> types) {
        return (root, query, criteriaBuilder) ->
                root.get("type").in(types.stream().map(item -> FileType.valueOf(item)).collect(Collectors.toSet()));
    }
}
