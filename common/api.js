import {
	apiUrl,
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
					uni.reLaunch({
						url:'/pages/user/login'
					})
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

/**
 * 
 */
export const uploadFile = (filePath,success = () => {}, fail = () => {},type='image') => {
	
	let formData = {
		file:filePath
	}
	let auth = db.get("userInfo");
	let userToken = '';
	if (auth) {
		userToken = auth.token;
	}
	uni.uploadFile({
		url: apiUrl + 'Common/upload',
		filePath: filePath,
		fileType: type,
		name: 'file',
		header: {
			'token': userToken
		},
		formData: formData,
		success: (uploadFileRes) => {
			success(JSON.parse(uploadFileRes.data))
		},
		fail: (error) => {
			fail(error)
		},
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

// 发送绑定验证码
export const sendBindMobileCaptcha = (data, success, complete) => post('sms/sendBindMobile', data, success, complete);

// 关系列表
export const friendsList = (data, success, complete) => post('social/friendsList', data, success, complete);

// 关系用户信息
export const getUserInfo = (data, success, complete) => post('social/getUserInfo', data, success, complete);

// 宇宙列表
export const getCosmosList = (data, success, complete) => post('cosmos/getList', data, success, complete);

// 宇宙列表
export const getCosmosUserList = (data, success, complete) => post('cosmos/getUserList', data, success, complete);

// 宇宙回响
export const getReviewList = (data, success, complete) => post('cosmos/getReview', data, success, complete);

// 宇宙回响
export const addReview = (data, success, complete) => post('cosmos/review', data, success, complete);

// 宇宙标记
export const cosmosLike = (data, success, complete) => post('cosmos/like', data, success, complete);

// 宇宙推送
export const cosmosPush = (data, success, complete) => post('cosmos/push', data, success, complete);

// 编辑资料
export const editProfile = (data, success, complete) => post('user/editProfile', data, success, complete);

// 修改密码
export const changePassword = (data, success, complete) => post('user/changePassword', data, success, complete);

// 修改手机
export const changeMobile = (data, success, complete) => post('user/changeMobile', data, success, complete);

// 获取CMS详情
export const cmsGetDetails = (data, success, complete) => post('cms/getDetails', data, success, complete);

// 反馈推送
export const feedbackPush = (data, success, complete) => post('feedback/push', data, success, complete);

// 微信登陆
export const wechatLogin = (data, success, complete) => post('user/wechatLogin', data, success, complete);


// 退出登陆
export const logout = () => post('user/logout');

