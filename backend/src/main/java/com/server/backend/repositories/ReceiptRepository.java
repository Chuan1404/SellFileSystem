package com.server.backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.server.backend.models.Receipt;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, Integer> {

    Optional<Receipt> findByMomoId(String id);

    Page<Receipt> findByUserId(String userId, Pageable pageable);

    @Query(value = "SELECT r FROM Receipt r JOIN r.files f where f.id = :id")
    List<Receipt> findByFileId(Integer id);


    @Query(value = "SELECT DISTINCT year(r.createdDate) FROM Receipt r")
    List<Integer> getYearAvailable();
    @Query(value = "SELECT month(r.created_date) as 'month', sum(r.total_price) as 'revenue'\n" +
            "FROM Receipt r\n" +
            "where year(r.created_date) = :year\n" +
            "group by month(r.created_date)\n" +
            "order by month(r.created_date) asc", nativeQuery = true)
    List<Map> statisticByYear(int year);

}
