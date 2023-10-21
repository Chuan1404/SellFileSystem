package com.server.backend.models;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.server.backend.enums.FileType;
import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;
import org.hibernate.annotations.Fetch;

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
    private String medium;
    private String high;

    @Enumerated(EnumType.STRING)
    private FileType type;
    private long size;
    private int width;
    private int height;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToMany
    @JoinTable(name = "file_tag", joinColumns = @JoinColumn(name = "file_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> Tag;


}
