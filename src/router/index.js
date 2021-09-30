import { createRouter, createWebHistory } from "vue-router";

import Auth from "../views/auth/Login.vue";
import Dashboard from "../views/Index.vue";

const routes = [
  { path: "/auth/", name: "auth", component: Auth, },
  { path: "/dashboard", name: "dashboard", component: Dashboard, },

  { path: '/stadiums/:id', name: 'stadiums-edit', component: () => import('@/views/stadiums/Edit.vue') },
  { path: '/stadiums/create', name: 'stadiums-create', component: () => import('@/views/stadiums/Create.vue') },
  { path: '/stadiums', name: 'stadiums', component: () => import('../views/stadiums/Index.vue') },

  { path: "/leagues/:id", name: 'leagues-edit', component: () => import('../views/leagues/Edit.vue') },
  { path: "/leagues/create", name: 'leagues-create', component: () => import('../views/leagues/Create.vue') },
  { path: "/leagues", name: 'leagues', component: () => import('../views/leagues/Index.vue') },

  { path: "/tournaments/:id", name: 'tournaments-edit', component: () => import('../views/tournaments/Edit.vue') },
  { path: "/tournaments/create", name: 'tournaments-create', component: () => import('@/views/tournaments/Create.vue') },
  { path: "/tournaments", name: 'tournaments', component: () => import('@/views/tournaments/Index.vue') },

  { path: "/calendar", name: 'calendar', component: () => import('@/views/calendar/Index.vue') },

  // { path: "/games/create", name: 'games-create', component: import('@/views/games/Create.vue') },
  // { path: "/games/:id", name: 'games-edit', component: import('@/views/games/Edit.vue') },

  {
    path: "/internal-users/:id",
    name: 'internal-users-edit',
    component: () => import('../views/internal_users/Edit.vue')
  },
  {
    path: "/internal-users/create",
    name: 'internal-users-create',
    component: () => import('../views/internal_users/Create.vue')
  },
  { path: "/internal-users", name: 'internal-users', component: () => import('../views/internal_users/Index.vue') },

  {
    path: "/users/:id",
    name: 'users-edit',
    component: () => import('@/views/users/Edit.vue')
  },
  { path: "/users", name: 'users', component: () => import('@/views/users/Index.vue') },

  { path: '/schools/:id', name: 'schools-edit', component: () => import('@/views/schools/Edit.vue') },
  { path: "/schools", name: 'schools', component: () => import('@/views/schools/Index.vue'), },

  { path: "/results", name: 'results', component: () => import('@/views/results/Index.vue')},

  { path: "/notifications", name: 'notifications', component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
