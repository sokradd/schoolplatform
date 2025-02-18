# School Platform 2025

<img src="./assets/header.png">

# Student Management System API


## Technology stack

- Frontend: Built with React and Vite for a fast and optimized development experience.
- Backend: Developed with Java 21, using Maven for project build management.
- Backend Framework: Spring Boot with Spring Data JPA, utilizing Lombok for reducing boilerplate code.
- Database:
    - Primary: PostgreSQL 17.3
    - Testing: H2 (in-memory)
- Containerization: Managed with Docker and Docker Compose.

## Project Architecture


- For this project was used 3-Tier Architecture.
- For student entity was created own Controller, Service, Repository(JPA)

## Student description


- A Student has an ID (id), full name (name), email (email) and gender (enum)

## Project Diagram

<img src="./assets/projectdiagram.png">

## API

### Requests

*For all these requests, Content-Type is `application/json`*

| Method   | Url                     | Passing Properties                                                                 | Description                                 | Example passing props                                                            |
|----------|-------------------------|------------------------------------------------------------------------------------|---------------------------------------------|----------------------------------------------------------------------------------|
| **GET**  | _`/api/v1/students`_    | -                                                                                  | Return a list of students                   | -                                                                                |
| **POST** | _`/api/v1/students`_    | JSON { "name": STRING ,  "email": STRING, "gender": "GENDER.(MALE,FEMALE,OTHER)" } | Create a new student with passed properties | { "name": "Ozzy Osbourne", "email": "ozzy.osbourne@mail.com", "gender": "MALE" } |
| **DEL**  | _`/api/v1/students/id`_ | -                                                                                  | Deleting a student                          | -                                                                                |
| **PUT**  | _`/api/v1/students/id`_ | JSON { "name": STRING ,  "email": STRING, "gender": "GENDER.(MALE,FEMALE,OTHER)" } | Update an existing student                  | { "name": "Ryan Gosling", "email": "ryan.gosling@mail.com", "gender": "MALE" }   |

## Handled Exceptions

| **Exception**                                      | **Where It's Used**              | **Trigger Condition**                                  | **HTTP Status**     |
|----------------------------------------------------|----------------------------------|--------------------------------------------------------|---------------------|
| `BadRequestException`      <br/>(Custom Exception) | `StudentService.addStudent()`    | When a **student with the same email already exists**  | **400 Bad Request** |
| `StudentNotFoundException` <br/>(Custom Exception) | `StudentService.deleteStudent()` | When trying to **delete a student that doesn't exist** | **404 Not Found**   |

<br><br>
___

<div align="center"><img src="./assets/postman.png"width="180" alt="postman"/></div>

___

### Example Requests with Postman

> #### *Get All Students*
>
> <img src="./assets/getallstudentsrequest.png">

> #### *Add Student*
>
> <img src="./assets/addstudentrequest.png">

> #### *Delete Student*
>
> <img src="./assets/deletestudentrequest.png">

> #### *Edit Student*
>
> <img src="./assets/editstudentrequest.png">

## Testing

### Test Structure

- `StudentIT` – Integration tests for student-related functionality.
- `StudentRepositoryTest` – Tests for the student repository layer.
- `StudentServiceTest` – Tests for business logic in the student service.
- `application.properties` – Main configuration for tests.
- `application-it.properties` – Configuration for integration tests.

### Example of testing
> #### *StudentIT*
>
> <img src="./assets/studentit.png">

> #### *StudentRepositoryTest*
>
> <img src="./assets/studentrepositorytest.png">

> #### *StudentServiceTest*
>
> <img src="./assets/studentservicetest.png">

## UI Example 

> #### *Main Page*
> 
> <img src="./assets/uiexample1.png">

> #### *Main Page + Student Drawer(Add New Student) + Notification*
><img src="./assets/popnotificationaddingstudent.png">
> <img src="./assets/uiexampleaddingstudent.png">


> #### *Edit Student*
>
> <img src="./assets/uiexampleeditstudent.png">

> #### *Delete Student*
>
> <img src="./assets/deletestudentpopconfirmation.png">