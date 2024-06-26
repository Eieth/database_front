import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            id: '',
            username: '',
            level: '',
            isLogin: false
        }
    },
    getters: {
        getId(state) {
            return state.id;
        },
        getUsername(state) {
            return state.username;
        },
        getLevel(state) {
            return state.level;
        },
        getLoginStatus(state) {
            return state.isLogin;
        }
    }
})