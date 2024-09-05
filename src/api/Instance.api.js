import axios from "axios";
import Cookies from "js-cookie"; // Dùng cho refreshToken trong cookie

const apiClient = axios.create({
    baseURL: "https://api.azz.icu",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "x-api-key":
            "e8055c44bc0693e18f3e5cf32b6dc393c6e7f4d86fd92e88a930a3e8f9b7028b3d880481b22e6695da262192f05b93af73e40608fdedddc03c49cb98116c4318",
    },
});

// Hàm lấy accessToken và x-user-id từ localStorage
const getAuthHeaders = () => {
    const accessToken = localStorage.getItem("authorization");
    const userId = localStorage.getItem("x-user-id");

    let headers = {};

    if (accessToken) {
        headers["authorization"] = `Bearer ${accessToken}`;
    }

    if (userId) {
        headers["x-user-id"] = userId;
    }

    return headers;
};

// Interceptor request: Thêm accessToken và x-user-id nếu có
apiClient.interceptors.request.use(
    (config) => {
        // Lấy các headers liên quan đến xác thực
        const authHeaders = getAuthHeaders();

        // Gộp các header vào config
        config.headers = {
            ...config.headers,
            ...authHeaders,
        };

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor response: Xử lý refresh token khi accessToken hết hạn
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = Cookies.get("refreshToken"); // Lấy refreshToken từ cookie

            if (refreshToken) {
                try {
                    const response = await axios.post("https://api.azz.icu/auth/refresh", {
                        refreshToken,
                    });

                    const newAccessToken = response.data.accessToken;

                    // Lưu lại accessToken mới vào localStorage
                    localStorage.setItem("authorization", newAccessToken);

                    // Cập nhật lại header cho request ban đầu
                    originalRequest.headers["authorization"] = `Bearer ${newAccessToken}`;

                    return apiClient(originalRequest); // Gửi lại request với token mới
                } catch (err) {
                    return Promise.reject(err);
                }
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
