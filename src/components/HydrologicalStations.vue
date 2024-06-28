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
        <el-button type="primary" style="margin-left: 1vw;" @click="searchProDialog">高级搜索</el-button>
        <el-button type="info" style="margin-left: 1vw;" @click="dialogStatus = 0">重置结果</el-button>
    </div>

    <div>
        <p style="margin-bottom: 2%; text-align: center; font-size: 30px; margin-top: -4vh;">水文站表</p>
    </div>
    <el-table :data="filterTableData" stripe style="width: 100%" :border="true" height="57vh" :table-layout="auto"
        v-loading="!dataFetched" @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
        <el-table-column label="测站编码" prop="stationCode" />
        <el-table-column label="测站名称" prop="stationName" />
        <el-table-column label="站类管理" prop="stationManagement" />
        <el-table-column label="测站属性" prop="stationFeature" />
        <el-table-column label="测站分类" prop="stationClassify" />
        <el-table-column label="测站高程" prop="stationHeight" />
        <el-table-column label="基面名称" prop="baseName" />
        <el-table-column label="所属勘测队" prop="surveyTeam" />
        <el-table-column label="基面修正值" prop="baseAmendment" />
        <el-table-column label="建设单位" prop="buildUnit" />
        <el-table-column label="多年平均径流量" prop="averageFlowRate" />
        <el-table-column label="实测最大流量的流量" prop="actualMaximumFlowRate" />
        <el-table-column label="实测最大流量的时间" prop="actualMaximumFlowRateTime" />
        <el-table-column label="实测最小流量的流量" prop="actualMinimalFlowRate" />
        <el-table-column label="实测最小流量的时间" prop="actualMinimalFlowRateTime" />
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
            <el-form-item label="测站编码" prop="stationCode">
                <el-input v-model="HydrologicalStations.stationCode" @input="validateStationCode" />
                <div v-if="stationCodeError" style="color: red;">数据不符合规范</div>
            </el-form-item>
            <el-form-item label="测站名称" prop="stationName">
                <el-input v-model="HydrologicalStations.stationName" />
            </el-form-item>
            <el-form-item label="站类管理" prop="stationManagement">
                <el-radio-group v-model="HydrologicalStations.stationManagement">
                    <el-radio label="国家重要站" value="国家重要站"></el-radio>
                    <el-radio label="省级重要站" value="省级重要站"></el-radio>
                    <el-radio label="一般站" value="一般站"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="测站属性" prop="stationFeature">
                <el-radio-group v-model="HydrologicalStations.stationFeature">
                    <el-radio label="河道站" value="河道站"></el-radio>
                    <el-radio label="湖泊站" value="湖泊站"></el-radio>
                    <el-radio label="水库站" value="水库站"></el-radio>
                    <el-radio label="潮流量站" value="潮流量站"></el-radio>
                    <el-radio label="渠道" value="渠道"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="测站分类" prop="stationClassify">
                <el-radio-group v-model="HydrologicalStations.stationClassify">
                    <el-radio label="大河控制站" value="大河控制站"></el-radio>
                    <el-radio label="区域代表站" value="区域代表站"></el-radio>
                    <el-radio label="小河站" value="小河站"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="测站高程" prop="stationHeight">
                <el-input v-model="HydrologicalStations.stationHeight" @input="validateStationHeight" />
                <div v-if="stationHeightError" style="color: red;">数据不符合规范</div>
            </el-form-item>
            <el-form-item label="基面名称" prop="baseName">
                <el-input v-model="HydrologicalStations.baseName" />
            </el-form-item>
            <el-form-item label="所属勘测队" prop="surveyTeam">
                <el-input v-model="HydrologicalStations.surveyTeam" />
            </el-form-item>
            <el-form-item label="基面修正值" prop="baseAmendment">
                <el-input v-model="HydrologicalStations.baseAmendment" @input="validateBaseAmendment" />
                <div v-if="baseAmendmentError && HydrologicalStations.baseAmendment !== ''" style="color: red;">数据不符合规范</div>
            </el-form-item>
            <el-form-item label="建设单位" prop="buildUnit">
                <el-input v-model="HydrologicalStations.buildUnit" />
            </el-form-item>
            <el-form-item label="多年平均径流量" prop="averageFlowRate">
                <el-input v-model="HydrologicalStations.averageFlowRate" @input="validateAverageFlowRate" />
                <div v-if="averageFlowRateError && HydrologicalStations.averageFlowRate !== ''" style="color: red;">数据不符合规范</div>
            </el-form-item>
            <el-form-item label="实测最大流量的流量" prop="actualMaximumFlowRate">
                <el-input v-model="HydrologicalStations.actualMaximumFlowRate" @input="validateActualMaximumFlowRate" />
                <div v-if="actualMaximumFlowRateError && HydrologicalStations.actualMaximumFlowRate !== ''" style="color: red;">数据不符合规范</div>
            </el-form-item>
            <el-form-item label="实测最大流量的时间" prop="actualMaximumFlowRateTime">
                <el-input v-model="HydrologicalStations.actualMaximumFlowRateTime" />
            </el-form-item>
            <el-form-item label="实测最小流量的流量" prop="actualMinimalFlowRate">
                <el-input v-model="HydrologicalStations.actualMinimalFlowRate" @input="validateActualMinimalFlowRate" />
                <div v-if="actualMinimalFlowRateError && HydrologicalStations.actualMinimalFlowRate !== ''" style="color: red;">数据不符合规范</div>
            </el-form-item>
            <el-form-item label="实测最小流量的时间" prop="actualMinimalFlowRateTime">
                <el-input v-model="HydrologicalStations.actualMinimalFlowRateTime" />
            </el-form-item>
            <el-form-item label="备注" prop="note">
                <el-input v-model="HydrologicalStations.note" />
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
const HydrologicalStations = ref({
    stationCode: '',
    stationName: '',
    stationManagement: '',
    stationFeature: '',
    stationClassify: '',
    stationHeight: '',
    baseName: '',
    baseAmendment: '',    
    surveyTeam: '',
    buildUnit: '',
    averageFlowRate: '',
    actualMaximumFlowRate: '',
    actualMaximumFlowRateTime: '',
    actualMinimalFlowRate: '',
    actualMinimalFlowRateTime: '',
    note: ''

})

