import * as common from './common.js'
import * as db from './db.js'

//引入参数操作
import {
	webSocket,
	pingInterval,
	timeout
} from './config.js'

var test = 'ok'
var state = 'fail'
var time = 0;
function connect() {
	console.log('尝试重启',state)
	let newTime = new Date().getTime() - time;
	// 时间超过30秒未沟通允许重启
	if (state != 'connect') {
		let userInfo = common.userInfo();
		uni.connectSocket({
			url: webSocket + '?id=' + userInfo.id + '&token=' + userInfo.token,
		});
		uni.onSocketOpen(res => {
			state = 'connect';
			console.log('WebSocket连接已打开！');
			if(pingInterval){
				ping();
			}
			time = new Date().getTime();
			console.log('time',time)
			uni.$emit('socketOpen')
		});
		uni.onSocketError(res => {
			state = 'fail'
			uni.$emit('socketError')
			console.log('WebSocket连接打开失败！');
			// common.errorToShow('WebSocket连接打开失败，请检查！');
		});
		uni.onSocketMessage(res => {
			try {
				// console.log('onSocketMessage',res)
				time = new Date().getTime();
				res = JSON.parse(res.data);
				if(res.code == 401){
					state = 'fail'
					console.log('未登陆');
					common.exitLogin();
				}
				uni.$emit('socketMessage',res);
			} catch (e) {
				console.log('接受到错误格式消息');
			}
		});
	}else{
		console.log('WebSocket正常状态无需重连')
	}
	
}

function ping(){
	console.log('主动ping给服务器')
	uni.sendSocketMessage({
		data: JSON.stringify({ type: 'ping' })
	});
	setTimeout(()=>{
		if(state=='connect'){
			ping();
		}
	}, pingInterval*1000);
}

export {
	connect
}
