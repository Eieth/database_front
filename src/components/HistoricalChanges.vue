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
        <p style="margin-bottom: 2%; text-align: center; font-size: 30px; margin-top: -4vh;">沿革调查表</p>
    </div>
    <el-table :data="filterTableData" stripe style="width: 100%" :border="true" height="57vh" :table-layout="auto"
        v-loading="!dataFetched" @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
        <el-table-column label="测站编码" prop="stationCode" />
        <el-table-column label="测站名称" prop="stationName" />
        <el-table-column label="批准机关" prop="approvalAuthority" />
        <el-table-column label="变更情况" prop="changeSituation">
            <template #default="scope">
                <span>{{ getSituation(scope.row.changeSituation) }}</span>
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
                <!-- <el-input v-model="HistoricalChanges.changeSituation" /> -->
                <div>
                    <el-checkbox v-model="checked1" label="测站升级" size="large" :change="checkBoxChange()" />
                    <el-checkbox v-model="checked2" label="测站降级" size="large" :change="checkBoxChange()" />
                    <el-checkbox v-model="checked3" label="迁移" size="large" :change="checkBoxChange()" />
                    <el-checkbox v-model="checked4" label="撤销" size="large" :change="checkBoxChange()" />
                </div>
            </el-form-item>
            <el-form-item label="变更原因" prop="changeReason">
                <el-input v-model="HistoricalChanges.changeReason" />
            </el-form-item>
            <el-form-item label="站类管理" prop="stationManagement">
                <el-radio-group v-model="HistoricalChanges.stationManagement">
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
import { useUserStore } from '@/store';
let store = useUserStore();
let dataFetched = ref(false);
let tableData = ref([]);
let search = ref('');
let dialogStatus = ref(false);
let dialogVisible = ref(false)
let deleteDialogVisible = ref(false)
let selection = ref([]);
let situations = ['测站升级', '测站降级', '迁移', '撤销']
let checked1 = ref(false)
let checked2 = ref(false)
let checked3 = ref(false)
let checked4 = ref(false)
const HistoricalChanges = ref({
    id: '',
    stationCode: '',
    stationName: '',
    approvalAuthority: '',
    changeSituation: '',
    changeReason: '',
    stationManagement: '',
    stationFeature: '',
    note: ''
})
let changeSituationNum = 0;

const rules = ref({
    stationCode: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 10, message: '用户名必须是 5-10位 的字符', trigger: 'blur' }
    ]
})


axios.post(baseURL + '/database/get' + 'HistoricalChanges', {}, {
    headers: {
        token: localStorage.getItem('token')
    }
})
    .then((response) => {
        tableData.value = response.data.data;
        dataFetched.value = true
        giveIndex();
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
                nullObjectHandler(data.approvalAuthority).toString().includes(search.value) ||
                nullObjectHandler(data.changeSituation).toString().includes(search.value) ||
                nullObjectHandler(data.changeReason).toString().includes(search.value) ||
                nullObjectHandler(data.stationManagement).toString().includes(search.value) ||
                nullObjectHandler(data.stationFeature).toString().includes(search.value) ||
                nullObjectHandler(data.note).toString().includes(search.value)
        )
    }
    else {
        let res = [];
        res = tableData.value;
        Object.keys(HistoricalChanges.value).forEach(key => {
            if (nullObjectHandler(HistoricalChanges.value[key]) === '') {
                return;
            }
            res = res.filter((data) => {
                if (key === 'changeSituation') return situationHandler(data.changeSituation, changeSituationNum)
                return nullObjectHandler(data[key]).toString().includes(HistoricalChanges.value[key]);
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

let situationHandler = (num1, num2) => {
    return (((num1 & num2) ^ num2) === 0)
}

let checkBoxChange = (num) => {
    changeSituationNum = ((1 * checked1.value) + (2 * checked2.value) + (4 * checked3.value) + (8 * checked4.value));
    HistoricalChanges.value.changeSituation = changeSituationNum;
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
    Object.keys(HistoricalChanges.value).forEach(key => {
        HistoricalChanges.value[key] = selection.value[0][key];
    });
    let t = HistoricalChanges.value.changeSituation;
    checked1.value = ((t ^ 1) < t);
    checked2.value = ((t ^ 2) < t);
    checked3.value = ((t ^ 4) < t);
    checked4.value = ((t ^ 8) < t);
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
            HistoricalChanges.value.changeSituation = ((1 * checked1.value) + (2 * checked2.value) + (4 * checked3.value) + (8 * checked4.value))
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
    dialogStatus.value = 1;
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
    console.log(HistoricalChanges.value.changeSituation)
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
            Object.keys(HistoricalChanges.value).forEach(key => {
                HistoricalChanges.value[key] = '';
            });
            checked1.value = false
            checked2.value = false
            checked3.value = false
            checked4.value = false

        })
        dialogStatus.value = 0;
    
}

let submit = () => {
    if (dialogStatus.value === 0) update()
    else if (dialogStatus.value === 1) insert()
    else searchPro()
}

let getSituation = (num) => {
    if (num == 0) return '无'
    let res = [];
    for (let i = 0; i < 4; i++) {
        if ((num ^ 1) < num) {
            res.unshift(situations[i])
        }
        num >>= 1
    }
    return res.join(', ')
}
</script>