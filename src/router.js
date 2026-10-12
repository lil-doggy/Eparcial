import { createRouter, createWebHistory } from 'vue-router'
import { inspectionsRoutes } from './inspections/presentation/inspections-routes.js'
export default createRouter({ history: createWebHistory(), routes: [
 { path: '/', redirect: '/home' },
 { path: '/home', name: 'home', component: () => import('./inspections/presentation/views/home.vue'), meta: { title: 'home' } },
 { path: '/telemetry', children: inspectionsRoutes },
 { path: '/:pathMatch(.*)*', component: () => import('./shared/presentation/views/page-not-found.vue'), meta: { title: 'not-found' } }
] })
