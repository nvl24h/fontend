import axios from "axios";

// Create Instance bases
const apiClient = axios.create({
    baseURL: "https://api.azz.icu",
    headers: {
        "Content-Type": "application/json",
        "x-api-key":
            "e8055c44bc0693e18f3e5cf32b6dc393c6e7f4d86fd92e88a930a3e8f9b7028b3d880481b22e6695da262192f05b93af73e40608fdedddc03c49cb98116c4318",
    },
});

// Config Interceptors add headers a request
apiClient.interceptors.request.use(
    (config) => {
        const userId = localStorage("x-user-id") || null;
        const authorization = localStorage("authorization") || null;

        config.headers["x-user-id"] = userId;
        config.headers["authorization"] = authorization;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Export các hàm tương ứng cho từng endpoint
export const postAPI = {
    getPosts: () => apiClient.get("/posts"),
    createPost: (data) => apiClient.post("/posts", data),
    updatePost: (id, data) => apiClient.put(`/posts/${id}`, data),
    deletePost: (id) => apiClient.delete(`/posts/${id}`),
};

export const userAPI = {
    getUsers: () => apiClient.get("/users"),
    createUser: (data) => apiClient.post("/users", data),
    updateUser: (id, data) => apiClient.put(`/users/${id}`, data),
    deleteUser: (id) => apiClient.delete(`/users/${id}`),
};

export const productAPI = {
    getProducts: () => apiClient.get("/products"),
    createProduct: (data) => apiClient.post("/products", data),
    updateProduct: (id, data) => apiClient.put(`/products/${id}`, data),
    deleteProduct: (id) => apiClient.delete(`/products/${id}`),
};

// Tương tự tạo các module API cho collection, discount, cart, checkout...

export const collectionAPI = {
    getCollections: () => apiClient.get("/collections"),
    createCollection: (data) => apiClient.post("/collections", data),
    updateCollection: (id, data) => apiClient.put(`/collections/${id}`, data),
    deleteCollection: (id) => apiClient.delete(`/collections/${id}`),
};

export const discountAPI = {
    getDiscounts: () => apiClient.get("/discounts"),
    createDiscount: (data) => apiClient.post("/discounts", data),
    updateDiscount: (id, data) => apiClient.put(`/discounts/${id}`, data),
    deleteDiscount: (id) => apiClient.delete(`/discounts/${id}`),
};

export const cartAPI = {
    getCart: () => apiClient.get("/cart"),
    addToCart: (data) => apiClient.post("/cart", data),
    updateCart: (id, data) => apiClient.put(`/cart/${id}`, data),
    removeFromCart: (id) => apiClient.delete(`/cart/${id}`),
};

export const checkoutAPI = {
    checkout: (data) => apiClient.post("/checkout", data),
};

export default apiClient;
