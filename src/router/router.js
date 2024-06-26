import { createRouter, createWebHistory } from 'vue-router'
import About from '@/Views/About.vue';
import Main from '@/Views/Main.vue';
import Login from '@/Views/Login.vue';
import Manage from '@/Views/Manage.vue';
import EvaporationStation from '@/components/EvaporationStation.vue'
       

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
        }, {
            path: '/manage',
            name: 'Manage',
            component: Manage,
            children: [{
                path: 'about',
                name: 'About',
                component: About,
            }, {
                path: 'main',
                name: 'Main',
                component: Main,
                children: [
                    {
                        path: 'evaporationStation',
                        name: 'EvaporationStation',
                        component: EvaporationStation,
                    },
                ]
            }]
        }, 

    ],

})

export default router;