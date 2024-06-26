import { createRouter, createWebHistory } from 'vue-router'
import About from '@/Views/About.vue';
import Main from '@/Views/Main.vue';
import Login from '@/Views/Login.vue';
import Manage from '@/Views/Manage.vue';
import UserController from '@/components/UserController.vue';
import EvaporationStation from '@/components/EvaporationStation.vue'
import HistoricalChanges from '@/components/HistoricalChanges.vue';
import HydrologicalStations from '@/components/HydrologicalStations.vue';
import RainfallStations from '@/components/RainfallStations.vue';
import SoilMoistureStation from '@/components/SoilMoistureStation.vue';
import StationBasicInfo from '@/components/StationBasicInfo.vue';
import WaterLevelStations from '@/components/WaterLevelStations.vue';
import WaterQualityStations from '@/components/WaterQualityStations.vue';

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
                        path: 'stationBasicInfo',
                        name: 'StationBasicInfo',
                        component: StationBasicInfo,
                    }, {
                        path: 'hydrologicalStations',
                        name: 'HydrologicalStations',
                        component: HydrologicalStations,
                    }, {
                        path: 'waterLevelStations',
                        name: 'WaterLevelStations',
                        component: WaterLevelStations,
                    }, {
                        path: 'rainfallStations',
                        name: 'RainfallStations',
                        component: RainfallStations,
                    }, {
                        path: 'evaporationStation',
                        name: 'EvaporationStation',
                        component: EvaporationStation,
                    }, {
                        path: 'waterQualityStations',
                        name: 'WaterQualityStations',
                        component: WaterQualityStations,
                    }, {
                        path: 'soilMoistureStation',
                        name: 'SoilMoistureStation',
                        component: SoilMoistureStation,
                    }, {
                        path: 'historicalChanges',
                        name: 'HistoricalChanges',
                        component: HistoricalChanges,
                    },
                ]
            }, {
                path: 'userControl',
                name: 'UserControl',
                component: UserController,
            }]
        }, 

    ],

})

export default router;