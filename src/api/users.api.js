import apiClient from "./apiClient";

export const userAPI = {
    getUsers: () => apiClient.get("/users"),
    createUser: (data) => apiClient.post("/users", data),
    updateUser: (id, data) => apiClient.put(`/users/${id}`, data),
    deleteUser: (id) => apiClient.delete(`/users/${id}`),
};
