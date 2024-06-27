<template>
    <img src="/title.png" width="100%"/>
    <el-button type="danger" style="margin-left: 93vw; margin-top: -35vh;" @click="logout()">退出登录</el-button>
</template>

<script setup>
import { useUserStore } from '@/store';
import router from '@/router/router';
let store = useUserStore();
let logout = () => {
    store.isLogin = false;
    router.push({ name: 'Login' });
}
</script>