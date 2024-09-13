<template>
    <div class="auth">
        <div class="auth__container">
            <div class="auth__box--left"></div>
            <div class="auth__box--right">
                <img class="auth__logo" src="../assets/logo.png" alt="Logo" />
                <!-- Sử dụng component :is để chọn thành phần tương ứng -->
                <component :is="currentComponent" :text="textProps">
                    <router-view></router-view>
                    <!-- Để hiển thị nội dung của route con nếu cần -->
                </component>
            </div>
        </div>
    </div>
</template>

<script>
import Login from "@/components/auths/Login.vue";
import Signup from "@/components/auths/Signup.vue";

export default {
    name: "LoginSignup",
    computed: {
        // Trả về component dựa trên route
        currentComponent() {
            const path = this.$route.path.replace(/\/$/, ""); // Loại bỏ dấu `/` dư thừa ở cuối
            return path === "/login" ? Login : Signup;
        },

        // Trả về text dựa trên route
        textProps() {
            const path = this.$route.path.replace(/\/$/, ""); // Loại bỏ dấu `/` dư thừa ở cuối
            return path === "/login" ? "Đăng Nhập" : "Đăng Ký";
        },
    },
};
</script>

<style scoped>
.auth {
    background: #ffe6c9;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.auth__container {
    width: 1000px;
    height: 550px;
    background-color: white;
    display: flex;
    padding: 10px;
    border-radius: 30px;
    max-width: calc(100% - 48px);
    max-height: calc(100% - 48px);
}

.auth__box--left {
    width: 60%;
    background-image: url("../../public/images/auth/illustration.png");
    object-fit: cover;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 20px 0 0 20px;
    background-position: center;
}

.auth__box--right {
    width: 40%;
}

.auth__logo {
    display: block;
    width: 120px;
    margin: 0 auto;
    padding: 10% 0;
}
</style>
