import {createWebHistory, createRouter} from "vue-router"

import Auth from "../views/auth/Login.vue"
import Dashboard from "../views/Index.vue"

const routes = [
  { path: "/auth/", name: "auth", component: Auth, },
  { path: "/dashboard", name: "dashboard", component: import('../views/internal_users/Index.vue'), },
  { path: "/internal-users", name: 'internal-users', component: import('../views/internal_users/Index.vue') },
  { path: "/leagues", name: 'leagues', component: Dashboard },
  { path: "/schools", name: 'schools', component: Dashboard },
  { path: "/tables", name: 'tables', component: Dashboard },
  { path: "/calendar", name: 'calendar', component: Dashboard },
  { path: "/results", name: 'results', component: Dashboard },
  { path: "/players", name: 'players', component: Dashboard },
  { path: "/statistics", name: 'statistics', component: Dashboard },
  { path: "/notifications", name: 'notifications', component: Dashboard },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
