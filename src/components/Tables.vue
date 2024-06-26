<template>
  <!-- <div style="display: flex;">
    <el-button type="danger" style="margin-left: 3vw;" @click="deleteDialogVisible = true">删除</el-button>
    <Controller></Controller>
    <el-input style="margin-left: 40vw; margin-right: 10vw; " placeholder="搜索框" v-model="search" />
  </div>
  <el-dialog v-model="deleteDialogVisible" title="删除" width="30%">
    <span>将删除该行数据，无法恢复，请注意！！！</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteRow">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
  <div>
    <p style="margin-bottom: 2%; text-align: center; font-size: 30px; margin-top: -4vh;">{{ getTableName() }}</p>
  </div>
  
  <el-table :data="filterTableData" stripe style="width: 100%" :border="true" height="57vh" :table-layout="auto"
    v-if="route.query.tables === 'StationOverview' && dataFetched" @selection-change="handleSelectionChange">
    <el-table-column type="selection" />
    <el-table-column prop="stationCode" label="测站编码" />
    <el-table-column prop="stationType" label="测站类型" />
    <el-table-column prop="stationName" label="测站名称" />

  </el-table>

  <el-table :data="filterTableData" stripe style="width: 100%" :border="true" height="57vh" :table-layout="auto"
    v-if="route.query.tables === 'ElevationInfo' && dataFetched" @selection-change="handleSelectionChange">
    <el-table-column type="selection" />
    <el-table-column prop="elevationCode" label="高程信息编码" />
    <el-table-column prop="stationType" label="测站类型" />
    <el-table-column prop="stationElevation" label="测站高程" />
    <el-table-column prop="referenceFrameName" label="基面名称" />
    <el-table-column prop="referenceFrameCorrection" label="基面修正值" />
  </el-table>

  <el-table :data="filterTableData" stripe style="width: 100%" :border="true" height="57vh" :table-layout="auto"
    v-if="route.query.tables === 'StationGeographicalLocation' && dataFetched" @selection-change="handleSelectionChange">
    <el-table-column type="selection" />
    <el-table-column prop="stationCode" label="测站编码" />
    <el-table-column prop="stationType" label="测站类型" />
    <el-table-column prop="longitude" label="经度" />
    <el-table-column prop="latitude" label="纬度" />
  </el-table>

  <el-table :data="filterTableData" stripe style="width: 100%" :border="true" height="57vh" :table-layout="auto"
    v-if="route.query.tables === 'StationAddress' && dataFetched" @selection-change="handleSelectionChange">
    <el-table-column type="selection" />
    <el-table-column prop="stationAddressCode" label="测站地址编码" />
    <el-table-column prop="stationType" label="测站类型" />
    <el-table-column prop="provinceAutonomousRegionMunicipality" label="所在省/自治区/直辖市" />
    <el-table-column prop="cityDistrict" label="所在市/区" />
    <el-table-column prop="countyCity" label="所在县/市" />
    <el-table-column prop="townVillage" label="所在乡/镇" />
    <el-table-column prop="villageStreet" label="所在村/街道" />
  </el-table>

  <el-table :data="filterTableData" stripe style="width: 100%" :border="true" height="57vh" :table-layout="auto"
    v-if="route.query.tables === 'StationBasicInfo' && dataFetched" @selection-change="handleSelectionChange">
    <el-table-column type="selection" />
    <el-table-column prop="stationCode" label="测站编码" />
    <el-table-column prop="stationType" label="测站类型" />
    <el-table-column prop="basinWaterSystem" label="流域水系" />
    <el-table-column prop="riverName" label="河流名称" />
    <el-table-column prop="installationDate" label="设站日期" />
    <el-table-column prop="drainageArea" label="集水面积" />
    <el-table-column prop="stationClassManagement" label="站类管理" />
    <el-table-column prop="stationAttribute" label="测站属性" />
    <el-table-column prop="stationClassification" label="测站分类" />
    <el-table-column prop="stationAddressCode" label="测站地址编码" />
    <el-table-column prop="constructionManagementUnit" label="建设管理单位" />
  </el-table>

  <el-table :data="filterTableData" stripe style="width: 100%" :border="true" height="57vh" :table-layout="auto"
    v-if="route.query.tables === 'HydrologicalStationCharacteristicValues' && dataFetched"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection" />
    <el-table-column prop="stationCode" label="测站编码" />
    <el-table-column prop="stationType" label="测站类型" />
    <el-table-column prop="averageRunoff" label="多年平均径流量" />
    <el-table-column prop="measuredMaxFlow" label="实测最大流量" />
    <el-table-column prop="measuredMaxFlowTime" label="实测最大流量时间" />
    <el-table-column prop="measuredMinFlow" label="实测最小流量" />
    <el-table-column prop="measuredMinFlowTime" label="实测最小流量时间" />
  </el-table>

  <el-table :data="filterTableData" stripe style="width: 100%" :border="true" height="57vh" :table-layout="auto"
    v-if="route.query.tables === 'WaterLevelStationCharacteristicValues' && dataFetched"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection" />
    <el-table-column prop="stationCode" label="测站编码" />
    <el-table-column prop="stationType" label="测站类型" />
    <el-table-column prop="measuredMaxWaterLevel" label="实测最高水位" />
    <el-table-column prop="measuredMaxWaterLevelTime" label="实测最高水位时间" />
    <el-table-column prop="measuredMinWaterLevel" label="实测最低水位" />
    <el-table-column prop="measuredMinWaterLevelTime" label="实测最低水位时间" />
  </el-table>

  <el-table :data="filterTableData" stripe style="width: 100%" :border="true" height="57vh" :table-layout="auto"
    v-if="route.query.tables === 'RainfallStationCharacteristicValues' && dataFetched"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection" />
    <el-table-column prop="stationCode" label="测站编码" />
    <el-table-column prop="stationType" label="测站类型" />
    <el-table-column prop="instrumentHeight" label="器口高度" />
    <el-table-column prop="averageRainfall" label="多年平均降雨量" />
    <el-table-column prop="measuredMaxRainfall" label="实测年最大降雨量" />
    <el-table-column prop="occurrenceYear" label="出现年份" />
  </el-table>

  <el-table :data="filterTableData" stripe style="width: 100%" :border="true" height="57vh" :table-layout="auto"
    v-if="route.query.tables === 'EvaporationStationCharacteristicValues' && dataFetched"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection" />
    <el-table-column prop="stationCode" label="测站编码" />
    <el-table-column prop="stationType" label="测站类型" />
    <el-table-column prop="averageEvaporation" label="多年平均蒸发量" />
    <el-table-column prop="evaporationInstrumentModel" label="蒸发器型号" />
  </el-table> -->
  <router-view />
