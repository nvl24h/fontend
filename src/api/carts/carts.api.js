import apiClient from "@/instance.api.js";

export const cartAPI = {
    getCart: () => apiClient.get("/cart"),
    addToCart: (data) => apiClient.post("/cart", data),
    updateCart: (id, data) => apiClient.put(`/cart/${id}`, data),
    removeFromCart: (id) => apiClient.delete(`/cart/${id}`),
};
