package com.server.backend.models;

import java.time.LocalDateTime;
import java.util.Set;

import com.server.backend.enums.PaymentMethod;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Receipt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Double totalPrice;
    private LocalDateTime createdDate;

    @Enumerated(EnumType.STRING)
    private PaymentMethod method;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToMany
    @JoinTable(name = "receipt_file", joinColumns = @JoinColumn(name = "receipt_id"), inverseJoinColumns = @JoinColumn(name = "file_id"))
    private Set<FileUploaded> files;
}
