<template>
    <div class="signup">
        <div class="signup__header">
            <h1 class="signup__title">{{ text }}</h1>
        </div>

        <form class="signup__form" @submit.prevent="handleSubmit">
            <div class="signup__form-item">
                <label for="name" class="signup__label">Name<span class="signup__required">*</span></label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    class="signup__input"
                    placeholder="Enter your name"
                    v-model="name"
                />
                <p v-if="nameError" class="signup__error">{{ nameError }}</p>
            </div>

            <div class="signup__form-item">
                <label for="email" class="signup__label">Email<span class="signup__required">*</span></label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    class="signup__input"
                    placeholder="Enter your email"
                    v-model="email"
                />
                <p v-if="emailError" class="signup__error">{{ emailError }}</p>
            </div>

            <div class="signup__form-item">
                <label for="password" class="signup__label">Password<span class="signup__required">*</span></label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    class="signup__input"
                    placeholder="Enter your password"
                    v-model="password"
                />
                <p v-if="passwordError" class="signup__error">{{ passwordError }}</p>
            </div>

            <button type="submit" class="signup__button">Register</button>
            <p v-if="error" class="signup__error">{{ error }}</p>
        </form>
    </div>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

export default {
    name: "Signup",

    props: {
        text: {
            type: String,
            required: true,
        },
    },

    setup() {
        const authStore = useAuthStore();
        const router = useRouter();
        const name = ref("");
        const email = ref("");
        const password = ref("");
        const nameError = ref(null);
        const emailError = ref(null);
        const passwordError = ref(null);
        const error = ref(null);

        const handleSubmit = async () => {
            // Reset error messages
            nameError.value = emailError.value = passwordError.value = null;
            error.value = null;

            // Validate input
            if (!name.value.trim()) {
                nameError.value = "Name is required";
            }
            if (!email.value.trim()) {
                emailError.value = "Email is required";
            }
            if (!password.value.trim()) {
                passwordError.value = "Password is required";
            } else if (password.value.length < 6) {
                passwordError.value = "Password must be at least 6 characters";
            }

            // If no validation errors, submit the form
            if (!nameError.value && !emailError.value && !passwordError.value) {
                const userData = { name: name.value, email: email.value, password: password.value };
                await authStore.signUp(userData);

                if (authStore.error) {
                    error.value = authStore.error;
                    toast.warning("Tài khoản tồn tại");
                } else {
                    // Call handleRedirect to perform redirection
                    authStore.handleRedirect(router);
                    toast.success("Đăng ký thành công! Sẽ được chuyển hướng đăng nhập trong 3s");
                }
            }
        };

        return {
            name,
            email,
            password,
            nameError,
            emailError,
            passwordError,
            error,
            handleSubmit,
        };
    },
};
</script>

<style scoped>
/* =============form sign up */
.signup {
    width: 100%;
}

.signup__header {
}

.signup__title {
    color: #525252;
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 1.75;
    margin: 0 auto;
    display: block;
    width: fit-content; /* Thay đổi từ 100% sang fit-content */
}

.signup__form {
    width: 80%;
    margin: 0 auto;
    max-width: 300px;
}

.signup__form-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 10px;
}

.signup__required,
.signup__form-item p {
    color: red;
}

.signup__form-item input {
    border: 1px solid #333;
    height: 30px;
    border-radius: 3px;
    outline: none;
}

.signup__button {
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

.signup__button:hover {
    opacity: 0.8;
}

.signup__error {
    font-size: 0.8rem;
}
</style>