const stationCodeError = ref(false);
const stationHeightError = ref(false);
const baseAmendmentError = ref(false);
const averageFlowRateError = ref(false);
const actualMaximumFlowRateError = ref(false);
const actualMinimalFlowRateError = ref(false);

const validateStationCode = () => {
    const value = HydrologicalStations.value.stationCode;
    // 如果值为空，则不进行校验
    if (value === '') {
        stationCodeError.value = false;
        return;
    }
    // 使用正则表达式校验是否为整数
    const isInteger = /^-?\d+$/.test(value);
    stationCodeError.value = !isInteger;
};
const validateStationHeight = () => {
    const value = HydrologicalStations.value.stationHeight;
    // 如果值为空，则不进行校验
    if (value === '') {
        stationHeightError.value = false;
        return;
    }
    // 使用正则表达式校验是否为浮点数
    const isFloat = /^-?\d+(\.\d+)?$/.test(value);
    stationHeightError.value = !isFloat;
};

const validateBaseAmendment = () => {
    const value = HydrologicalStations.value.baseAmendment;
    // 如果值为空，则不进行校验
    if (value === '') {
        baseAmendmentError.value = false;
        return;
    }
    // 使用正则表达式校验是否为浮点数
    const isFloat = /^-?\d+(\.\d+)?$/.test(value);
    baseAmendmentError.value = !isFloat;
};

