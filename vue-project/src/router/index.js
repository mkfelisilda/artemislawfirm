import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import ReviewDataView from "../views/ReviewDataView.vue"; // Import the new page
import DataCheckerView from "../views/DataCheckerView.vue"; // Import the new page
import GoToDataView from "../views/GoToDataView.vue"; // Add this
import GoToCasesView from "../views/GoToCasesView.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "login",
        component: LoginView,
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: DashboardView,
    },
    {
        path: "/review",
        name: "review",
        component: ReviewDataView, // Add the route
    },
    {
        path: "/checker",
        name: "checker",
        component: DataCheckerView, // Add the route
    },
    {
        path: "/data",
        name: "data",
        component: GoToDataView,
    },
    {
        path: "/cases",
        name: "cases",
        component: GoToCasesView,
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
