<template>
	<div class="homebox">
		<div class="login">
			<button style="background:transparent;border-width:0px;outline:none;color: #fff;"
				@click="handleChange('login')">
				<h2 :class="(action === 'login') ? 'active' : 'nonactive'" id="login"> 登录 </h2>
			</button>

			<button style="background:transparent;border-width:0px;outline:none;color: #fff;"
				@click="handleChange('singup')">
				<h2 :class="(action === 'login') ? 'nonactive' : 'active'" id="signup"> 注册 </h2>
			</button>

			<div class="input_form">

				<input type="text" class="text" name="username" v-model="username">
				<span>用户名</span>

				<br>

				<br>

				<input type="password" class="text" name="password" v-model="password">
				<span>密码</span>
				<br>

				<div v-show="action !== 'login'">
					<br>
					<input type="password" class="text" name="password" v-model="password_rept">
					<span>重复密码</span>
					<br>
				</div>



				<button class="signin" @click="submit()">
					登录/注册
				</button>

			</div>

		</div>
	</div>


</template>

<script setup>
import { onBeforeMount, onMounted, onBeforeUnmount, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store';
import axios from 'axios';
import baseURL from '@/axios';
import router from '@/router/router';

const userState = useUserStore();

onBeforeMount(() => {
	document.querySelector('body').setAttribute('style', 'background:#d3d3d3')
})
onMounted(() => {
	if (userState.getLoginStatus) {
		router.push('manage/about')
	}
})
onBeforeUnmount(() => {
	document.querySelector('body').setAttribute('style', 'background:#ffffff')
})

let action = ref('login');

let username = ref('')
let password = ref('')
let password_rept = ref('')



let handleChange = (item) => {
	if (item === action.value) return;
	action.value = item;
}

let submit = () => {
	if (username.value === '') {
		ElMessage.error("请输入用户名");
		return;
	}

	if (password.value === '') {
		ElMessage.error("请输入密码");
		return;
	}

	if (action.value === 'signup') {
		if (password_rept === '') {
			ElMessage.error("请再次输入密码");
			return;
		} else {
			if (password.value !== password_rept.value) {
				ElMessage.error("两次输入的密码不同，请再确认");
				return;
			} else {
				axios.post(baseURL + '/user/signup', {
					username: username.value,
					password: password.value
				}).then((res) => {
					if (res.data.code === 200) {

					}
				})
			}
		}
	} else {
		// axios.post(baseURL + '/user/login', {
		// 	username: username.value,
		// 	password: password.value
		// }).then((res) => {
		// 	if (res.data.code === 200) {

		// 	}
		// })

		router.push('manage/about')
	}
}
</script>

<style scoped>
.homebox {
	font-family: 'Montserrat', sans-serif;
	color: #fff;
	font-size: 14px;
	letter-spacing: 1px;
}

.signin {
	background-color: #d3d3d3;
	font-family: 'Montserrat', sans-serif;
	color: #fff;
	font-size: 14px;
	letter-spacing: 1px;
}

.login {
	position: relative;
	height: 450px;
	width: 405px;
	margin: 20vh auto;
	padding: 60px 60px;
	background: #505050;
	background-size: cover;
	box-shadow: 0px 30px 60px -5px #000;
}

.input_form {
	padding-top: 80px;
}

.active {
	border-bottom: 2px solid #1161ed;
}

.nonactive {
	color: rgba(255, 255, 255, 0.2);
}

h2 {
	padding-left: 12px;
	font-size: 22px;
	text-transform: uppercase;
	padding-bottom: 5px;
	letter-spacing: 2px;
	display: inline-block;
	font-weight: 100;
}

h2:first-child {
	padding-left: 0px;
}

span {
	text-transform: uppercase;
	font-size: 12px;
	opacity: 0.4;
	display: inline-block;
	position: relative;
	top: -65px;
	transition: all 0.5s ease-in-out;
}

.text {
	border: none;
	width: 89%;
	padding: 10px 20px;
	display: block;
	height: 15px;
	border-radius: 20px;
	background: rgba(255, 255, 255, 0.1);
	border: 2px solid rgba(255, 255, 255, 0);
	overflow: hidden;
	margin-top: 15px;
	transition: all 0.5s ease-in-out;
}

.text:focus {
	outline: 0;
	border: 2px solid rgba(255, 255, 255, 0.5);
	border-radius: 20px;
	background: rgba(0, 0, 0, 0);
}

.text:focus+span {
	opacity: 0.6;
}

input[type="text"],
input[type="password"] {
	font-family: 'Montserrat', sans-serif;
	color: #fff;
}

input {
	display: inline-block;
	padding-top: 20px;
	font-size: 14px;
}

h2,
span {
	margin-left: 20px;
}

label {
	display: inline-block;
	padding-top: 10px;
	padding-left: 5px;
}

.signin {
	background-color: #1161ed;
	color: #FFF;
	width: 100%;
	padding: 10px 20px;
	display: block;
	height: 39px;
	border-radius: 20px;
	margin-top: 30px;
	transition: all 0.5s ease-in-out;
	border: none;
	text-transform: uppercase;
}

.signin:hover {
	background: #4082f5;
	box-shadow: 0px 4px 35px -5px #4082f5;
	cursor: pointer;
}

.signin:focus {
	outline: none;
}
</style>