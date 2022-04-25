package com.example.hellospring.article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

enum status {
    unActive,
    active,
    deleted
}

@Service
public class ArticleService {
    @Autowired
    ArticleRepository ArticleRepository;
    public List<Article> getList(String category,String title,int pageIndex,int pageSize) {
//        if (pageSize==0){
//            return ArticleRepository.search(category,title,status.active.ordinal());
//        }
        return ArticleRepository.search(category,title,status.active.ordinal());
    }

    public Article addArticle(Article Article) {
        Article.setStatus(status.active.ordinal());
        return ArticleRepository.save(Article);
    }

    public Optional<Article> findById(int id) {
        return ArticleRepository.findById(id);
    }

    public Article updateArticle(int id, Article update) {
//        Article find = ArticleRepository.findById(id).get();
        Optional<Article> optionalArticle = findById(id);
        if (!optionalArticle.isPresent()) {
            return null;
        }
        Article existArticle = optionalArticle.get();
        existArticle.setTitle(update.getTitle());
        existArticle.setDescription(update.getDescription());
        existArticle.setThumbnail(update.getThumbnail());
        existArticle.setContent(update.getContent());
        existArticle.setCategory(update.getCategory());
        existArticle.setStatus(update.getStatus());
        return ArticleRepository.save(existArticle);
    }

    public Article deleteArticle(int id){
//        ArticleRepository.deleteById(id);
        Optional<Article> optionalArticle = findById(id);
        if (!optionalArticle.isPresent()) {
            return null;
        }
        Article existArticle = optionalArticle.get();
        existArticle.setStatus(status.deleted.ordinal());
        return ArticleRepository.save(existArticle);

    }
}
