<template>
    <div class="login">
        <div class="login__header">
            <h1 class="login__title">{{ text }}</h1>
        </div>

        <form class="login__form" @submit.prevent="handleSubmit">
            <div class="login__form-item">
                <label for="email" class="login__label">Email <span>*</span></label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    class="login__input"
                    placeholder="Enter your email"
                    autocomplete="email"
                    v-model="email"
                />
                <p v-if="emailError" class="login__error">{{ emailError }}</p>
            </div>

            <div class="login__form-item">
                <label for="password" class="login__label">Password <span>*</span></label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    class="login__input"
                    placeholder="Enter your password"
                    autocomplete="new-password"
                    v-model="password"
                />
                <p v-if="passwordError" class="login__error">{{ passwordError }}</p>
            </div>

            <button type="submit" class="login__button">Login</button>
        </form>
    </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "vue3-toastify";

export default {
    name: "Login",
    props: {
        text: {
            type: String,
            required: true,
        },
    },
    setup() {
        const router = useRouter();
        const authStore = useAuthStore();
        const email = ref("");
        const password = ref("");
        const emailError = ref(null);
        const passwordError = ref(null);
        const error = ref(null);

        const handleSubmit = async () => {
            // Đặt lại các thông báo lỗi
            emailError.value = null;
            passwordError.value = null;

            // Kiểm tra email hợp lệ
            if (!email.value.trim()) {
                emailError.value = "Email is required";
            }

            // Kiểm tra mật khẩu
            if (!password.value.trim()) {
                passwordError.value = "Password is required";
            }

            // Nếu không có lỗi, submit form
            if (!emailError.value && !passwordError.value) {
                // API
                const userData = { email: email.value, password: password.value };
                await authStore.logIn(userData);

                if (authStore.error) {
                    error.value = authStore.error;
                    toast.error("Tài khoản không chính xác");
                } else {
                    // Call handleRedirect to perform redirection
                    await authStore.handleRedirect(router);
                    toast.success("Đăng nhập thành công");
                }
            }
        };

        return {
            email,
            password,
            emailError,
            passwordError,
            error,
            handleSubmit,
        };
    },
};
</script>

<style scoped>
.login {
    width: 100%;
}

.login__header {
}

.login__title {
    color: #525252;
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 1.75;
    margin: 0 auto;
    display: block;
    width: fit-content;
}

.login__form {
    width: 80%;
    margin: 0 auto;
    max-width: 300px;
}

.login__form-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 10px;
}

.login__required,
.login__form-item p {
    color: red;
}

.login__form-item input {
    border: 1px solid #333;
    height: 30px;
    border-radius: 3px;
    outline: none;
}

.login__button {
    height: 40px;
    width: 120px;
    border-radius: 30px;
    border: 1px solid;
    background: #ffe6c9;
    margin: 30px auto;
    display: block;
    cursor: pointer;
    outline: none;
}

.login__button:hover {
    opacity: 0.8;
}

.login__error {
    font-size: 0.8rem;
}
</style>
