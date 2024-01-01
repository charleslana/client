import HomeView from '@/views/HomeView.vue';
import RegisterView from '@/views/RegisterView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'One Piece RPG - Aventuras sem limites!' }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { title: 'One Piece RPG - Cadastre-se' }
    },
    {
      path: '/model',
      name: 'model',
      component: () => import('@/views/ModelView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
});

interface RouteMeta {
  title?: string;
}

router.beforeEach((to, _from, next) => {
  const meta = to.meta as RouteMeta;
  if (meta && meta.title) {
    document.title = meta.title;
  } else {
    document.title = 'App';
  }
  next();
});

export default router;
