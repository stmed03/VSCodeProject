import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/', component: 'index' },
    { path: '/docs', component: 'docs' },
    { path: '/page', component: 'page' },
    { path: '/students', component: 'students' },
  ],
  npmClient: 'npm',
  utoopack: {},
});