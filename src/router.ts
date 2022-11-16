import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/Home.vue'),
	},
	{
		path: '/:pathMatch(.*)',
		redirect: { name: '404' },
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
