<!-- src/App.vue -->
<template>
    <component :is="layout">
        <!-- Nội dung chính của ứng dụng sẽ được hiển thị ở đây -->
        <router-view></router-view>
    </component>
</template>

<script>
import DefaultLayout from "./layout/DefaultLayout.vue";
import AuthLayout from "./layout/AuthLayout.vue";

export default {
    name: "App",
    computed: {
        layout() {
            const route = this.$route;
            // Xác định layout phù hợp dựa trên meta.layout
            return route.meta.layout ? (route.meta.layout === "AuthLayout" ? AuthLayout : DefaultLayout) : DefaultLayout;
        },
    },
};
</script>

<style scoped>
/* CSS cho App.vue nếu cần */
</style>
