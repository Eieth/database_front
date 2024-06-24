<template>
  <el-row class="tac">
    <el-col>
      <el-menu default-active="2" class="el-menu-vertical-demo" @select="handleSelect">

        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <Coin />
            </el-icon>
            <span>数据库内容</span>
          </template>

          <el-menu-item index="1-1">测站一览表</el-menu-item>
          <el-menu-item index="1-2">高程信息表</el-menu-item>
          <el-menu-item index="1-3">测站地理位置表</el-menu-item>
          <el-menu-item index="1-4">测站地址表</el-menu-item>
          <el-menu-item index="1-5">测站基本信息表</el-menu-item>
          <el-menu-item index="1-6">水文站特征值表</el-menu-item>
          <el-menu-item index="1-7">水位站特征值表</el-menu-item>
          <el-menu-item index="1-8">雨量站特征值表</el-menu-item>
          <el-menu-item index="1-9">蒸发站特征值表</el-menu-item>

        </el-sub-menu>

        <el-menu-item index="2">
          <template #title>
            <el-icon>
              <User />
            </el-icon>
            <span>有关信息</span>
          </template>
        </el-menu-item>

      </el-menu>
    </el-col>
  </el-row>
</template>
  
<script setup>
import { Coin, User } from '@element-plus/icons-vue'
import router from '@/router/router';
let handleSelect = (idx) => {
  let tableName = 'null';
  if (idx === '1-1') {
    tableName = 'StationOverview';
  } else if (idx === '1-2') {
    tableName = 'ElevationInfo';
  } else if (idx === '1-3') {
    tableName = 'StationGeographicalLocation';
  } else if (idx === '1-4') {
    tableName = 'StationAddress';
  } else if (idx === '1-5') {
    tableName = 'StationBasicInfo';
  } else if (idx === '1-6') {
    tableName = 'HydrologicalStationCharacteristicValues';
  } else if (idx === '1-7') {
    tableName = 'WaterLevelStationCharacteristicValues';
  } else if (idx === '1-8') {
    tableName = 'RainfallStationCharacteristicValues';
  } else if (idx === '1-9') {
    tableName = 'EvaporationStationCharacteristicValues';
  }

  if (idx === '2') {
    router.push({ name: 'About' });
  } else {
    router.push({ name: 'Main', query: { tables: tableName }});
  }
}
</script>