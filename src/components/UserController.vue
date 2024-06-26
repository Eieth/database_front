<template>
    <el-table :data="filterTableData" stripe style="width: 100%" :border="true" height="57vh" :table-layout="auto"
        v-if="dataFetched"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
        <el-table-column prop="id" label="用户ID" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="password" label="用户密码" />
    </el-table>
</template>

<script setup>

</script>