package com.schoolplatform.app.student;


import com.schoolplatform.app.student.exception.*;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.List;


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
        if (existsEmail) {
            throw new BadRequestException("Email " + student.getEmail() + " taken");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student with id " + id + " does not exist"));

        studentRepository.delete(student);
    }

    public void updateStudent(Long id, Student updatedStudent) throws BadRequestException {
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student with id " + id + " does not exist"));

        if (updatedStudent.getName() != null && !updatedStudent.getName().isEmpty()) {
            existingStudent.setName(updatedStudent.getName());
        }

        if (updatedStudent.getEmail() != null && !updatedStudent.getEmail().isEmpty()) {
            boolean existsEmail = studentRepository.selectExistsEmail(updatedStudent.getEmail());
            if (existsEmail && !existingStudent.getEmail().equals(updatedStudent.getEmail())) {
                throw new BadRequestException("Email " + updatedStudent.getEmail() + " is already taken");
            }
            existingStudent.setEmail(updatedStudent.getEmail());
        }

        if (updatedStudent.getGender() != null) {
            existingStudent.setGender(updatedStudent.getGender());
        }

        studentRepository.save(existingStudent);
    }

}
