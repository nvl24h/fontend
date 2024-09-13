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
            this.error = null;
            this.redirect = null;

            try {
                const response = await userAPI.createUser(userData);
                this.user = response.data;
                this.loading = false;
                this.redirect = "/login";
            } catch (error) {
                this.loading = false;
                this.error = error.response?.data?.message || "Something went wrong";
            }
        },

        async logIn(userData) {
            this.loading = true;
            this.error = null;
            this.redirect = "/dashboard";

            try {
                console.log("---------------");
                const response = await userAPI.login(userData);
                this.loading = false;

                // Lưu thông tin vào localStorage
                const { _id, name, email } = response?.data?.metadata?.shop;
                const { accessToken, refreshToken } = response?.data?.metadata?.tokens;
                localStorage.setItem("userId", _id);
                localStorage.setItem("name", name);
                localStorage.setItem("email", email);
                localStorage.setItem("accessToken", accessToken);

                // Lưu refreshToken vào cookie
                if (refreshToken) {
                    const expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + 7); // Đặt cookie hết hạn sau 7 ngày
                    document.cookie = `refreshToken=${refreshToken}; expires=${expirationDate.toUTCString()}`;
                }

                this.user = response.data;
                console.log(this.user);
                this.redirect = "/dashboard";
            } catch (error) {
                this.loading = false;
                this.error = error.response?.data?.message || "Something went wrong";
            }
        },

        handleRedirect(router) {
            if (this.redirect) {
                setTimeout(() => {
                    router.push(this.redirect);
                }, 3000); // Chuyển hướng sau 3 giây
            }
        },
    },
});
