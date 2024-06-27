<template>
    <div style="display: flex;" v-if="store.getLevel !== 0">
        <el-button type="danger" style="margin-left: 3vw;" @click="deleteDialogVisible = true">删除</el-button>
        <el-button type="primary" style="margin-left: 5vw;" @click="updateDialog">更新</el-button>
        <el-button type="warning" style="margin-left: 5vw;" @click="insertDialog">插入</el-button>
        <el-input style="margin-left: 40vw; margin-right: 4vw; " placeholder="搜索框" v-model="search" />
        <el-button type="primary" style="margin-left: 1vw;" @click="searchProDialog">高级搜索</el-button>
        <el-button type="info" style="margin-left: 1vw;" @click="dialogStatus = 0">重置结果</el-button>
    </div>
    <div style="margin-top: 2vh;" v-else>
        <el-input style="margin-left: 60vw; width: 15vw;" placeholder="搜索框" v-model="search" />
        <el-button type="primary" style="margin-left: 4vw;" @click="searchProDialog">高级搜索</el-button>
        <el-button type="primary" style="margin-left: 1vw;" @click="searchProDialog">高级搜索</el-button>
        <el-button type="info" style="margin-left: 1vw;" @click="dialogStatus = 0">重置结果</el-button>
    </div>

    <div>
        <p style="margin-bottom: 2%; text-align: center; font-size: 30px; margin-top: -4vh;">测站基本信息表</p>
    </div>
    <el-table v-loading="!dataFetched" :data="filterTableData" stripe style="width: 100%" :border="true" height="57vh" :table-layout="auto" @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
        <el-table-column label="测站编码" prop="stationCode" />
        <el-table-column label="测站名称" prop="stationName" />
        <el-table-column label="测站特征值" prop="stationFeatureCode" />
        <el-table-column label="流域/区域" prop="watershedDistrict" />
        <el-table-column label="水系" prop="drainageSystem" />
        <el-table-column label="河流" prop="river" />
        <el-table-column label="设站日期" prop="setDate" />
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
            <el-form-item label="测站编码" prop="stationCode">
                <el-input v-model="StationBasicInfo.stationCode" @input="validateStationCode" />
                <div v-if="stationCodeError" style="color: red;">数据不符合规范</div>
            </el-form-item>
            <el-form-item label="测站名称" prop="stationName">
                <el-input v-model="StationBasicInfo.stationName" />
            </el-form-item>
            <el-form-item label="测站特征值" prop="stationFeatureCode">
                <el-input v-model="StationBasicInfo.stationFeatureCode" @input="validateStationFeatureCode" />
                <div v-if="stationFeatureCodeError" style="color: red;">数据不符合规范</div>
            </el-form-item>
            <el-form-item label="流域/区域" prop="watershedDistrict">
                <el-input v-model="StationBasicInfo.watershedDistrict" />
            </el-form-item>
            <el-form-item label="水系" prop="drainageSystem">
                <el-input v-model="StationBasicInfo.drainageSystem" />
            </el-form-item>
            <el-form-item label="河流" prop="river">
                <el-input v-model="StationBasicInfo.river" />
            </el-form-item>
            <el-form-item label="设站日期" prop="setDate">
                <el-input v-model="StationBasicInfo.setDate" />
            </el-form-item>
            <el-form-item label="测站地址" prop="stationAddress">
                <el-input v-model="StationBasicInfo.stationAddress" />
            </el-form-item>
            <el-form-item label="经度" prop="longitude">
                <el-input v-model="StationBasicInfo.longitude" />
            </el-form-item>
            <el-form-item label="纬度" prop="latitude">
                <el-input v-model="StationBasicInfo.latitude" />
            </el-form-item>
            <el-form-item label="管理单位" prop="manageUnit">
                <el-input v-model="StationBasicInfo.manageUnit" />
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
import { useUserStore } from '@/store';
let store = useUserStore();
let dataFetched = ref(false);
let tableData = ref([]);
let search = ref('');
let dialogStatus = ref(0);
let dialogVisible = ref(false)
let deleteDialogVisible = ref(false)
let selection = ref([]);
const StationBasicInfo = ref({
    stationCode: '',
    stationName: '',
    stationFeatureCode: '',
    watershedDistrict: '',
    drainageSystem: '',
    river: '',
    setDate: '',
    stationAddress: '',
    longitude: '',
    latitude: '',
    manageUnit: ''
})

