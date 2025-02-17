package com.schoolplatform.app.student;

import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/students")
@AllArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents() {
       return studentService.getAllStudents();
    }

    @PostMapping
    public void addStudent(@RequestBody Student student) throws BadRequestException {
        studentService.addStudent(student);
    }

    @DeleteMapping(path="{Id}")
    public void deleteStudent(
            @PathVariable("Id") Long studentId) {
     studentService.deleteStudent(studentId);
    }
}
