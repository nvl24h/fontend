<template>
    <div id="app">
        <component :is="layout">
            <router-view></router-view>
        </component>
    </div>
</template>

<script>
import DefaultLayout from "./layout/DefaultLayout.vue";
import AuthLayout from "./layout/AuthLayout.vue";

export default {
    name: "App",
    computed: {
        layout() {
            const route = this.$route;
            return route.meta.layout ? (route.meta.layout === "AuthLayout" ? AuthLayout : DefaultLayout) : DefaultLayout;
        },
    },
};
</script>

<style scoped></style>