</template>
<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { ref, watch, onMounted, computed, provide } from 'vue';
import Controller from '@/components/Controller.vue';
import baseURL from '@/axios/index.js'

const route = useRoute();
let tableData = ref([]);
let dataFetched = ref(false);
let deleteDialogVisible = ref(false);
let search = ref('');
let selection = ref([]);

let handleSelectionChange = (val) => {
  selection.value = val;
}

let filterTableData = computed(() => {
  if (route.query.tables === 'StationOverview') {
    return tableData.value.filter(
      (data) =>
        !search.value ||
        data.stationCode.toString().toLowerCase().includes(search.value.toLowerCase()) ||
        data.stationType.toLowerCase().includes(search.value.toLowerCase()) ||
        data.stationName.toLowerCase().includes(search.value.toLowerCase())
    )
  } else if (route.query.tables === 'ElevationInfo') {
    return tableData.value.filter(
      (data) =>
        !search.value ||
        data.elevationCode.toString().toLowerCase().includes(search.value.toLowerCase())
    )
  } else if (route.query.tables === 'StationGeographicalLocation') {
    return tableData.value.filter(
      (data) =>
        !search.value ||
        data.stationCode.toString().toLowerCase().includes(search.value.toLowerCase()) ||
        data.stationType.toLowerCase().includes(search.value.toLowerCase())
    )
  } else if (route.query.tables === 'StationAddress') {
    return tableData.value.filter(
      (data) =>
        !search.value ||
        data.stationAddressCode.toString().toLowerCase().includes(search.value.toLowerCase()) ||
        data.stationType.toLowerCase().includes(search.value.toLowerCase()) ||
        data.provinceAutonomousRegionMunicipality.toLowerCase().includes(search.value.toLowerCase())
    )
  } else if (route.query.tables === 'StationBasicInfo') {
    return tableData.value.filter(
      (data) =>
        !search.value ||
        data.stationCode.toString().toLowerCase().includes(search.value.toLowerCase()) ||
        data.stationType.toLowerCase().includes(search.value.toLowerCase()) ||
        data.basinWaterSystem.toLowerCase().includes(search.value.toLowerCase()) ||
        data.riverName.toLowerCase().includes(search.value.toLowerCase()) ||
        data.installationDate.toString().toLowerCase().includes(search.value.toLowerCase()) ||
        data.stationAddressCode.toString().toLowerCase().includes(search.value.toLowerCase()) ||
        data.constructionManagementUnit.toLowerCase().includes(search.value.toLowerCase())
    )
  } else if (route.query.tables === 'HydrologicalStationCharacteristicValues') {
    return tableData.value.filter(
      (data) =>
        !search.value ||
        data.stationCode.toString().toLowerCase().includes(search.value.toLowerCase()) ||
        data.stationType.toLowerCase().includes(search.value.toLowerCase())
    )
  } else if (route.query.tables === 'WaterLevelStationCharacteristicValues') {
    return tableData.value.filter(
      (data) =>
        !search.value ||
        data.stationCode.toString().toLowerCase().includes(search.value.toLowerCase()) ||
        data.stationType.toLowerCase().includes(search.value.toLowerCase())
    )
  } else if (route.query.tables === 'RainfallStationCharacteristicValues') {
    return tableData.value.filter(
      (data) =>
        !search.value ||
        data.stationCode.toString().toLowerCase().includes(search.value.toLowerCase()) ||
        data.stationType.toLowerCase().includes(search.value.toLowerCase())
    )
  } else if (route.query.tables === 'EvaporationStationCharacteristicValues') {
    return tableData.value.filter(
      (data) =>
        !search.value ||
        data.stationCode.toString().toLowerCase().includes(search.value.toLowerCase()) ||
        data.stationType.toLowerCase().includes(search.value.toLowerCase())
    )
  }
})

