import {
	apiUrl
} from './config.js';
import * as db from './db.js' //引入common

/**
 * post请求
 */
const post = (method, data, success = () => {}, complete = () => {}) => {
	let userToken = '';
	let auth = db.get("userInfo");
	if (auth) {
		if (auth.expiretime > (new Date()) / 1000) {
			userToken = auth.token;
		}
	}
	uni.request({
		url: apiUrl + method,
		data: data,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			// 'Accept-Language': localStorage.getItem('locale')?localStorage.getItem('locale'):'en',
			'token': userToken,
		},
		method: 'POST',
		success: (response) => {
			const result = response.data
			switch (result.code) {
				case 0:
				case 1:
					success(result);
					break;
				case 401:
					db.del("userInfo");
					console.log('pluse login')
					// uni.reLaunch({
					// 	url:'/pages/user/login'
					// })
					break;
				default:
					uni.showToast({
						title: result.msg,
						icon: 'none',
						duration: 2000,
					});
					break;
			}
		},
		complete: () => {
			complete();
		}
	});
}

// 初始化
export const init = (data, success, complete) => post('init', data, success, complete);

// 登陆
export const login = (data, success, complete) => post('user/login', data, success, complete);

// 手机登陆
export const mobileLogin = (data, success, complete) => post('user/mobileLogin', data, success, complete)

// 刷新用户
export const refreshUser = (data, success, complete) => post('user/refreshUser', data, success, complete);

// 发送登陆验证码
export const sendLoginCaptcha = (data, success, complete) => post('sms/sendLoginCaptcha', data, success, complete);

// 关系列表
export const friendsList = (data, success, complete) => post('social/friendsList', data, success, complete);

// 关系列表
export const getUserInfo = (data, success, complete) => post('social/getUserInfo', data, success, complete);
