import apiClient from "./apiClient";

export const postAPI = {
    getPosts: () => apiClient.get("/posts"),
    createPost: (data) => apiClient.post("/posts", data),
    updatePost: (id, data) => apiClient.put(`/posts/${id}`, data),
    deletePost: (id) => apiClient.delete(`/posts/${id}`),
};
