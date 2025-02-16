import api from "./api.js";

export default {
    getAllStudents() {
        return api().get("/api/v1/students");
    },
    addStudent(student) {
        return api().post("api/v1/students", student, {
            headers: {"Content-Type": "application/json"}
        });
    }
};