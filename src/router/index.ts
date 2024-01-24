import AvatarView from '@/views/AvatarView.vue';
import ForgotPasswordView from '@/views/ForgotPasswordView.vue';
import HomeView from '@/views/HomeView.vue';
import NewspaperDetailsView from '@/views/NewspaperDetailsView.vue';
import NewspaperView from '@/views/NewspaperView.vue';
import RegisterView from '@/views/RegisterView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { projectName } from '@/utils/const';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: `${projectName} - Aventuras sem limites!` }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { title: `${projectName} - Cadastre-se` }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView,
      meta: { title: `${projectName} - Recuperar senha` }
    },
    {
      path: '/newspaper',
      name: 'newspaper',
      component: NewspaperView,
      meta: { title: `${projectName} - Jornal` }
    },
    {
      path: '/newspaper/:id',
      name: 'newspaper-details',
      component: NewspaperDetailsView,
      meta: { title: `${projectName} - Detalhes do jornal` }
    },
    {
      path: '/avatar',
      name: 'avatar',
      component: AvatarView,
      meta: { title: `${projectName} - Avatar` }
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
      meta: { title: `${projectName} - Nada por aqui` }
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
    document.title = projectName;
  }
  next();
});

export default router;
