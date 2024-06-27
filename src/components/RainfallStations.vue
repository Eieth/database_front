<template>
    <div style="display: flex;" v-if="store.getLevel !== 0">
        <el-button type="danger" style="margin-left: 3vw;" @click="deleteDialogVisible = true">删除</el-button>
        <el-button type="primary" style="margin-left: 5vw;" @click="updateDialog">更新</el-button>
        <el-button type="warning" style="margin-left: 5vw;" @click="insertDialog">插入</el-button>
        <el-input style="margin-left: 40vw; margin-right: 4vw; " placeholder="搜索框" v-model="search" />
        <el-button type="primary" style="margin-right: 6vw;">高级搜索</el-button>
    </div>
    <div style="margin-top: 2vh;" v-else>
        <el-input style="margin-left: 60vw; width: 15vw;" placeholder="搜索框" v-model="search" />
        <el-button type="primary" style="margin-left: 4vw;">高级搜索</el-button>
    </div>

    <div>
        <p style="margin-bottom: 2%; text-align: center; font-size: 30px; margin-top: -4vh;">雨量站表</p>
    </div>
    <el-table :data="filterTableData" stripe style="width: 100%" :border="true" height="57vh" :table-layout="auto"
        v-if="dataFetched" @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
        <el-table-column label="测站名称" prop="stationName" />
        <el-table-column label="测站编码" prop="stationCode" />
        <el-table-column label="器口高度" prop="vesselHeight" />
        <el-table-column label="多年平均降雨量" prop="averageRainfall" />
        <el-table-column label="实测年最大降雨量" prop="maximumRainfall" />
        <el-table-column label="出现年份" prop="appearYear" />
        <el-table-column label="备注" prop="note" />


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
                <el-input v-model="RainfallStations.stationName" />
            </el-form-item>
            <el-form-item label="测站编码" prop="stationCode">
                <el-input v-model="RainfallStations.stationCode" />
            </el-form-item>
            <el-form-item label="器口高度" prop="gateHeight">
                <el-input v-model="RainfallStations.gateHeight" />
            </el-form-item>
            <el-form-item label="多年平均降雨量" prop="averageRainfall">
                <el-input v-model="RainfallStations.averageRainfall" />
            </el-form-item>
            <el-form-item label="实测年最大降雨量" prop="maximumRainfall">
                <el-input v-model="RainfallStations.maximumRainfall" />
            </el-form-item>
            <el-form-item label="出现年份" prop="appearYear">
                <el-input v-model="RainfallStations.appearYear" />
            </el-form-item>
            <el-form-item label="备注" prop="note">
                <el-input v-model="RainfallStations.note" />
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
let isUpdate = ref(false);
let dialogVisible = ref(false)
let deleteDialogVisible = ref(false)
let selection = ref([]);
const RainfallStations = ref({
    stationName: '',
    stationCode: '',
    gateHeight: '',
    averageRainfall: '',
    maximumRainfall: '',
    appearYear: '',
    note: ''
})


axios.post(baseURL + '/database/get' + 'RainfallStations', {}, {
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
            nullObjectHandler(data.gateHeight).toString().includes(search.value) ||
            nullObjectHandler(data.averageRainfall).toString().includes(search.value) ||
            nullObjectHandler(data.maximumRainfall).toString().includes(search.value) ||
            nullObjectHandler(data.appearYear).toString().includes(search.value) ||
            nullObjectHandler(data.note).toString().includes(search.value)
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
    Object.keys(RainfallStations.value).forEach(key => {
        RainfallStations.value[key] = selection.value[0][key];
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
            axios.post(baseURL + '/database/update' + 'RainfallStations',
                RainfallStations.value,
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
                    Object.keys(RainfallStations.value).forEach(key => {
                        selection.value[0][key] = RainfallStations.value[key];
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
    axios.post(baseURL + '/database/insert' + 'RainfallStations',
        RainfallStations.value,
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
            tableData.value.unshift(RainfallStations.value);
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
            Object.keys(RainfallStations.value).forEach(key => {
                RainfallStations.value[key] = '';
            });
        })
}

let submit = () => {
    if (isUpdate.value) update()
    else insert()
}
</script>