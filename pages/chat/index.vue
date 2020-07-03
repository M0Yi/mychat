<template>
	<view class="moyi-bg-a">
		<cu-custom bgColor="moyi-bg-b moyi-te-a" isAbs :isBack="true">
			<block slot="backText"></block>
			<block slot="content">
				<view  class="cu-avatar round sm " :style="'background-image:url('+ chat.avatar +');'">
					<image :src="chat.frame" mode="widthFix"></image>
				</view>
				<text class="margin-left-ss ">{{chat.nickname}}</text>
			</block>
		</cu-custom>
		
		<scroll-view
		style="height: 100vh;padding-bottom: 100rpx;"
		:style="[{paddingTop:CustomBar+InputBottom+'px'}]"
		class="moyi-bg-a"
		 scroll-y
		 :scroll-top="scrollTop" 
		 :scroll-with-animation="scrollAnimation" 
		 :scroll-into-view="scrollToView"
		 upper-threshold="50">
		  <!-- @scrolltoupper="loadHistory" -->
			<view class="cu-chat">
				<view class="bg-gray cu-info round text-center ">本小程序仅供Demo展示,不提供IM消息收发</view>
			</view>
			<view class="cu-chat" v-for="(item, index) in record" :key="index" :id="'msg' + item.id">
				<block v-if="item.type == 'tips'">
					<view class="cu-info round text-center">{{ item.value }}</view>
				</block>
				<block v-else>
					<view class="cu-item self" v-if="item.from == userInfo.id">
		
						<!-- 状态 -->
<!-- 						<view v-if="item.state == 'Sending'" class="state anim-spin "><text class="cuIcon-loading text-gray text-xxl"></text></view>
						<view v-else-if="item.state == 'Fail'" class="state"><text class="cuIcon-infofill text-red text-xxl"></text></view>
 -->		
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
						<view class="cu-avatar radius" :style="'background-image:url(' + userInfo.avatar + '),url(' + base.avatar + ');'"></view>
					</view>
		
					<view class="cu-item" v-else>
						<view class="cu-avatar radius" :style="'background-image:url(' + chat.avatar + '),url(' + base.avatar + ');'"></view>
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
			<view :style="[{height:InputBottom+'px'}]">
				
			</view>
		</scroll-view>
		
		
	<!-- 	<view class="cu-bar foot input moyi-bg-b moyi-te-a" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
			v-model="inputText" 
			 @focus="InputFocus" @blur="InputBlur"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<button class="cu-btn bg-green shadow"  @tap="sendBtn()">发送</button>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				scrollAnimation: false, //滑动动画开关
				scrollTop: 0, //竖向滚动条位置
				scrollToView: '', //滚动到元素位置
				InputBottom: 0,
				inputText:'',
				base: {
					avatar: this.$config.avatar,
				},
				userInfo: this.$common.userInfo(),
				user: {
					id: 342,
					nickname: "半甜",
					gender: 0,
					avatar: "https://image.aishencn.com/2020/03/18/164612564_10784128-user.jpg",
					frame: null,
				},
				chat: {
					id: 342,
					nickname: "半甜",
					gender: 0,
					avatar: "https://image.aishencn.com/2020/03/18/164612564_10784128-user.jpg",
					frame: null,
				},
				
				record:[]
			};
		},
		created() {
	
		},
		onLoad() {
			let chat = this.$db.get('chat');
			this.chat = chat
			this.record = this.$common.getRecord(chat.id);
			
			//进入页面滚动到底部
			this.$nextTick(function() {
				this.scrollTop = 99999;
			});
			
			// 注册接受消息监听
			uni.$on('socketMessage', (res) => {
				let data = res.data;
				switch (res.type) {
					case 'init':
						break;
						// 消息
					case 'msg':
						if (data.to == chat.id || data.form == chat.id) {
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
									break;
							}
						}
						break;
						// 答复
					case 'response':
						// 监听到答复
						if (data.to == chat.id || data.form == chat.id) {
							let record = this.record;
							for (var i = record.length - 1; i >= 0; i--) {
								// 查找ID
								if (record[i].id == data.id) {
									this.record[i].state = data.value;
									i = 0;
								}
							}
						}
						break;
					default:
						console.log(res.type + '数据不作处理')
						break;
				}
			});
			
			
		},
		methods: {
			sendBtn() {
				let text = this.inputText;
				console.log('this.chat.inputText', text)
				if (text) {
					this.send(text);
					this.inputText = '';
				}
			},
			send(value, type = 'text') {
				let chat = {
					id: new Date().getTime(),
					type: type,
					to: this.chat.user_id?this.chat.user_id:this.chat.id,
					from: this.userInfo.id,
					value: value,
					state: 'Sending',
					time: new Date().getTime()
				}
				this.$common.addRecord(this.chat.id, chat);
				this.$common.addNewMessageList(this.chat.id, chat.value);
				this.record.push(chat);
				this.goViewId(chat.id);
				console.log('发送数据', chat)
				uni.sendSocketMessage({
					data: JSON.stringify(chat)
				});
			},
			goViewId(id) {
				if (id) {
					this.$nextTick(() => {
						this.scrollToView = 'msg' + id;
					});
				}
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			}
		},
		onUnload() {
			this.$common.readNewMessageList(this.chat.id)
			// uni.$off('socketMessage')
		}
	};
	
</script>

<style lang="less">
	.cu-chat .cu-item{
		padding:10rpx 30rpx;
	}
</style>
