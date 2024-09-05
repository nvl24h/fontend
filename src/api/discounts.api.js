import apiClient from "@/instance.api.js";

export const discountAPI = {
    getDiscounts: () => apiClient.get("/discounts"),
    createDiscount: (data) => apiClient.post("/discounts", data),
    updateDiscount: (id, data) => apiClient.put(`/discounts/${id}`, data),
    deleteDiscount: (id) => apiClient.delete(`/discounts/${id}`),
};
