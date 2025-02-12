import api from "./api.js";

export default {
    getAllStudents() {
        return api().get("/api/v1/students");
    },
};