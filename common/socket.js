import * as common from './common.js'

//引入参数操作
import {
	webSocket
} from './config.js'


var test = 'ok'
var state = 'fail'

function connect() {
	if (state != 'connect') {
		let userInfo = common.userInfo();
		uni.connectSocket({
			url: webSocket + '?id=' + userInfo.id + '&token=' + userInfo.token,
		});
		uni.onSocketOpen(res => {
			state = 'connect';
			console.log('WebSocket连接已打开！');
		});
		uni.onSocketError(res => {
			state = 'fail'
			common.errorToShow('WebSocket连接打开失败，请检查！');
		});
	}
}



export {
	connect
}
