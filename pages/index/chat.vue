<template>
	<view>
		<myMessage ref="myMessage"></myMessage>

		<view class="my-bar fixed" :style="topBar.style" :class="[$config.bgClass]">
			<navigator open-type="navigateBack" class="action ter" style="width: 15%;">
				<text class="cuIcon-back margin-left-sm"></text>
				<view class="topBar-tag round" v-if="chat.count">{{ chat.count > 99 ? '99+' : chat.count }}</view>
				<view v-else>{{ i18n.back }}</view>
			</navigator>
			<view class="content ">
				<view class="text-cut text-center" style="width:220px">{{ chat.nickname ? chat.nickname : topBar.title }}</view>
			</view>
			<view style="width: 15%;"></view>
		</view>
		<view :style="topBar.style"></view>

		<view class="my-bar fixed" style="margin-top:180upx">
			<view class="cu-btn sm bg-red margin-sm" @click="test1()">{{ scrollToView }}</view>
			<view class="cu-btn sm bg-red margin-sm" @click="test2()">按钮2</view>
			<view class="cu-btn sm bg-red margin-sm" @click="test3()">按钮3</view>
		</view>

		<scroll-view
			:style="'top:' + CustomBar + 'px'"
			class="scroll-view"
			scroll-y="true"
			:scroll-top="scrollTop"
			:scroll-with-animation="scrollAnimation"
			:scroll-into-view="scrollToView"
			@scrolltoupper="loadHistory"
			upper-threshold="50"
		>
			<view class="cu-chat" v-for="(item, index) in record" :key="index" :id="'msg' + item.id">
				<block v-if="item.type == 'tips'">
					<view class="cu-info round text-center">{{ item.value }}</view>
				</block>
				<block v-else>
					<view class="cu-item self" v-if="item.from == userInfo.id">
						<!-- 状态 -->
						<view v-if="item.state == 'Sending'" class="state anim-spin"><text class="cuIcon-loading text-orange text-xxl"></text></view>
						<view v-else-if="item.state == 'Fail'" class="state"><text class="cuIcon-infofill text-red text-xxl"></text></view>
						<!-- 状态 -->

						<!-- 内容 -->
						<view class="main">
							<!-- // Sending Finish Arrive Read Fail -->
							<image v-if="item.type == 'images'" :src="item.value" mode="widthFix"></image>
							<view v-else-if="item.type == 'voice'" class="content shadow"><text class="cuIcon-sound text-xxl padding-right-xl"></text></view>
							<view v-else class="content shadow text-value">
								<text>{{ item.value }}</text>
							</view>
						</view>
						<!-- 内容 -->
						<view class="cu-avatar radius" :style="'background-image:url(' + userInfo.avatar + '),url(' + $config.cdnUrl + '/assets/img/avatar.png);'"></view>
					</view>
					<view class="cu-item" v-else>
						<view
							class="cu-avatar radius"
							:style="'background-image:url(' + (item.avatar ? item.avatar : chat.avatar) + '),url(' + $config.cdnUrl + '/assets/img/avatar.png);'"
						></view>
						<view class="main">
							<image v-if="item.type == 'images'" :src="item.value" mode="widthFix"></image>
							<view v-else-if="item.type == 'voice'" class="content shadow"><text class="cuIcon-sound text-xxl padding-right-xl"></text></view>
							<view v-else class="content shadow text-value">
								<text>{{ item.value }}</text>
							</view>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
		<view class="cu-bar foot input" :style="[{ bottom: InputBottom + 'px' }]">
			<textarea class="input-textarea solid-bottom" :maxlength="-1" v-model="chat.inputText" confirm-type="send" auto-height></textarea>
			<view class="send-btn" @tap="sendBtn()">
				<button class="cu-btn shadow bg-blue ">{{ i18n.send }}</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 滚动
			scrollAnimation: false, //滑动动画开关
			scrollTop: 0, //竖向滚动条位置
			scrollToView: '', //滚动到元素位置

			// loadState:
			lineLength: 15,
			InputBottom: 0,
			topBar: {
				style: 'height:' + this.CustomBar + 'px;padding-top:' + this.StatusBar + 'px;',
				back: false,
				title: this.$config.title
			},
			modal: {
				name: null,
				history: []
			},
			userInfo: this.$common.userInfo(),
			base: {
				lessClass: 'less-gradual-pink line-gradual text-gradual'
			},
			chat: {
				id: 1,
				type: 'caht',
				nickname: '默毅',
				avatar: this.$config.logo,
				inputText: ''
			},
			record: []
		};
	},
	methods: {
		loadHistory(e) {
			console.log('loadHistory', e);
		},
		InputFocus(e) {
			console.log('InputFocus', e);
			this.InputBottom = e.detail.height;
		},
		InputBlur(e) {
			console.log('InputBlur', e);
			this.InputBottom = 0;
		},
		test3() {
			this.$soccket.open('wotamade');
			this.$nextTick(function() {
				console.log('尝试调整id:', 'msg99');
				this.scrollToView = 'msg99';
			});
			//进入页面滚动到底部
			// this.scrollTop = 9999;
		},

		test2() {
			this.$nextTick(function() {
				console.log('尝试调整id:', 'msg98');
				this.scrollToView = 'msg98';
			});
			//进入页面滚动到底部
			// this.scrollTop = 9999;
		},
		sendBtn() {
			let text = this.chat.inputText;
			this.chat.inputText = '';
			if (text) {
				this.send(text);
			}
		},
		send(value, type = 'text') {
			let chat = {
				id: new Date().getTime(),
				type: type,
				to: this.chat.id,
				from: this.userInfo.id,
				value: value,
				state: 'Sending',
				time: new Date().getTime()
			};
			this.$common.addRecord(this.chat.id, chat);
			this.record.push(chat);
			this.goViewId(chat.id);
			uni.sendSocketMessage({
				data: JSON.stringify(chat)
			});
		},
		// add(arr) {
		// 	console.log('this.chat.record.push', arr);
		// 	this.record.push(arr);
		// },
		goViewId(id) {
			if (id) {
				this.$nextTick(() => {
					this.scrollToView = 'msg' + id;
				});
			}
		},
		test99() {
			console.log('test99', getCurrentPages());

			// this.$refs['myMessage'].info('测试');
		}
	},
	created() {
		this.pageState = true;
	},
	onShow() {
		// this.scrollTop = 9999999;
	},
	onLoad(e) {
		if (e.id) {
			this.record = this.$common.getRecord(e.id);
			this.chat = this.$common.getUserInfo(e.id);
			//进入页面滚动到底部
			this.$nextTick(function() {
				this.scrollTop = 99999;
			});

			uni.$on('Message', data => {
				// 如果该消息发送给当前对话
				// console.log('监听到消息', data);
				if (data.to == e.id || data.form == e.id) {
					switch (data.type) {
						case 'text':
							this.record.push(data);
							this.goViewId(data.id);
							break;
						case 'tips':
							console.log('监听到提示消息');
							this.record.push(data);
							this.goViewId(data.id);
							break;
						default:
							console.log('监听到未标记消息');
							break;
					}
				} else {
					switch (data.type) {
						case 'text':
							let userInfo = this.$common.getUserInfo(data.form);
						
							this.$refs['myMessage'].info(userInfo.nickname+':'+data.value);
							
							break;
					}
				}
				// console.log('监听到事件来自 Message ，携带参为：' + data);
			});

			uni.$on('Response', data => {
				// 监听到答复
				if (data.to == e.id || data.form == e.id) {
					let record = this.record;
					for (var i = record.length - 1; i >= 0; i--) {
						// 查找ID
						if (record[i].id == data.id) {
							this.record[i].state = data.value;
							i = 0;
						}
					}
				}
			});
		} else {
			uni.navigateBack();
		}
	},
	onUnload(){
		this.$common.readNewMessageList(this.chat.id)
	},
	computed: {
		// 初始化多语言
		i18n() {
			return this.$t('chat');
		}
	}
};
</script>

<style>
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
	/* padding-top: 5px; */
}
.my-bar {
	z-index: 999;
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

.input-textarea {
	padding-left: 20upx;
	padding-right: 20upx;
	margin-top: 9upx;
	margin-bottom: 9upx;
	max-height: 300upx;
}
.send-btn {
	margin-top: auto;
	padding-bottom: 18upx;
}

.scroll-view {
	/* margin-bottom: 100upx; */
	position: absolute;
	top: 0;
	bottom: 100upx;
}
.cu-chat {
}
.cu-chat .cu-item {
	padding: 16upx;
}
.state {
	margin-top: auto;
	margin-bottom: auto;
	margin-left: auto;
	font-size: 40upx;
}
.cuIcon-loading {
	animation: cuIcon-spin 2s infinite linear;
	webkit-animation: cuIcon-spin 2s infinite linear;
}
.text-value {
	word-break: break-all;
}
/* .state/ */
</style>
