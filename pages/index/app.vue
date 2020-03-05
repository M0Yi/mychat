<template>
	<view>
		<myMessage ref="myMessage" hide></myMessage>
		<view class="my-bar" :style="topBar.style" :class="[$config.bgClass]">
			<view class="action text-xxl" style="width: 12%;" v-if="modal.name == 'my'"><!-- <text class="cuIcon-add margin-left-sm "></text> --></view>
			<view class="action text-xxl" style="width: 12%;" @tap="openPopup('add')" v-else><text class="cuIcon-add margin-left-sm "></text></view>
			<view class="content ">
				<view class="text-cut text-center" style="width:220px">{{ topBar.title }}</view>
			</view>
			<view style="width: 12%;"></view>
		</view>
		<view class="cu-modal add-modal" :class="popup.name == 'add' ? 'show' : ''" @tap="hidePopup">
			<view class="cu-dialog" :style="'margin-top:' + CustomBar + 'px'">
				<view class="cu-list menu">
					<navigator class="cu-item" url="add">
						<view class="content">
							<text class="cuIcon-friendadd"></text>
							<text class="">{{ i18n.addFriends }}</text>
						</view>
					</navigator>
				</view>
			</view>
		</view>

		<view>
			<view class="cu-btn sm bg-red margin-sm" @click="test1()">添加好友</view>
			<view class="cu-btn sm bg-red margin-sm" @click="test2()">清除列表</view>
			<view class="cu-btn sm bg-red margin-sm" @click="test3()">按钮3</view>
			<view class="cu-btn sm bg-red margin-sm" @click="test4()">按钮4</view>
			<view class="cu-btn sm bg-red margin-sm" @click="test0()">按钮0</view>
		</view>

		<view class="cu-list menu-avatar" v-if="modal.name == 'contacts'">
			<!-- {{ contacts.list }} -->
			<view
				class="cu-item contacts-list"
				v-for="(item, index) in contacts.list"
				:key="index"
				v-if="item.state == 'normal'"
				@tap="openChat(item.user.id)"
			>
				<view class="cu-avatar round" :style="[{ backgroundImage: 'url(' + item.user.avatar + '),url(' + $config.cdnUrl + '/assets/img/avatar.png)' }]"></view>
				<view class="content">
					<view class="text-black text-xl">{{ item.user.nickname }}</view>
				</view>
				<view class="action">
					<!-- <view class="text-grey text-xs">{{ timeToDate(item.time) }}</view> -->
					<!-- <view class="cu-tag round bg-red sm">{{ item.tips.count > 99 ? '99+' : item.tips.count }}</view> -->
				</view>
			</view>
		</view>

		<view class="cu-list menu-avatar" v-else-if="modal.name == 'my'"
		 @touchstart="ListTouchStart">
			
			<view 
			 @touchstart="test0(index)"
			 @touchmove="ListTouchMove"
			 @touchend="ListTouchEnd"
			class="cu-item" 
			:style="touch.index==index?touch.style:'transition: all .3s ease-in-out 0s;transform: translateX(0px);'" 
			:class="[index == 2 ?'move-cur':'']" v-for="(item,index) in 4" :key="index">
				 <!-- @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index" -->
				<view class="cu-avatar round lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]"></view>
				<view class="content">
					<view class="text-grey">文晓港</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill text-red  margin-right-xs"></text> 消息未送达</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">22:20</view>
					<view class="cu-tag round bg-grey sm">5</view>
				</view>
				<view class="move">
					<view class="bg-grey">置顶</view>
					<view class="bg-red">删除</view>
				</view>
			</view>
			
		</view>

		<!-- 消息列表 -->
		<view class="cu-list menu-avatar" v-else>
			<view class="cu-item" v-for="(item, index) in newMessageList" :key="index" @click="openChat(item.user.id)">
				<view v-if="item.user.avatar" class="cu-avatar round lg" :style="[{ backgroundImage: 'url(' + item.user.avatar + ')'}]"></view>
				
				<view v-else class="cu-avatar round lg" :style="[{ backgroundImage: 'url(' + $config.cdnUrl + '/assets/img/avatar.png)'}]"></view>
				
				<view class="content">
					<view class="text-grey">{{ item.user.nickname }}</view>
					<view class="text-gray text-sm tips-value">{{ item.tips.value }}</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">{{ timeToDate(item.tips.time) }}</view>
					<view class="cu-tag round bg-red sm" v-if="item.tips.count != 0">{{ item.tips.count > 99 ? '99+' : item.tips.count }}</view>
				</view>
			</view>
			<!-- class="empty" -->
			<view v-if="!newMessageList.length">
				<text class="cuIcon-message icon"></text>
				<text>暂时没有新的消息</text>
			</view>
		</view>

		<!-- 底部菜单 -->
		<view class="cu-bar tabbar bg-white shadow foot">
			<view @tap="change(item.name)" class="action" v-for="(item, index) in tab.list" :key="index">
				<view class="text-xxl" :class="[tab.route == item.name ? base.lessClass + ' anim-scale-beat ' + item.icons : 'text-gray ' + item.icon]">
					<view class="cu-tag badge" v-if="item.name == 'message' && message.count != 0">{{ message.count > 99 ? '99+' : message.count }}</view>
				</view>
				<view style="margin-top: 2px;" :class="[tab.route == item.name ? base.lessClass : 'text-gray ']">{{ item.label }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			touch:{
				style:'',
				index:0,
				startX:0,
				direction:'',
				X:0
			},
			emit:false,
			webSocket: {
				socketOpen: false,
				socketMsgQueue: []
			},
			my: {},
			popup: {
				name: null
			},
			test: 1,
			topBar: {
				style: 'height:' + this.CustomBar + 'px;padding-top:' + this.StatusBar + 'px;',
				back: false,
				title: this.$config.title
			},
			modal: {
				name: 'msg',
				history: []
			},

			base: {
				lessClass: 'less-gradual-pink line-gradual text-gradual'
			},
			contacts: {
				list: [
					{
						uid: 1,
						avatar: this.$config.logo,
						nickname: '默毅',
						state: '',
						user: {
							uid: 1,
							avatar: this.$config.logo,
							nickname: '默毅',
							state: ''
						}
					}
				]
			},
			userInfo: this.$common.userInfo(),
			userList: [],
			newMessageList: [],
			message: {
				count: 0
			},
			pageState: false,
			tab: {
				route: 'message',
				list: [
					{
						label: this.$t('app').message,
						icon: 'cuIcon-comment',
						icons: 'cuIcon-commentfill',
						name: 'message',
						count: 98
					},
					{
						label: this.$t('app').contacts,
						icon: 'cuIcon-friend',
						icons: 'cuIcon-friendfill',
						name: 'contacts'
					},
					{
						label: this.$t('app').my,
						icon: 'cuIcon-people',
						icons: 'cuIcon-peoplefill',
						name: 'my'
					}
				]
			}
		};
	},
	methods: {
		// ListTouch触摸开始
		ListTouchEnd(e){
			console.log('拖动结束',e);
			if(this.touch.X<-50){
				console.log('拖动合格')
				this.touch.style = 'transition: all .3s ease-in-out 0s;transform: translateX(-130px);'
			}else{
				this.touch.style = 'transition: all .3s ease-in-out 0s;transform: translateX(0px);'
				console.log('拖动bu合格')
			}
		},
		ListTouchStart(e) {
			console.log('开始拖动',e);
			this.touch.X = 0;
			this.touch.style = 'transform: translateX(0px);';
			this.touch.startX = e.touches[0].pageX;
		},
		// ListTouch计算方向
		ListTouchMove(e) {
			console.log('正在拖动',e);
			let X = e.touches[0].pageX - this.touch.startX;
			if(X < 0 && X > -130){
				this.touch.X = X;
				this.touch.style = 'transform: translateX('+(e.touches[0].pageX - this.touch.startX)+'px);'
			}
		},
		openPopup(name) {
			this.popup.name = name;
		},
		hidePopup() {
			this.popup.name = null;
		},
		// 刷新消息列表
		reMessgaeList() {
			let count = 0;
			this.newMessageList = this.$common.getNewMessageList();
			this.newMessageList.forEach((ele, index) => {
				count += ele.tips.count;
				if (count > 99) {
					this.message.count = count;
					return;
				}
			});
			this.message.count = count;
		},
		test0(index) {
			this.touch.index = index;
			console.log('test0')
			// this.reMessgaeList();
		},
		test1() {
			console.log();
			// let user = this.$common.getUserInfo('1081')
			this.$common.addNewMessageList('1083');
		},
		test2() {
			this.$common.addNewMessageList('1074');
		},
		test3() {
			this.$common.addNewMessageList('1082');
		},
		test4() {
			this.$common.readNewMessageList('1082');
		},
		goBack() {},
		change(name) {
			this.modal.name = name;
			this.tab.route = name;
		},
		openChat(id) {
			console.log('进入聊天界面开始启用监听');
			this.emit = true;
			this.$common.readNewMessageList(id);
			uni.navigateTo({
				url: 'chat?id=' + id
			});
			this.reMessgaeList();
		},
		// 初始化时间戳
		timeToDate(time) {
			if (time <= 999999999) {
				time = time * 1000;
			}
			var timeDate = new Date(time);
			var currentTime = new Date();
			if (currentTime.getYear() == timeDate.getYear()) {
				if (new Date(time).toDateString() === new Date().toDateString()) {
					var hours = timeDate.getHours();
					var minutes = timeDate.getMinutes();
					if (hours < 10) {
						hours = '0' + hours;
					}
					if (minutes < 10) {
						minutes = '0' + minutes;
					}
					return hours + ':' + minutes;
				} else if (new Date(time + 86400).toDateString() === new Date().toDateString()) {
					return '昨天';
				}
				return timeDate.getMonth() + 1 + '月' + timeDate.getDate() + '日';
			}
			return timeDate.getYear() + '年' + (timeDate.getMonth() + 1) + '月';
		}
	},
	created() {
		uni.onSocketMessage(res => {
			try {
				res = JSON.parse(res.data);
				// console.log('收到答复', res);
				if (res.code) {
					switch (res.type) {
						case 'init':
							break;
						// 消息
						case 'msg':
							if (res.data.to && res.data.to == this.userInfo.id) {
								console.log('保存消息？', res.data);
								switch (res.data.type) {
									case 'text':
										this.$common.addNewMessageList(res.data.form, res.data.value, res.data.type);
										this.reMessgaeList();
										break;
									default:
										break;
								}
								if(this.emit){
									uni.$emit('Message', res.data);
								}
								this.$refs['myMessage'].info(res.data.value);
								this.$common.addRecord(res.data.form, res.data);
							} else {
								console.log('未知来源消息？', res);
								return;
							}
							
						// 答复
						case 'response':
							if(this.emit){
								uni.$emit('Response', res.data);
							}
							
							this.$common.updateRecordState(res.data);
							break;
						// 心跳
						case 'ping':
							// console.log('ping');
							uni.sendSocketMessage({
								data: JSON.stringify({ type: 'ping' })
							});
							// this.$common.errorToShow('新的消息'+res.msg);
							console.log('ping');
							break;
						default:
							break;
					}
				}
			} catch (e) {
				console.log('格式化错误');
			}
		
			// console.log('收到服务器内容：' + res.data);
		});
		this.pageState = true;
	},
	onLoad() {
		this.reMessgaeList();
		uni.connectSocket({
			url: this.$config.webSocket + '?id=' + this.userInfo.id + '&token=' + this.userInfo.token,
			method: 'get',
			data() {
				return {
					x: '2222',
					y: '3333'
				};
			},
			header: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});

		uni.onSocketOpen(res => {
			console.log('WebSocket连接已打开！');
			this.webSocket.socketOpen = true;
		});
		uni.onSocketError(res => {
			this.$common.errorToShow('WebSocket连接打开失败，请检查！');
		});
		this.$api.friendsList({}, res => {
			if (res.code != 1) {
				this.$common.errorToShow(res.msg);
			} else {
				res.data.forEach((ele, index) => {
					ele.user.avatar = this.$common.CDN(ele.user.avatar);
				});
				this.contacts.list = res.data;
				res.data.forEach((ele, index) => {
					this.$db.set('uid_' + ele.user.id, ele.user);
				});
			}
		});
	},
	
	onShow() {
		
	},
	onHide(){
	},
	onShow(){
		console.log('进入主页面以关闭监听发送');
		this.emit = false;
	},
	computed: {
		// 初始化多语言
		i18n() {
			return this.$t('app');
		},
		// 初始化顶部样式
		style() {
			var CustomBar = this.CustomBar;
			var StatusBar = this.StatusBar;
			var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
			return style;
		}
	}
};
</script>

