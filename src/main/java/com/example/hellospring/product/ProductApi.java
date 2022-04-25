package com.example.hellospring.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping(path = "/api/v1/products")
public class ProductApi {
    @Autowired
    ProductRepository productRepository;

    @GetMapping
    public List<Product> getProductList() {
        return productRepository.findAll();
    }

    @PostMapping
    public Product create(@RequestBody Product product) {
        productRepository.save(product);
        return product;
    }

    @GetMapping(path = "/{id}")
    public Product detail(@PathVariable int id) {
        return productRepository.findById(id).get();
    }

    @PutMapping(path = "/{id}")
    public Product update(@PathVariable int id, @RequestBody Product update) {
        Product product = productRepository.findById(id).get();
        product.setDescription(update.getDescription());
        product.setPrice(update.getPrice());
        product.setName(update.getName());
        product.setStatus(update.getStatus());
        productRepository.save(product);

        return product;
    }

    @DeleteMapping(path = "/{id}")
    public boolean delete(@PathVariable int id) {
        try {
            productRepository.deleteById(id);
            return true;
        } catch (Exception ignored) {
        }
        return false;
    }
}
