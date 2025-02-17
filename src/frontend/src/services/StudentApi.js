import api from "./api.js";

export default {
    getAllStudents() {
        return api().get("/api/v1/students")
    },
    addStudent(student) {
        return api().post("api/v1/students", student, {
            headers: {"Content-Type": "application/json"}
        });
    },
    deleteStudent(Id) {
        return api().delete(`api/v1/students/${Id}`);
    },
    updateStudent(id, studentData) {
        return api().put(`/api/v1/students/${id}`, studentData, {
            headers: { "Content-Type": "application/json" }
        });
    },
};