<template>
  <el-row class="tac">
    <el-col>
      <el-menu default-active="3" class="el-menu-vertical-demo" @select="handleSelect">

        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <Coin />
            </el-icon>
            <span>数据库内容</span>
          </template>

          <el-menu-item index="1-1">测站基本信息表</el-menu-item>
          <el-menu-item index="1-2">水文站表</el-menu-item>
          <el-menu-item index="1-3">水位站表</el-menu-item>
          <el-menu-item index="1-4">雨量站表</el-menu-item>
          <el-menu-item index="1-5">蒸发站表</el-menu-item>
          <el-menu-item index="1-6">水质站表</el-menu-item>
          <el-menu-item index="1-7">墒情站表</el-menu-item>
          <el-menu-item index="1-8">沿革调查表</el-menu-item>
          <el-menu-item index="1-9">动态信息表</el-menu-item>

        </el-sub-menu>

        <el-menu-item index="2" v-if="store.getLevel === 2">
          <template #title>
            <el-icon>
              <User />
            </el-icon>
            <span>用户管理</span>
          </template>
        </el-menu-item>

        <el-menu-item index="3">
          <template #title>
            <el-icon>
              <Message/>
            </el-icon>
            <span>相关信息</span>
          </template>
        </el-menu-item>

        

      </el-menu>
    </el-col>
  </el-row>
</template>
  
<script setup>
import { Coin, User, Message } from '@element-plus/icons-vue'
import router from '@/router/router';
import { useUserStore } from '@/store';
let store = useUserStore();
let handleSelect = (idx) => {
  if (idx === '1-1') {
    router.push({ name:'StationBasicInfo'});
  } else if (idx === '1-2') {
    router.push({ name:'HydrologicalStations'});
  } else if (idx === '1-3') {
    router.push({ name:'WaterLevelStations'});
  } else if (idx === '1-4') {
    router.push({ name:'RainfallStations'});
  } else if (idx === '1-5') {
    router.push({ name:'EvaporationStation'});
  } else if (idx === '1-6') {
    router.push({ name:'WaterQualityStations'});
  } else if (idx === '1-7') {
    router.push({ name:'SoilMoistureStation'});
  } else if (idx === '1-8') {
    router.push({ name:'HistoricalChanges' });
  } else if (idx === '1-9') {
    router.push({ name:'DynamicInfo' });
  } else if (idx === '2') {
    router.push({ name: 'UserControl' });
  } else if (idx === '3') {
    router.push({ name: 'About' });
  }
}
</script>