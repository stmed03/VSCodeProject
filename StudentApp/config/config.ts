import { defineConfig } from '@umijs/max';

export default defineConfig({
  routes: [
    { path: '/login', component: 'login', layout: false },
    { path: '/students', component: 'students' },
  ],
  npmClient: 'npm',
  request: {},
  hash: true,
  esbuildMinifyIIFE: true,
  layout: {
    title: 'Students',
  },
});