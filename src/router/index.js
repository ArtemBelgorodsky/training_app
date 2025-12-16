import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterPage.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/TestPage.vue'),
    meta: { requiresAuth: true, roles: ['user'] },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/UserDashboard.vue'),
    meta: { requiresAuth: true, roles: ['user'] },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/UserProfile.vue'),
    meta: { requiresAuth: true, roles: ['user'] },
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/TrainingHistory.vue'),
    meta: { requiresAuth: true, roles: ['user'] },
  },
  {
    path: '/training/:id',
    name: 'TrainingSession',
    component: () => import('../views/TrainingSession.vue'),
    meta: { requiresAuth: true, roles: ['user'] },
  },
  {
    path: '/reassessment',
    name: 'Reassessment',
    component: () => import('../views/ReassessmentPage.vue'),
    meta: { requiresAuth: true, roles: ['user'] },
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: () => import('../views/AdminPanel.vue'),
    meta: { requiresAuth: true, roles: ['admin'] },
  },
  {
    path: '/admin/exercises',
    name: 'ExerciseManager',
    component: () => import('../views/ExerciseManager.vue'),
    meta: { requiresAuth: true, roles: ['admin'] },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Initialize auth from localStorage on first navigation
  if (!from.name) {
    authStore.initializeFromStorage();
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (
    to.meta.roles &&
    !to.meta.roles.includes(authStore.currentUser?.role)
  ) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
