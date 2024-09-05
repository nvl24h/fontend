import apiClient from "@/instance.api.js";

export const collectionAPI = {
    getCollections: () => apiClient.get("/collections"),
    createCollection: (data) => apiClient.post("/collections", data),
    updateCollection: (id, data) => apiClient.put(`/collections/${id}`, data),
    deleteCollection: (id) => apiClient.delete(`/collections/${id}`),
};
