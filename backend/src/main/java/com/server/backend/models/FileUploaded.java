package com.server.backend.models;

import java.util.Set;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "file")
@Builder
public class FileUploaded {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private Double price;
    private Boolean isActive;
    private String root;
    private String display;
    private String low;
    private String medium;
    private String high;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToMany
    @JoinTable(name = "file_tag", joinColumns = @JoinColumn(name = "file_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> Tag;

}
