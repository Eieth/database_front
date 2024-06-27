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
        <p style="margin-bottom: 2%; text-align: center; font-size: 30px; margin-top: -4vh;">水位站表</p>
    </div>
    <el-table :data="filterTableData" stripe style="width: 100%" :border="true" height="57vh" :table-layout="auto"
        v-if="dataFetched" @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
        <el-table-column label="测站名称" prop="stationName" />
        <el-table-column label="测站编码" prop="stationCode" />
        <el-table-column label="站类管理" prop="stationManagement" />
        <el-table-column label="测站属性" prop="stationFeature" />
        <el-table-column label="建设单位" prop="buildUnit" />
        <el-table-column label="所属勘测队" prop="surveyTeam" />   
        <el-table-column label="实测最高水位" prop="actualHighestLevel" />
        <el-table-column label="实测最高水位时间" prop="actualHighestTime" />
        <el-table-column label="实测最低水位" prop="actualLowestLevel" />
        <el-table-column label="实测最低水位时间" prop="actualLowestTime" />
        <el-table-column label="河干时间" prop="firstDryTime" />
        <el-table-column label="平均每年河干天数" prop="averageDryDay" />
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
                <el-input v-model="WaterLevelStations.stationName" />
            </el-form-item>
            <el-form-item label="测站编码" prop="stationCode">
                <el-input v-model="WaterLevelStations.stationCode" />
            </el-form-item>
            <el-form-item label="站类管理" prop="stationManagement">
                <el-radio-group v-model="WaterLevelStations.stationFeature">
                    <el-radio label="基本站" value="基本站"></el-radio>
                    <el-radio label="中小河流" value="中小河流"></el-radio>
                    <el-radio label="山洪灾害" value="山洪灾害"></el-radio>
                    <el-radio label="其他" value="其他"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="测站属性" prop="stationFeature">
                <el-radio-group v-model="WaterLevelStations.stationFeature">
                    <el-radio label="河道站" value="河道站"></el-radio>
                    <el-radio label="湖泊站" value="湖泊站"></el-radio>
                    <el-radio label="水库站" value="水库站"></el-radio>
                    <el-radio label="潮流量站" value="潮流量站"></el-radio>
                    <el-radio label="渠道" value="渠道"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="建设单位" prop="buildUnit">
                <el-input v-model="WaterLevelStations.buildUnit" />
            </el-form-item>
            <el-form-item label="所属勘测队" prop="surveyTeam">
                <el-input v-model="WaterLevelStations.surveyTeam" />
            </el-form-item>
            <el-form-item label="实测最高水位" prop="actualHighestLevel">
                <el-input v-model="WaterLevelStations.actualHighestLevel" />
            </el-form-item>
            <el-form-item label="实测最高水位时间" prop="actualHighestTime">
                <el-input v-model="WaterLevelStations.actualHighestTime" />
            </el-form-item>
            <el-form-item label="实测最低水位" prop="actualLowestLevel">
                <el-input v-model="WaterLevelStations.actualLowestLevel" />
            </el-form-item>
            <el-form-item label="实测最低水位时间" prop="actualLowestTime">
                <el-input v-model="WaterLevelStations.actualLowestTime" />
            </el-form-item>
            <el-form-item label="河干时间" prop="firstDryTime">
                <el-input v-model="WaterLevelStations.firstDryTime" />
            </el-form-item>
            <el-form-item label="平均每年河干天数" prop="averageDryDay">
                <el-input v-model="WaterLevelStations.averageDryDay" />
            </el-form-item>
            <el-form-item label="备注" prop="note">
                <el-input v-model="WaterLevelStations.note" />
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
const WaterLevelStations = ref({
    stationName: '',
    stationCode: '',
    stationManagement: '',
    stationFeature: '',
    buildUnit: '',
    surveyTeam: '',
    actualHighestLevel: '',
    actualHighestTime: '',
    actualLowestLevel: '',
    actualLowestTime: '',
    firstDryTime: '',
    averageDryDay: '',
    note: ''
})


axios.post(baseURL + '/database/get' + 'WaterLevelStations', {}, {
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
            nullObjectHandler(data.stationName).toString().includes(search.value) ||
            nullObjectHandler(data.stationCode).toString().includes(search.value) ||
            nullObjectHandler(data.stationManagement).toString().includes(search.value) ||
            nullObjectHandler(data.stationFeature).toString().includes(search.value) ||
            nullObjectHandler(data.buildUnit).toString().includes(search.value) ||
            nullObjectHandler(data.surveyTeam).toString().includes(search.value) ||
            nullObjectHandler(data.actualHighestLevel).toString().includes(search.value) ||
            nullObjectHandler(data.actualHighestTime).toString().includes(search.value) ||
            nullObjectHandler(data.actualLowestLevel).toString().includes(search.value) ||
            nullObjectHandler(data.actualLowestTime).toString().includes(search.value) ||
            nullObjectHandler(data.firstDryTime).toString().includes(search.value) ||
            nullObjectHandler(data.averageDryDay).toString().includes(search.value) ||
            nullObjectHandler(data.note).toString().includes(search.value)
        )
    }
    else {
        let res = [];
        res = tableData.value;
        Object.keys(WaterLevelStations.value).forEach(key => {
            if (nullObjectHandler(WaterLevelStations.value[key]) === '') {
                return;
            }
            res = res.filter((data)=> {
                return nullObjectHandler(data[key]).toString().includes(WaterLevelStations.value[key]);
            })
        });
        return res;
    }
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
    Object.keys(WaterLevelStations.value).forEach(key => {
        WaterLevelStations.value[key] = selection.value[0][key];
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
            axios.post(baseURL + '/database/update' + 'WaterLevelStations',
                WaterLevelStations.value,
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
                    Object.keys(WaterLevelStations.value).forEach(key => {
                        selection.value[0][key] = WaterLevelStations.value[key];
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
    axios.post(baseURL + '/database/insert' + 'WaterLevelStations',
        WaterLevelStations.value,
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
            tableData.value.unshift(WaterLevelStations.value);
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
            Object.keys(WaterLevelStations.value).forEach(key => {
                WaterLevelStations.value[key] = '';
            });
        })
}

let submit = () => {
    if (dialogStatus.value === 0) update()
    else if (dialogStatus.value === 1) insert()
    else searchPro()
}

</script>