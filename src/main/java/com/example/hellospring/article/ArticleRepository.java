package com.example.hellospring.article;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Integer> {

    @Query(value = "select * from  articles a where a.category like %:category% and a.title like %:title% and a.status = :status", nativeQuery = true)
    Page<Article> search(@Param("category") String category, @Param("title") String title, @Param("status") int status, Pageable pageable);



}
