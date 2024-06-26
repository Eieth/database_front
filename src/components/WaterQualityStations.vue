<template>
    <div style="display: flex;">
        <el-button type="danger" style="margin-left: 3vw;" @click="deleteDialogVisible = true">删除</el-button>
        <el-button type="primary" style="margin-left: 5vw;" @click="updateDialog">更新</el-button>
        <el-button type="warning" style="margin-left: 5vw;" @click="insertDialog">插入</el-button>
        <el-input style="margin-left: 40vw; margin-right: 10vw; " placeholder="搜索框" v-model="search" />
    </div>

    <div>
        <p style="margin-bottom: 2%; text-align: center; font-size: 30px; margin-top: -4vh;">水质站表</p>
    </div>
    <el-table :data="filterTableData" stripe style="width: 100%" :border="true" height="57vh" :table-layout="auto"
        v-if="dataFetched" @selection-change="handleSelectionChange">
        <el-table-column label="测站名称" prop="stationName" />
        <el-table-column label="测站编码" prop="stationCode" />
        <el-table-column label="断面名称" prop="sectionName" />
        <el-table-column label="流域/区域" prop="watershedDistrict" />
        <el-table-column label="水系" prop="drainageSystem" />
        <el-table-column label="河流" prop="river" />
        <el-table-column label="设站日期" prop="setDate" />
        <el-table-column label="一级水功能区名称" prop="primaryZoneName" />
        <el-table-column label="二级水功能区名称" prop="secondaryZoneName" />
        <el-table-column label="测站地址" prop="stationAddress" />
        <el-table-column label="经度" prop="longitude" />
        <el-table-column label="纬度" prop="latitude" />
        <el-table-column label="管理单位" prop="manageUnit" />
    </el-table>
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
    <el-dialog v-model="dialogVisible" :title="getTitle()" width="30%" :before-close="leave">
        <el-form>
            <el-form-item label="测站名称" prop="stationName">
                <el-input v-model="HydrologicalStations.stationName" />
            </el-form-item>
            <el-form-item label="测站编码" prop="stationCode">
                <el-input v-model="HydrologicalStations.stationCode" />
            </el-form-item>
            <el-form-item label="断面名称" prop="sectionName">
                <el-input v-model="HydrologicalStations.sectionName" />
            </el-form-item>
            <el-form-item label="流域/区域" prop="watershedDistrict">
                <el-input v-model="HydrologicalStations.watershedDistrict" />
            </el-form-item>
            <el-form-item label="水系" prop="drainageSystem">
                <el-input v-model="HydrologicalStations.drainageSystem" />
            </el-form-item>
            <el-form-item label="河流" prop="river">
                <el-input v-model="HydrologicalStations.river" />
            </el-form-item>
            <el-form-item label="设站日期" prop="setDate">
                <el-input v-model="HydrologicalStations.setDate" />
            </el-form-item>
            <el-form-item label="一级水功能区名称" prop="primaryZoneName">
                <el-input v-model="HydrologicalStations.primaryZoneName" />
            </el-form-item>
            <el-form-item label="二级水功能区名称" prop="secondaryZoneName">
                <el-input v-model="HydrologicalStations.secondaryZoneName" />
            </el-form-item>
            <el-form-item label="测站地址" prop="stationAddress">
                <el-input v-model="HydrologicalStations.stationAddress" />
            </el-form-item>
            <el-form-item label="经度" prop="longitude">
                <el-input v-model="HydrologicalStations.longitude" />
            </el-form-item>
            <el-form-item label="纬度" prop="latitude">
                <el-input v-model="HydrologicalStations.latitude" />
            </el-form-item>
            <el-form-item label="管理单位" prop="manageUnit">
                <el-input v-model="HydrologicalStations.manageUnit" />
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="leave">取消</el-button>
                <el-button type="primary" @click="submit()">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import axios from 'axios';
import { ref, computed } from 'vue';
import baseURL from '@/axios';
import { ElMessage, ElMessageBox } from 'element-plus';
let dataFetched = ref(false);
let tableData = ref([]);
let search = ref('');
let isUpdate = ref(false);
let dialogVisible = ref(false)
let deleteDialogVisible = ref(false)
let selection = ref([]);
const WaterQualityStations = ref({
    stationName: '',
    stationCode: '',
    sectionName: '', 
    watershedDistrict: '',
    drainageSystem: '',
    river: '',
    setDate: '',
    primaryZoneName: '', 
    secondaryZoneName: '', 
    stationAddress: '',
    longitude: '',
    latitude: '',
    manageUnit: '' 
})


