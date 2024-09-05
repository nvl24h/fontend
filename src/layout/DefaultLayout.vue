<!-- src/layouts/DefaultLayout.vue -->
<template>
    <div id="app">
        <header>
            <!-- Nội dung của header -->
            <nav>
                <router-link to="/">Home</router-link>
                <router-link to="/login">Login</router-link>
                <router-link to="/signup">Sign Up</router-link>
            </nav>
        </header>

        <main>
            <router-view></router-view>
        </main>

        <footer>
            <!-- Nội dung của footer -->
            <p>© 2024 Your Company</p>
        </footer>
    </div>
</template>

<script>
export default {
    name: "DefaultLayout",
};
</script>

<style>
/* CSS cho DefaultLayout */
</style>
