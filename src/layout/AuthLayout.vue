<!-- src/layouts/AuthLayout.vue -->
<template>
    <div id="auth">
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
export default {
    name: "AuthLayout",
};
</script>

<style>
/* CSS cho AuthLayout */
.signup__logo {
    width: 100px;
}
</style>