const validateAverageFlowRate = () => {
    const value = HydrologicalStations.value.averageFlowRate;
    // 如果值为空，则不进行校验
    if (value === '') {
        averageFlowRateError.value = false;
        return;
    }
    // 使用正则表达式校验是否为浮点数
    const isFloat = /^-?\d+(\.\d+)?$/.test(value);
    averageFlowRateError.value = !isFloat;
};

const validateActualMaximumFlowRate = () => {
    const value = HydrologicalStations.value.actualMaximumFlowRate;
    // 如果值为空，则不进行校验
    if (value === '') {
        actualMaximumFlowRateError.value = false;
        return;
    }
    // 使用正则表达式校验是否为浮点数
    const isFloat = /^-?\d+(\.\d+)?$/.test(value);
    actualMaximumFlowRateError.value = !isFloat;
};

const validateActualMinimalFlowRate = () => {
    const value = HydrologicalStations.value.actualMinimalFlowRate;
    // 如果值为空，则不进行校验
    if (value === '') {
        actualMinimalFlowRateError.value = false;
        return;
    }
    // 使用正则表达式校验是否为浮点数
    const isFloat = /^-?\d+(\.\d+)?$/.test(value);
    actualMinimalFlowRateError.value = !isFloat;
};

let deleteRow = () => {

axios.post(baseURL + '/database/delete' + 'HydrologicalStations',
    {
        stationCode: selection.value[0].stationCode
    },
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
        selection.value.forEach((value) => {
            tableData.value.splice(value.index, 1);
            giveIndex();
        })
        deleteDialogVisible.value = false;
    });
}

axios.post(baseURL + '/database/get' + 'HydrologicalStations', {}, {
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
            nullObjectHandler(data.stationManagement).toString().includes(search.value) ||
            nullObjectHandler(data.stationFeature).toString().includes(search.value) ||
            nullObjectHandler(data.stationClassify).toString().includes(search.value) ||
            nullObjectHandler(data.stationHeight).toString().includes(search.value) ||
            nullObjectHandler(data.baseName).toString().includes(search.value) ||
            nullObjectHandler(data.surveyTeam).toString().includes(search.value) ||
            nullObjectHandler(data.baseAmendment).toString().includes(search.value) ||
            nullObjectHandler(data.buildUnit).toString().includes(search.value) ||
            nullObjectHandler(data.averageFlowRate).toString().includes(search.value) ||
            nullObjectHandler(data.actualMaximumFlowRate).toString().includes(search.value) ||
            nullObjectHandler(data.actualMaximumFlowRateTime).toString().includes(search.value) ||
            nullObjectHandler(data.actualMinimalFlowRate).toString().includes(search.value) ||
            nullObjectHandler(data.actualMinimalFlowRateTime).toString().includes(search.value) ||
            nullObjectHandler(data.note).toString().includes(search.value)
        )
    }
    else if (dialogStatus.value === 2) {
        let res = [];
        res = tableData.value;
        Object.keys(HydrologicalStations.value).forEach(key => {
            if (nullObjectHandler(HydrologicalStations.value[key]) === '') {
                return;
            }
            res = res.filter((data)=> {
                return nullObjectHandler(data[key]).toString().includes(HydrologicalStations.value[key]);
            })
        });
        return res;
    }
    else return tableData.value
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
    Object.keys(HydrologicalStations.value).forEach(key => {
        HydrologicalStations.value[key] = selection.value[0][key];
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
            axios.post(baseURL + '/database/update' + 'HydrologicalStations',
                HydrologicalStations.value,
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
                    Object.keys(HydrologicalStations.value).forEach(key => {
                        selection.value[0][key] = HydrologicalStations.value[key];
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
    axios.post(baseURL + '/database/insert' + 'HydrologicalStations',
        HydrologicalStations.value,
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
            tableData.value.unshift(HydrologicalStations.value);
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
            Object.keys(HydrologicalStations.value).forEach(key => {
                HydrologicalStations.value[key] = '';
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