package com.schoolplatform.app.student;


import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public void addStudent(Student student) throws BadRequestException {
        boolean existsEmail = studentRepository
                .selectExistsEmail(student.getEmail());
        if(existsEmail) {
            throw new BadRequestException("Email " + student.getEmail() + " taken");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));

        studentRepository.delete(student);
    }

}
