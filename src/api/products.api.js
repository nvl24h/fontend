import apiClient from "@/instance.api.js";

export const productAPI = {
    getProducts: () => apiClient.get("/products"),
    createProduct: (data) => apiClient.post("/products", data),
    updateProduct: (id, data) => apiClient.put(`/products/${id}`, data),
    deleteProduct: (id) => apiClient.delete(`/products/${id}`),
};
