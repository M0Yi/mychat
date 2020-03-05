import * as db from './db.js' 
//引入数据库操作
import {
	cdnUrl
} from './config.js'

/**
 * 失败提示
 * @param {String} msg 提示消息
 * @param {Function} callback 回调函数
 */

function errorToShow(msg = '操作失败', callback = function() {}) {
	uni.showToast({
		title: msg,
		icon: 'none',
		duration: 2000,
		mask: true
	});
	setTimeout(function() {
		callback();
	}, 2000);
}
/**
 * 交互反馈震动加音频
 * @param {Object} src
 */
function respond(src) {
	if (!src) {
		src =
			'data:audio/mpeg;base64,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';
	}
	// 短震动
	uni.vibrateShort({});
	// 播放提示音
	let innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	innerAudioContext.src = src;
	innerAudioContext.onError((res) => {
		return false;
	});
	innerAudioContext.play();
	return true;
}


/**
 * 添加cdn
 * @param {Object} srcUrl
 */
function CDN(srcUrl) {
	if (srcUrl) {
		if (srcUrl.substring(0, 9) == '/uploads/') {
			return cdnUrl + srcUrl;
		}
	}
	return srcUrl;
}

/**
 * 用户信息
 * @param {Array} data 用户数据
 */
function userInfo(data) {
	return db.get('userInfo'); 
}

/**
 * 保存登陆状态
 * @param {Array} data 用户数据
 */
function saveUserInfo(data) {
	data.userInfo.avatar = CDN(data.userInfo.avatar);
	db.set('userInfo', data.userInfo);
}

/**
 * 添加聊天记录
 */

function addRecord(id,data){
	let name = 'Record_'+id; 
	let rec = db.get(name)
	console.log('addRecord')
	if(rec){
		rec.push(data);
		db.set('Record_'+id,rec)
	}else{
		db.set('Record_'+id,[data])
	}
}


/**
 * 添加聊天记录
 */

function getRecord(id){
	console.log('getRecord')
	let rec = db.get('Record_'+id);
	if(rec){
		return rec;
	}else{
		return [];
	}
}

/**
 * 更新聊天记录状态
 */

function updateRecordState(data){
	console.log('updateRecordState',data)
	let record = db.get('Record_'+data.form);
	console.log('record',record)
	if(record){
		for (var i = record.length - 1; i >= 0; i--){
			console.log('正在查找',i)
			if(record[i].id == data.id){
				record[i].state = data.value
				db.set('Record_'+data.form,record)
				i = 0;
			}
		}
	}
}

function getUserInfo(id){
	console.log('getUserInfo')
	let rec = db.get('uid_'+id);
	if(rec){
		return rec;
	}else{
		return [];
	}
}


function addNewMessageList(id='1',value="消灭人类暴政！世界属于三体！",type="text",count=1){
	let user = getUserInfo(id);
	if(user.length==0){
		return
	};
	let tips = {
		count: count,
		value:value,
		type:type,
		time: new Date().getTime()
	}
	let list = db.get('NewMessageList');
	if(list){
		for (var i = list.length - 1; i >= 0; i--){
			if(user.id == list[i].user.id){
				tips.count += list[i].tips.count;
				if(tips.type=='tips'){
					tips.time = list[i].tips.time;
				}
				list.splice(i, 1);
			}
		}
		list.unshift({user:user,tips:tips})
		db.set('NewMessageList',list);
	}else{
		db.set('NewMessageList',[{user:user,tips:tips}]);
	}
}


function getNewMessageList(){
	console.log('NewMessageList')
	let list = db.get('NewMessageList');
	if(list){
		return list;
	}else{
		return [];
	}
}
function readNewMessageList(id){
	let list = db.get('NewMessageList');
	if(list){
		for (var i = list.length - 1; i >= 0; i--){
			if(id == list[i].user.id){
				list[i].tips.count = 0;
			}
		}
		db.set('NewMessageList',list);
	}
}

/**
 * 判断当前路由
 */
function isRoute(route="/pages/index/index"){
	let pages = getCurrentPages();
	let page = pages[pages.length - 1];
	if(route == page.route){
		return true;
	}else{
		return false;
	}
}
	

export {
	CDN,
	errorToShow,
	respond,
	saveUserInfo,
	userInfo,
	addRecord,
	getRecord,
	updateRecordState,
	getUserInfo,
	getNewMessageList,
	addNewMessageList,
	readNewMessageList,
	isRoute
	
}
