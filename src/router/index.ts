import ForgotPasswordView from '@/views/ForgotPasswordView.vue';
import HomeView from '@/views/HomeView.vue';
import NewspaperView from '@/views/NewspaperView.vue';
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
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView,
      meta: { title: 'One Piece RPG - Recuperar senha' }
    },
    {
      path: '/newspaper',
      name: 'newspaper',
      component: NewspaperView,
      meta: { title: 'One Piece RPG - Jornal' }
    },
    {
      path: '/model',
      name: 'model',
      component: () => import('@/views/ModelView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: 'One Piece RPG - Nada por aqui' }
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