const stationCodeError = ref(false);

const validateStationCode = () => {
    const value = StationBasicInfo.value.stationCode;
    // 如果值为空，则不进行校验
    if (value === '') {
        stationCodeError.value = false;
        return;
    }
    // 使用正则表达式校验是否为整数
    const isInteger = /^-?\d+$/.test(value);
    stationCodeError.value = !isInteger;
};

const stationFeatureCodeError = ref(false);

const validateStationFeatureCode = () => {
    const value = StationBasicInfo.value.stationFeatureCode;
    // 如果值为空，则不进行校验
    if (value === '') {
        stationFeatureCodeError.value = false;
        return;
    }
    // 使用正则表达式校验是否为整数
    const isInteger = /^-?\d+$/.test(value);
    stationFeatureCodeError.value = !isInteger;
};

axios.post(baseURL + '/database/get' + 'StationBasicInfo', {}, {
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
    if (dialogStatus.value === 0) {
        return tableData.value.filter(
            (data) =>
                !search.value ||
                nullObjectHandler(data.stationCode).toString().includes(search.value) ||
                nullObjectHandler(data.stationName).toString().includes(search.value) ||
                nullObjectHandler(data.stationFeatureCode).toString().includes(search.value) ||
                nullObjectHandler(data.watershedDistrict).toString().includes(search.value) ||
                nullObjectHandler(data.drainageSystem).toString().includes(search.value) ||
                nullObjectHandler(data.river).toString().includes(search.value) ||
                nullObjectHandler(data.setDate).toString().includes(search.value) ||
                nullObjectHandler(data.stationAddress).toString().includes(search.value) ||
                nullObjectHandler(data.longitude).toString().includes(search.value) ||
                nullObjectHandler(data.latitude).toString().includes(search.value) ||
                nullObjectHandler(data.manageUnit).toString().includes(search.value)
        )
    }
    else if (dialogStatus.value === 2) {
        let res = [];
        res = tableData.value;
        Object.keys(StationBasicInfo.value).forEach(key => {
            if (nullObjectHandler(StationBasicInfo.value[key]) === '') {
                return;
            }
            res = res.filter((data)=> {
                return nullObjectHandler(data[key]).toString().includes(StationBasicInfo.value[key]);
            })
        });
        return res;
    }
})

let nullObjectHandler = (object) => {
    if (object === null) {
        return ''
    } else
        return object
}

let handleSelectionChange = (val) => {
    selection.value = val;
}

let getTitle = () => {
    switch (dialogStatus.value) {
        case 0: return '更新';
        case 1: return '插入';
        case 2: return '高级搜索';
    }
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
    Object.keys(StationBasicInfo.value).forEach(key => {
        StationBasicInfo.value[key] = selection.value[0][key];
    });
    dialogVisible.value = true;
    dialogStatus.value = 0;
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
            axios.post(baseURL + '/database/update' + 'StationBasicInfo',
                StationBasicInfo.value,
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
                    Object.keys(StationBasicInfo.value).forEach(key => {
                        selection.value[0][key] = StationBasicInfo.value[key];
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
    dialogStatus.value = 1;
}

let insert = () => {
    axios.post(baseURL + '/database/insert' + 'StationBasicInfo',
        StationBasicInfo.value,
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
            tableData.value.unshift(StationBasicInfo.value);
            giveIndex();
            dialogVisible.value = false;
            dialogStatus.value === 0
        });
    dialogVisible.value = false;
    dialogStatus.value === 0
}

let searchProDialog = () => {
    dialogVisible.value = true;
    dialogStatus.value = 2;
}

let searchPro = () => {
    dialogVisible.value = false;
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
            dialogStatus.value = 0;
            Object.keys(StationBasicInfo.value).forEach(key => {
                StationBasicInfo.value[key] = '';
            });
        })
    dialogStatus.value = 0;
}

let submit = () => {
    if (dialogStatus.value === 0) update()
    else if (dialogStatus.value === 1) insert()
    else searchPro()
}
</script>