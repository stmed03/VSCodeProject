import { defineConfig } from '@umijs/max';

export default defineConfig({
  routes: [
    { path: '/', component: 'index' },
    { path: '/login', component: 'login', layout: false },
    { path: '/docs', component: 'docs' },
    { path: '/page', component: 'page' },
    { path: '/students', component: 'students' },
  ],
  npmClient: 'npm',
  request: {},
  layout: {
    title: 'Students',
  },
});