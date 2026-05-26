import { defineConfig } from '@umijs/max';

export default defineConfig({
  routes: [
    { path: '/', component: 'index' },
    { path: '/docs', component: 'docs' },
    { path: '/page', component: 'page' },
    { path: '/students', component: 'students' },
  ],
  npmClient: 'npm',
  request: {},
});