package com.server.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.backend.models.Receipt;



@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, Integer> {
}
