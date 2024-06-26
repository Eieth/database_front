<template>
    <el-table :data="tableData" stripe style="width: 100%" :border="true" height="57vh" :table-layout="auto">
        <el-table-column label="用户ID" prop="id" />
        <el-table-column label="用户名" prop="username" />
        <el-table-column label="密码" prop="password" />
        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="info" plain @click="changePassword(scope.row)">修改密码</el-button>
                <el-button type="warning" plain @click="changeLevel(scope.row)">修改权限</el-button>
                <el-button type="danger" plain @click="deleteUser(scope.row)">删除账号</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="passwordDialogVisiable" title="修改密码">

    </el-dialog>
    <el-dialog v-model="levelDialogVisiable">

    </el-dialog>
    <el-dialog v-model="deleteDialogVisiable">

    </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import baseURL from '@/axios';
import axios from 'axios';

let tableData = ref([]);
let dataFetched = ref(false);
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
    console.log(tableData.value)
})

let filterTableData = computed(() => {
    return tableData.value.filter(
        (data) =>
            !search.value ||
            nullObjectHandler(data.id).toString().includes(search.value) ||
            nullObjectHandler(data.username).toString().includes(search.value)
    )
})

let nullObjectHandler = (object) => {
    if (object === null) {
        return ''
    } else
        return object
}

let changePassword = (row) => {
    console.log(row)
}

let changeLevel = (row) => {

}

let deleteUser = (row) => {

}



</script>