<style>
page {
	height: 100%;
}

.h100 {
	height: 100%;
}

.inline-shrink {
	display: inline-flex;
}

.w100 {
	width: 100%;
}

.min-w13 {
	min-width: 130upx;
	text-align: center;
}

.lang {
	margin-bottom: 20upx;
	margin-right: 5upx;
}

.lang-select {
	margin-bottom: 20upx;
	margin-right: 0;
	border-right: #0081ff solid 5upx;
}
.cu-bar {
	border-top: 1rpx #eee solid;
	padding-top: 5px;
}
.my-bar {
	width: 100%;
	display: flex;
	position: relative;
	align-items: center;
	justify-content: space-between;
}

.my-bar.fixed {
	position: fixed;
	width: 100%;
	top: 0;
}

.my-bar .action {
	display: flex;
	align-items: center;
	height: 100%;
	justify-content: center;
	max-width: 100%;
}

.topBar-tag {
	background-color: #ffffff44;
	font-size: 24upx;
	vertical-align: middle;
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	padding: 0upx 16upx;
	height: 48upx;
	font-family: Helvetica Neue, Helvetica, sans-serif;
	white-space: nowrap;
}
.cuIcon-back {
	font-size: 40upx;
}

/* .cu-list>.contacts-list.cu-item:after{
	border-:0;
} */
.cu-list > .contacts-list {
	height: 110upx;
}
.cu-list > .contacts-list > .cu-avatar {
	height: 80upx;
	width: 80upx;
}
.contacts-list > .content > .text-xl {
	font-size: 36upx !important;
}
.add-modal {
	text-align: left;
	transition: all 0.2s ease-in-out 0s;
	/* animation-name: slide-right-out; */
}
.add-modal > .cu-dialog {
	vertical-align: top;
	width: auto;
}
.add-modal > .cu-dialog > .cu-list {
	/* margin: 20upx; */
}
.tips-value {
	word-break: break-all;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

/* .add-modal>.cu-dialog>.cu-list>.cu-item{
	    transition: all .1s ease-in-out 0s;
} */
</style>
