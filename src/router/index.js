import {createWebHistory, createRouter} from "vue-router"

import Auth from "../views/auth/Login.vue"

const routes = [
  { path: "/auth/", name: "auth", component: Auth, },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;