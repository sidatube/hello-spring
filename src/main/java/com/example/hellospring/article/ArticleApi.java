package com.example.hellospring.article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;


@CrossOrigin
@RestController
@RequestMapping(path = "/api/v1/articles")
public class ArticleApi {
    @Autowired
    ArticleService articleService;
    private static Logger LOGGER = Logger.getLogger(ArticleApi.class.getName());

    @GetMapping
    public ResponseEntity<Page<Article>> getList(@RequestParam(defaultValue = "") String category, @RequestParam(defaultValue = "") String title, @RequestParam(defaultValue = "1") int pageIndex, @RequestParam(defaultValue = "0") int pageSize) {
//        LOGGER.info(String.format("%s - %s - %d", category, title, status2.active.ordinal()));

        return ResponseEntity.ok(articleService.getList(category, title,pageIndex,pageSize));
    }

    @PostMapping
    public ResponseEntity<Article> addArticle(@RequestBody Article Article) {
        return ResponseEntity.status(HttpStatus.CREATED).body(articleService.addArticle(Article));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> detail(@PathVariable int id) {
        Optional<Article> optionalArticle = articleService.findById(id);
        if (optionalArticle.isPresent()) {
            return ResponseEntity.ok(optionalArticle.get());
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable int id, @RequestBody Article update) {

        return ResponseEntity.ok(articleService.updateArticle(id, update));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteArticle(@PathVariable int id) {
//
        if (articleService.deleteArticle(id) == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
}
