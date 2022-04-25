package com.example.hellospring.student;

import org.hibernate.annotations.Where;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

enum status {
    unActive,
    active,
    deleted
}

@Service
public class StudentService {
    @Autowired
    StudentRepository studentRepository;
    public List<Student> getList() {
        return studentRepository.findAllByStatus(status.active.ordinal());
    }

    public Student addStudent(Student student) {
        student.setStatus(status.active.ordinal());
        return studentRepository.save(student);
    }

    public Optional<Student> findById(String id) {
        return studentRepository.findById(id);
    }

    public Student updateStudent(String id, Student update) {
//        Student find = studentRepository.findById(id).get();
        Optional<Student> optionalStudent = findById(id);
        if (!optionalStudent.isPresent()) {
            return null;
        }
        Student existStudent = optionalStudent.get();
        existStudent.setName(update.getName());
        existStudent.setStatus(update.getStatus());
        existStudent.setEmail(update.getEmail());
        existStudent.setAddress(update.getAddress());
        return studentRepository.save(existStudent);
    }

    public Student deleteStudent(String id){
//        studentRepository.deleteById(id);
        Optional<Student> optionalStudent = findById(id);
        if (!optionalStudent.isPresent()) {
            return null;
        }
        Student existStudent = optionalStudent.get();
        existStudent.setStatus(status.deleted.ordinal());
        return studentRepository.save(existStudent);

    }
}
