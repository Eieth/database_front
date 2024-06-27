<template>
    <el-table :data="tableData" stripe style="width: 100%" :border="true" height="57vh">
        <el-table-column label="用户ID" prop="id" />
        <el-table-column label="用户名" prop="username" />
        <el-table-column label="密码" prop="password" />
        <el-table-column label="权限" prop="level">
            <template #default="scope">
                <span v-if="scope.row.level == 0">普通用户</span>
                <span v-else-if="scope.row.level == 1">管理员</span>
                <span v-else-if="scope.row.level == 2">超级管理员</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="info" plain @click="changePassword(scope.row)">修改密码</el-button>
                <el-button type="warning" plain @click="changeLevel(scope.row)">修改权限</el-button>
                <el-button type="danger" plain @click="deleteUser(scope.row)">删除账号</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="passwordDialogVisiable" title="修改密码" width="20%">
        <el-form>
            <el-form-item label="新密码">
                <el-input v-model="newPassword" autocomplete="off" />
            </el-form-item>
            <el-form-item label="重复密码">
                <el-input v-model="newPasswordRep" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="passwordDialogVisiable = false">取消</el-button>
                <el-button type="primary" @click="passwordConfrim">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="levelDialogVisiable" title="修改权限" width="20%">
        <el-radio-group v-model="newLevel" size="large">
            <el-radio-button label="普通用户" :value="0" />
            <el-radio-button label="管理员" :value="1" />
            <el-radio-button label="超级管理员" :value="2" />
        </el-radio-group>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="levelDialogVisiable = false">取消</el-button>
                <el-button type="primary" @click="levelConfrim">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="deleteDialogVisiable" title="删除用户" width="25%">
        <el-text class="mx-1" type="danger">您清楚明白该操作是不可逆的删除了该用户，请确认！</el-text>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="deleteDialogVisiable = false">取消</el-button>
                <el-button type="primary" @click="deleteConfrim">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import baseURL from '@/axios';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store';

let tableData = ref([]);
let newPassword = ref('');
let newPasswordRep = ref('');
let newLevel = ref(0);
let passwordDialogVisiable = ref(false);
let levelDialogVisiable = ref(false);
let deleteDialogVisiable = ref(false);
let store = useUserStore();
let managedId = 0;
let oldLevel = 0;

const UserInfoFrom = ref({

})

axios.post(baseURL + '/user/getUsers', {}, {
    headers: {
        token: localStorage.getItem('token')
    }
}).then((response) => {
    if (response.data.code != 200) {
        return
    }
    tableData.value = response.data.data;
})


let changePassword = (row) => {
    newPassword.value = ''
    passwordDialogVisiable.value = true;
    managedId = row.id;
}

let passwordConfrim = () => {
    if (newPassword.value !== newPasswordRep.value) {
        ElMessage.error("两次密码输入不一致")
        newPasswordRep.value = ''
        return
    }
    passwordDialogVisiable.value = false;
    axios.post(baseURL + '/user/resetPassword', {
        "posterId": store.getId,
        "managedId": managedId,
        "newPassword": newPassword.value
    }, {
        headers: {
            token: localStorage.getItem('token')
        }
    }).then((response) => {
        ElMessage.success("修改成功");
        passwordDialogVisiable.value = false;
        tableData.value.forEach((item) => {
            if (item.id === managedId) {
                item.password = newPassword.value;
                return
            }
        })

    })

}

let changeLevel = (row) => {
    levelDialogVisiable.value = true;
    newLevel.value = row.level;
    managedId = row.id;
    oldLevel = row.level;
}

let levelConfrim = () => {
    if (newLevel.value === oldLevel) {
        levelDialogVisiable.value = false;
        return
    } 
    if (managedId === store.getId) {
        ElMessage.error("不能对本id进行操作")
        levelDialogVisiable.value = false;
        return
    }

    axios.post(baseURL + '/user/setLevel', {
        "posterId": store.getId,
        "managedId": managedId,
        "newLevel": transport(newLevel.value)
    }, {
        headers: {
            token: localStorage.getItem('token')
        }
    }).then((response) => {
        ElMessage.success("修改成功");
        levelDialogVisiable.value = false;
        tableData.value.forEach((item) => {
            if (item.id === managedId) {
                item.level = transport(newLevel.value.toString());
                return
            }
        })
    })
}

let transport = (str) => {
    switch (str) {
        case '普通用户': return '0';
        case '管理员': return '1';
        case '超级管理员': return '2';
        case '0': return '普通用户';
        case '1': return '管理员';
        case '2': return  '超级管理员';
    }
}

let deleteUser = (row) => {
    deleteDialogVisiable.value = true;
    managedId = row.id;
}

let deleteConfrim = () => {
    if (managedId === store.getId) {
        ElMessage.error("不能对本id进行操作")
        deleteDialogVisiable.value = false;
        return
    }
    axios.post(baseURL + '/user/deleteUser', {
        "posterId": store.getId,
        "managedId": managedId,
    }, {
        headers: {
            token: localStorage.getItem('token')
        }
    }).then((response) => {
        ElMessage.success("删除成功");
        deleteDialogVisiable.value = false;
        for (let i = 0; i < tableData.value.length; i++) {
            if (tableData.value[i].id === managedId) {
                tableData.value.splice(i, 1);
            }
        }
    })
}



</script>