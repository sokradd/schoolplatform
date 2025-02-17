package com.schoolplatform.app.student;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


@DataJpaTest
public class StudentRepositoryTest {

    @Autowired
    private StudentRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void isShouldCheckWhenStudentEmailExists() {
        //given
        String email = "oleksii@gmail.com";
        Student student = new Student(
                "Oleksii Json",
                email,
                Gender.MALE
        );
        underTest.save(student);
        //when
        boolean expected = underTest.selectExistsEmail(email);
        //then
        assertThat(expected).isTrue();

    }
    @Test
    void isShouldCheckWhenStudentEmailDoesNotExists() {
        //given
        String email = "oleksii@gmail.com";

        //when
        boolean expected = underTest.selectExistsEmail(email);
        //then
        assertThat(expected).isFalse();

    }
}
