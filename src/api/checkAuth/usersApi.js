import apiClient from "../instanceApi";

export const userAPI = {
    createUser: (data) => apiClient.post("/users/signup", data),
    login: (data) => apiClient.post("users/login", data),
};
