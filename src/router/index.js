import {createWebHistory, createRouter} from "vue-router"

import Auth from "../views/auth/Login.vue"
import Dashboard from "../views/Index.vue"

const routes = [
  { path: "/auth/", name: "auth", component: Auth, },

  { path: "/", name: 'dashboard', component: Dashboard }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
