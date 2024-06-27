<template>
    <div style="display: flex;">
        <el-button type="danger" style="margin-left: 3vw;" @click="deleteDialogVisible = true">删除</el-button>
        <el-button type="primary" style="margin-left: 5vw;" @click="updateDialog">更新</el-button>
        <el-button type="warning" style="margin-left: 5vw;" @click="insertDialog">插入</el-button>
        <el-input style="margin-left: 40vw; margin-right: 10vw; " placeholder="搜索框" v-model="search" />
    </div>

    <div>
        <p style="margin-bottom: 2%; text-align: center; font-size: 30px; margin-top: -4vh;">沿革调查表</p>
    </div>
    <el-table :data="filterTableData" stripe style="width: 100%" :border="true" height="57vh" :table-layout="auto"
        v-if="dataFetched" @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
        <el-table-column label="测站编码" prop="stationCode" />
        <el-table-column label="测站名称" prop="stationName" />
        <el-table-column label="批准机关" prop="approvalAuthority" />
        <el-table-column label="变更情况" prop="changeSituation">
            <template #default="scope">
                <span>{{ getReason(scope.row.changeSituation) }}</span>
            </template>
        </el-table-column>
        <el-table-column label="变更原因" prop="changeReason" />
        <el-table-column label="站类管理" prop="stationManagement" />
        <el-table-column label="测站属性" prop="stationFeature" />
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
                <el-input v-model="HistoricalChanges.stationCode" />
            </el-form-item>
            <el-form-item label="测站名称" prop="stationName">
                <el-input v-model="HistoricalChanges.stationName" />
            </el-form-item>
            <el-form-item label="批准机关" prop="approvalAuthority">
                <el-input v-model="HistoricalChanges.approvalAuthority" />
            </el-form-item>
            <el-form-item label="变更情况" prop="changeSituation">
                <el-input v-model="HistoricalChanges.changeSituation" />
            </el-form-item>
            <el-form-item label="变更原因" prop="changeReason">
                <el-input v-model="HistoricalChanges.changeReason" />
            </el-form-item>
            <el-form-item label="站类管理" prop="stationManagement">
                <el-radio-group v-model="HistoricalChanges.stationFeature">
                    <el-radio label="基本站" value="基本站"></el-radio>
                    <el-radio label="专用站" value="专用站"></el-radio>
                    <el-radio label="试验站" value="试验站"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="测站属性" prop="stationFeature">
                <el-radio-group v-model="HistoricalChanges.stationFeature">
                    <el-radio label="河道站" value="河道站"></el-radio>
                    <el-radio label="闸坝站/渠道站" value="闸坝站/渠道站"></el-radio>
                    <el-radio label="水库站" value="水库站"></el-radio>
                    <el-radio label="潮流站" value="潮流站"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="备注" prop="note">
                <el-input v-model="HistoricalChanges.note" />
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
let situations = ['测站升级', '测站降级', '迁移', '撤销']

const HistoricalChanges = ref({
    stationCode: '',
    stationName: '',
    approvalAuthority: '',
    changeSituation: '',
    changeReason: '',
    stationManagement: '',
    stationFeature: '',
    note: ''
})


axios.post(baseURL + '/database/get' + 'HistoricalChanges', {}, {
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
            nullObjectHandler(data.stationCode).toString().includes(search.value) ||
            nullObjectHandler(data.stationName).toString().includes(search.value) ||
            nullObjectHandler(data.approvalAuthority).toString().includes(search.value) ||
            nullObjectHandler(data.changeSituation).toString().includes(search.value) ||
            nullObjectHandler(data.changeReason).toString().includes(search.value) ||
            nullObjectHandler(data.stationManagement).toString().includes(search.value) ||
            nullObjectHandler(data.stationFeature).toString().includes(search.value) ||
            nullObjectHandler(data.note).toString().includes(search.value)

    )
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
    Object.keys(HistoricalChanges.value).forEach(key => {
        HistoricalChanges.value[key] = selection.value[0][key];
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
            axios.post(baseURL + '/database/update' + 'HistoricalChanges',
                HistoricalChanges.value,
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
                    Object.keys(HistoricalChanges.value).forEach(key => {
                        selection.value[0][key] = HistoricalChanges.value[key];
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
    axios.post(baseURL + '/database/insert' + 'HistoricalChanges',
        HistoricalChanges.value,
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
            tableData.value.unshift(HistoricalChanges.value);
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
            Object.keys(HistoricalChanges.value).forEach(key => {
                HistoricalChanges.value[key] = '';
            });
        })
}

let submit = () => {
    if (isUpdate.value) update()
    else insert()
}

let getReason = (num) => {
    if (num == 0) return '无'
    let res = [];
    for (let i = 0; i < 4; i++) {
        if (num ^ 1 < num) {
            res.unshift(situations[i])
        }
        num >>= 1
    }
    return res.join(', ')
}
</script>