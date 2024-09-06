import { defineStore } from "pinia";
import { userAPI } from "@/api/index.js";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        error: null,
        loading: false,
        redirect: null,
    }),

    actions: {
        async signUp(userData) {
            this.loading = true;
            this.error = null; // Đặt lại lỗi trước khi gửi request
            this.redirect = "/login"; // Đặt giá trị redirect sau khi đăng ký thành công

            try {
                const response = await userAPI.createUser(userData);
                this.user = response.data;
                this.loading = false;
            } catch (error) {
                this.loading = false;
                // Gán thông báo lỗi cụ thể hơn nếu có, nếu không thì đặt "Something went wrong"
                this.error = error.response?.data?.message || "Something went wrong";
            }
        },

        // Hành động để xử lý chuyển hướng
        handleRedirect(router) {
            if (this.redirect) {
                setTimeout(() => {
                    router.push(this.redirect);
                }, 3000); // Chuyển hướng sau 3 giây
            }
        },
    },
});
