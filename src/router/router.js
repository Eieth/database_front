import { createRouter, createWebHistory } from 'vue-router'
import About from '@/Views/About.vue';
import Main from '@/Views/Main.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '',
            redirect: '/about',
        }, {
            path: '/about',
            name: 'About',
            component: About,
        }, {
            path: '/main',
            name: 'Main',
            component: Main,
        }

    ],

})

export default router;