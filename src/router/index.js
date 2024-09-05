import Dashboardview1 from "@/views/DashboardView1.vue";
import LoginSignupView from "@/views/LoginSignupView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "login",
            component: LoginSignupView,
            meta: { layout: "AuthLayout" },
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: Dashboardview1,
            meta: { layout: "DefaultLayout", requiresAuth: true },
        },
        {
            path: "/:pathMatch(.*)*", // Catch-all route
            name: "not-found",
            component: NotFoundView,
        },
    ],
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = false; // Thay thế bằng logic xác thực của bạn
    if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
        next("/"); // Nếu route yêu cầu xác thực và chưa xác thực, chuyển hướng đến /login
    } else {
        next(); // Cho phép truy cập nếu không yêu cầu xác thực hoặc đã xác thực
    }
});

export default router;
