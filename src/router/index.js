import {createRouter, createWebHistory} from 'vue-router'

import {InternalUserTypes} from '@/services/internal-users/InternalUser'
import Auth from '../views/auth/Login.vue'
import Dashboard from '../views/Index.vue'
import store from "@/store/index.js";
import {ElNotification} from "element-plus";

const routes = [
  {path: '/login/', name: 'auth', component: Auth, meta: {authorize: ['guest']},},
  {path: '/', name: 'dashboard', component: Dashboard,meta: {authorize: [InternalUserTypes.admin]}},
  {
    path: '/stadiums/:id',
    name: 'stadiums-edit', component: () => import('@/views/stadiums/Edit.vue'),
    meta: {authorize: [InternalUserTypes.admin]},
  },
  {
    path: '/stadiums/create', name: 'stadiums-create', component: () => import('@/views/stadiums/Create.vue'),
    meta: {authorize: [InternalUserTypes.admin]}
  },
  {
    path: '/stadiums', name: 'stadiums', component: () => import('../views/stadiums/Index.vue'),
    meta: {authorize: [InternalUserTypes.admin]}
  },

  {path: '/leagues/:id', name: 'leagues-edit', component: () => import('../views/leagues/Edit.vue')},
  {
    path: '/leagues/create', name: 'leagues-create', component: () => import('../views/leagues/Create.vue'),
    meta: {authorize: [InternalUserTypes.admin]}
  },
  {
    path: '/leagues', name: 'leagues', component: () => import('../views/leagues/Index.vue'),
    meta: {authorize: [InternalUserTypes.admin]}
  },

  {
    path: '/tournaments/:id', name: 'tournaments-edit', component: () => import('../views/tournaments/Edit.vue'),
    meta: {authorize: [InternalUserTypes.admin]}
  },
  {
    path: '/tournaments/create',
    name: 'tournaments-create',
    component: () => import('@/views/tournaments/Create.vue'),
    meta: {authorize: [InternalUserTypes.admin]}
  },
  {
    path: '/tournaments', name: 'tournaments', component: () => import('@/views/tournaments/Index.vue'),
    meta: {authorize: [InternalUserTypes.admin]}
  },

  {
    path: '/calendar', name: 'calendar', component: () => import('@/views/calendar/Index.vue'),
    meta: {authorize: [InternalUserTypes.admin]}
  },

  {
    path: '/games/create', name: 'game-create', component: () => import('@/views/games/Create.vue'),
    meta: {authorize: [InternalUserTypes.admin]}
  },
  {
    path: "/games/:id", name: 'games-edit', component: () => import('@/views/games/Edit.vue'),
    meta: {authorize: [InternalUserTypes.admin]}
  },
  {
    path: '/games/:id/statistics', name: 'game-statistics', component: () => import('@/views/games/Statistics.vue'),
    meta: {authorize: [InternalUserTypes.admin]}
  },

  {
    path: '/internal-users/:id',
    name: 'internal-users-edit',
    component: () => import('../views/internal_users/Edit.vue'),
    meta: {authorize: [InternalUserTypes.admin]}
  },
  {
    path: '/internal-users/create',
    name: 'internal-users-create',
    component: () => import('../views/internal_users/Create.vue'),
    meta: {authorize: [InternalUserTypes.admin]}
  },
  {
    path: '/internal-users', name: 'internal-users', component: () => import('../views/internal_users/Index.vue'),
    meta: {authorize: [InternalUserTypes.admin]}
  },

  {
    path: '/users/:id',
    name: 'users-edit',
    component: () => import('@/views/users/Edit.vue'),
    meta: {authorize: [InternalUserTypes.admin]}
  },
  {
    path: '/users', name: 'users', component: () => import('@/views/users/Index.vue'),
    meta: {authorize: [InternalUserTypes.admin]}
  },
  {
    path: '/users/create', name: 'users-create', component: () => import('@/views/users/Create.vue'),
    meta: {authorize: [InternalUserTypes.admin]}
  },

  {
    path: '/schools/:id', name: 'schools-edit', component: () => import('@/views/schools/Edit.vue'),
    meta: {authorize: [InternalUserTypes.admin]}
  },
  {
    path: '/schools', name: 'schools', component: () => import('@/views/schools/Index.vue'),
    meta: {authorize: [InternalUserTypes.admin]},
  },

  {
    path: '/results', name: 'results', component: () => import('@/views/results/Index.vue'),
    meta: {authorize: [InternalUserTypes.admin]}
  },

  {
    path: '/notifications', name: 'notifications', component: () => import('@/views/notifications/Index.vue'),
    meta: {authorize: [InternalUserTypes.admin]}
  },
  {
    path: '/jury', name: 'jury', component: () => import('@/views/jury/Index.vue'),
    meta: {authorize: [InternalUserTypes.jury]}
  },
  {
    path: '/jury/games', name: 'games-jury', component: () => import('@/views/jury/Games.vue'),
    meta: {authorize: [InternalUserTypes.jury]}
  },
  {
    path: '/jury/games/:id', name: 'game-jury', component: () => import('@/views/jury/Game.vue'),
    meta: {authorize: [InternalUserTypes.jury]}
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const {authorize} = to.meta;
  const currentUser = store.getters['auth/GET_USER'];

  if (!to.name) {
    if (currentUser.type === InternalUserTypes.jury) {
      return next({name: 'jury'});
    } else if (currentUser.type === InternalUserTypes.admin) {
      return next({path: "/"});
    }
    return next({path: "/login"});
  }

  if (authorize) {
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      if (!authorize.includes('guest')) {
        return next({path: "/login"});
      }
      return next();
    }
    // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.type)) {
      // role not authorised so redirect to home page
      ElNotification({type: 'error', title: 'Ошибка', message: 'Нет доступа'})
      if (currentUser.type === InternalUserTypes.jury) {
        return next({name: 'jury'});
      }
      return next({path: "/"});
    }
  }

  next();
});

export default router
