package com.server.backend.repositories.specification;

import com.server.backend.models.Comment;
import com.server.backend.models.FileUploaded;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class CommentSpecification {

    public Specification<Comment> ofFile(int fileId) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("file").get("id"), fileId);

    }

    public Specification<Comment> sortByTime() {
        return (root, query, criteriaBuilder) ->
        {
            query.orderBy(criteriaBuilder.desc(root.get("createdDate")));
            return null;
        };

    }
}
