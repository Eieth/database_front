import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            username: '',
            level:'',
            isLogin:false
        }
    },
    getters: {
        getUsername(state) {
            return state.username;
        },
        getLevel(state) {
            return state.level;
        },
        getLoginStatus(state) {
            return state.isLogin;
        }
    },
    actions: {
        setUsername(str) {
            state.username = str;
        },
        setLevel(str) {
            state.level = str;
        },
        setLoginStatus(bool) {
            state.isLogin = bool;
        }
    }
})