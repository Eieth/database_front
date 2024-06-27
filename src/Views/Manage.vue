<template>
    <div class="common-layout">
    <el-container>
      <el-header height="23vh">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="10vw">
          <Navbar />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Header from '@/components/Header.vue';
</script>