axios.post(baseURL + '/database/get' + 'WaterQualityStations', {}, {
    headers: {
        token: localStorage.getItem('token')
    }
})
    .then((response) => {
        tableData.value = response.data.data;
        giveIndex();
        dataFetched.value = true;
    });

let giveIndex = () => {
    let i = 0;
    tableData.value.forEach((item) => {
        item.index = i++;
    })
}

let filterTableData = computed(() => {
    return tableData.value.filter(
        (data) =>
            !search.value ||
            nullObjectHandler(data.stationName).toString().includes(search.value) ||
            nullObjectHandler(data.stationCode).toString().includes(search.value) ||
            nullObjectHandler(data.sectionName).toString().includes(search.value) ||
            nullObjectHandler(data.watershedDistrict).toString().includes(search.value) ||
            nullObjectHandler(data.drainageSystem).toString().includes(search.value) ||
            nullObjectHandler(data.river).toString().includes(search.value) ||
            nullObjectHandler(data.setDate).toString().includes(search.value) ||
            nullObjectHandler(data.primaryZoneName).toString().includes(search.value) ||
            nullObjectHandler(data.secondaryZoneName).toString().includes(search.value) ||
            nullObjectHandler(data.stationAddress).toString().includes(search.value) ||
            nullObjectHandler(data.longitude).toString().includes(search.value) ||
            nullObjectHandler(data.latitude).toString().includes(search.value) ||
            nullObjectHandler(data.manageUnit).toString().includes(search.value)
    )
})

let nullObjectHandler=(object) => {
    if (object === null) {
        return ''
    } else 
        return object
}

let handleSelectionChange = (val) => {
    selection.value = val;
}

let getTitle = () => {
    return isUpdate.value ? '更新' : '插入';
}

let updateDialog = () => {
    if (selection.value.length === 0) {
        ElMessage({
            message: '请选择一行数据',
            type: 'error',
        })
        return;
    } else if (selection.value.length > 1) {
        ElMessage({
            message: '一次只能修改一行数据',
            type: 'error',
        })
        return;
    }
    Object.keys(WaterQualityStations.value).forEach(key => {
        WaterQualityStations.value[key] = selection.value[0][key];
    });
    dialogVisible.value = true;
    isUpdate.value = true;
}

let update = () => {
    ElMessageBox.confirm('确定本次输入吗？',
        'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
        .then(() => {
            axios.post(baseURL + '/database/update' + 'WaterQualityStations',
                WaterQualityStations.value,
                {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then((response) => {
                    ElMessage({
                        message: '提交请求成功',
                        type: 'success',
                    });
                    Object.keys(WaterQualityStations.value).forEach(key => {
                        selection.value[0][key] = WaterQualityStations.value[key];
                    });
                    Object.keys(tableData.value[selection.value[0].index]).forEach(key => {
                        tableData.value[selection.value[0].index].key = selection.value[0];
                    })
                    dialogVisible.value = false;
                });
            dialogVisible.value = false;
        })
}

let insertDialog = () => {
    dialogVisible.value = true;
    isUpdate.value = false;
}

let insert = () => {
    axios.post(baseURL + '/database/insert' + 'WaterQualityStations',
        WaterQualityStations.value,
        {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then((response) => {
            ElMessage({
                message: '提交请求成功',
                type: 'success',
            });
            tableData.value.unshift(WaterQualityStations.value);
            giveIndex();
            dialogVisible.value = false;
        });

}

let leave = () => {
    ElMessageBox.confirm('退出本次输入吗？',
        'Warning',
        {
            confirmButtonText: '退出',
            cancelButtonText: '取消',
            type: 'warning',
        })
        .then(() => {
            dialogVisible.value = false;
            Object.keys(WaterQualityStations.value).forEach(key => {
                WaterQualityStations.value[key] = '';
            });
        })
}

let submit = () => {
    if (isUpdate.value) update()
    else insert()
}
</script>