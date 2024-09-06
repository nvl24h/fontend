<template>
    <div>
        <h1>{{ text }}</h1>
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
};
</script>
