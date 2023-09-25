package com.server.backend.dto;

import com.server.backend.models.FileUploaded;
import com.server.backend.models.Tag;
import com.server.backend.models.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FileUploadedDTO {

    private Integer id;
    private String title;
    private Double price;
    private Boolean isActive;
    private String root;
    private String display;
    private String low;
    private String medium;
    private String high;
    private UserDTO user;
    private Set<String> tags;
    public  FileUploadedDTO(FileUploaded fileUploaded) {
        this.id = fileUploaded.getId();
        this.title = fileUploaded.getTitle();
        this.price = fileUploaded.getPrice();
        this.isActive = fileUploaded.getIsActive();
        this.root = fileUploaded.getRoot();
        this.display = fileUploaded.getDisplay();
        this.low = fileUploaded.getLow();
        this.medium = fileUploaded.getMedium();
        this.high = fileUploaded.getHigh();
        this.user = new UserDTO(fileUploaded.getUser());
        this.tags = fileUploaded.getTag().stream().map(tag -> tag.getName().toString()).collect(Collectors.toSet());
    }
}
