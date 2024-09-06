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
export default {
    name: "Login",

    props: {
        text: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            email: "",
            password: "",
            emailError: null,
            passwordError: null,
        };
    },

    methods: {
        handleSubmit() {
            // Đặt lại các thông báo lỗi
            this.nameError = null;
            this.emailError = null;
            this.passwordError = null;

            // Kiểm tra email hợp lệ
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.email.trim()) {
                this.emailError = "Email is required";
            } else if (!emailPattern.test(this.email)) {
                this.emailError = "Please enter a valid email";
            }

            // Kiểm tra mật khẩu
            if (!this.password.trim()) {
                this.passwordError = "Password is required";
            } else if (this.password.length < 6) {
                this.passwordError = "Password must be at least 6 characters long";
            }

            // Nếu không có lỗi, submit form
            if (!this.emailError && !this.passwordError) {
                // Gọi API hoặc xử lý logic đăng ký
                console.log("Form submitted:", {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                });

                // Ví dụ gửi API
                // axios.post('/api/register', {
                //   name: this.name,
                //   email: this.email,
                //   password: this.password
                // })
                // .then(response => console.log('Success', response))
                // .catch(error => console.error('Error', error));
            }
        },
    },
};
</script>
<style scoped>
/* =============form sign up */
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
    width: fit-content; /* Thay đổi từ 100% sang fit-content */
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
