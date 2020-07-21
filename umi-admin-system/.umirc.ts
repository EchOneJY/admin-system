import { defineConfig } from 'umi';

export default defineConfig({
  publicPath: '/',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '@/layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              path: '/user/login',
              component: '@/pages/user/login',
            },
          ],
        },
        {
          path: '/',
          component: '@/layouts/BasicLayout',
          routes: [
            {
              name: 'Dashboard',
              icon: 'dashboard',
              path: '/dashboard',
              component: '@/pages/dashboard',
            },
            {
              path: '/error',
              name: 'Error',
              icon: 'error',
              routes: [
                {
                  path: '/error/403',
                  name: '403',
                  component: '@/pages/error/403',
                },
                {
                  path: '/error/404',
                  name: '404',
                  component: '@/pages/error/404',
                },
              ],
            },
            {
              path: '/icon',
              name: 'Icon',
              icon: 'smile',
              routes: [
                {
                  path: '/icon/fontawesome',
                  name: 'Fontawesome',
                  component: '@/pages/icons/fontawesome',
                },
                {
                  path: '/icon/customer',
                  name: 'Customer',
                  component: '@/pages/icons/customer',
                },
              ],
            },
            {
              path: '/cahrt',
              name: 'Cahrt',
              icon: 'chart',
              routes: [
                {
                  path: '/chart/rechart',
                  name: 'Rechart',
                  component: '@/pages/chart/rechart',
                },
                {
                  path: '/chart/echart',
                  name: 'Echart',
                  component: '@/pages/chart/echart',
                },
              ],
            },
            {
              path: '/',
              redirect: '/dashboard',
            },
          ],
        },
      ],
    },
  ],
});