let giveIndex = () => {
  let i = 0;
  tableData.value.forEach(item => {
    item.index = i++;
  })
}

axios.post(baseURL + '/database' + route.query.tables)
  .then((response) => {
    tableData.value = response.data;
    giveIndex();
    console.log(tableData.value)
    dataFetched.value = true;
  });

watch(
  () => route,
  () => {
    dataFetched.value = false;
    axios.post(baseURL + '/database' + route.query.tables)
      .then((response) => {
        selection.value = [];
        tableData.value = response.data;
        giveIndex(); 
        console.log(tableData.value)
        dataFetched.value = true;
      });
  },
  { deep: true }
);

let getTableName = () => {
  switch (route.query.tables) {
    case 'StationOverview': return '测站一览表';
    case 'ElevationInfo': return '高程信息表';
    case 'StationGeographicalLocation': return '测站地理位置表';
    case 'StationAddress': return '测站地址表';
    case 'StationBasicInfo': return '测站基本信息表';
    case 'HydrologicalStationCharacteristicValues': return '水文站特征值表';
    case 'WaterLevelStationCharacteristicValues': return '水位站特征值表';
    case 'RainfallStationCharacteristicValues': return '雨量站特征值表';
    case 'EvaporationStationCharacteristicValues': return '蒸发站特征值表';
    default: return '糟糕，出错了！！！！';
  }
};

let deleteRow = () =>{
  selection.value.forEach((value)=>{
    tableData.value.splice(value.index, 1);
    giveIndex();
  })
  deleteDialogVisible.value = false;
}

provide('tableData', tableData);
provide('selection', selection);
</script>