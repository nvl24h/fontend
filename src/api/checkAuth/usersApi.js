import apiClient from "../instanceApi";

export const userAPI = {
    createUser: (data) => apiClient.post("/users/signup", data), // Điều chỉnh đúng endpoint
};
