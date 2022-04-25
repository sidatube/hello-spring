package com.example.hellospring.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin
@RestController
@RequestMapping(path = "/api/v1/students")
public class StudentApi {
    @Autowired
    StudentService studentService;

    @GetMapping
    public ResponseEntity<List<Student>> getList() {
        return ResponseEntity.ok(studentService.getList());
    }

    @PostMapping
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        return ResponseEntity.status(HttpStatus.CREATED).body(studentService.addStudent(student));
    }

    @GetMapping(path = "/{rollNumber}")
    public ResponseEntity<?> detail(@PathVariable String rollNumber) {
        Optional<Student> optionalStudent = studentService.findById(rollNumber);
        if (optionalStudent.isPresent()) {
            return ResponseEntity.ok(optionalStudent.get());
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping(path = "/{rollNumber}")
    public ResponseEntity<Student> updateStudent(@PathVariable String rollNumber, @RequestBody Student update) {

        return ResponseEntity.ok(studentService.updateStudent(rollNumber, update));
    }

    @DeleteMapping(path = "/{rollNumber}")
    public ResponseEntity<?> deleteStudent(@PathVariable String rollNumber) {
//
        if (studentService.deleteStudent(rollNumber)==null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
}
