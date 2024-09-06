<template>
    <div id="auth">
        <div id="container">
            <div id="box--left"></div>
            <div id="box--right">
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
        currentComponent() {
            const route = this.$route;
            // Chọn thành phần dựa trên đường dẫn
            return route.path === "/login" ? Login : Signup;
        },

        textProps() {
            const route = this.$route;
            return route.path === "/login" ? "Đăng Nhập" : "Đăng Ký";
        },
    },
};
</script>

<style scoped>
#auth {
    background: #ffe6c9;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

#container {
    width: 1000px;
    height: 550px;
    background-color: white;
    display: flex;
    padding: 10px;
    border-radius: 30px;
    max-width: calc(100% - 48px);
    max-height: calc(100% - 48px);
}

#box--left {
    width: 60%;
    background-image: url("../../public/images/auth/illustration.png");
    object-fit: cover;
    background-repeat: no-repeat;
    background-size: 100%;
    border-radius: 20px 0 0 20px;
    background-position: center;
}

#box--right {
    width: 40%;
}
</style>
