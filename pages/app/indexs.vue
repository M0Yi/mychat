<template>
	<view>
		<cosmos :style="PageCur=='cosmos'?'':'display: none;'"></cosmos>
		<chat :style="PageCur=='chat'?'':'display: none;'"></chat>
		<contacts :style="PageCur=='contacts'?'':'display: none;'"></contacts>
		<center :style="PageCur=='center'?'':'display: none;'"></center>
		
		
		<view class="menu-main shadow moyi-bg-b moyi-te-a">
			<view class="my-tab-item text-xxl" :class="[PageCur == 'cosmos' ? 'active moyi-te-b' : '']" @tap="NavChange" data-cur="cosmos">
				<view class="icon"><text class="text-xxl" :class="[PageCur == 'cosmos'  ? 'cuIcon-discoverfill' : 'cuIcon-discover']"></text></view>
				<view class="text">宇宙</view>
			</view>
			<view class="my-tab-item text-xxl" :class="[PageCur == 'chat' ? 'active moyi-te-b' : '']" @tap="NavChange" data-cur="chat">
				<view class="icon"><text class="text-xxl" :class="[PageCur == 'chat'  ? 'cuIcon-commentfill' : 'cuIcon-comment']"></text></view>
				<view class="text">回响</view>
			</view>
			<view class="my-tab-item text-xxl" :class="[PageCur == 'contacts' ? 'active moyi-te-b' : '']" @tap="NavChange" data-cur="contacts">
				<view class="icon"><text class="text-xxl" :class="[PageCur == 'contacts'  ? 'cuIcon-friendfill' : 'cuIcon-friend']"></text></view>
				<view class="text">通讯</view>
			</view>
			<view class="my-tab-item text-xxl" :class="[PageCur == 'center' ? 'active moyi-te-b' : '']" @tap="NavChange" data-cur="center">
				<view class="icon"><text class="text-xxl" :class="[PageCur == 'center'  ? 'cuIcon-peoplefill' : 'cuIcon-people']"></text></view>
				<view class="text">用户中心</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'cosmos',
				userInfo: this.$common.userInfo(),
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		},
		onLoad(){
			this.$socket.connect();
			
			// 注册打开监听
			uni.$on('socketOpen', () => {
				console.log('socketOpen 服务器连接成功');
			});
			
			// 注册错误监听
			uni.$on('socketError', () => {
				console.log('socketError');
				this.$common.errorToShow('聊天服务器连接失败，部分功能不可用')
			});
			
			// 注册接受消息监听
			uni.$on('socketMessage', (res) => {
				console.log('socketMessage', res)
				switch (res.type) {
					case 'init':
						break;
						// 消息
					case 'msg':
						if (res.data.to && res.data.to == this.userInfo.id) {
							console.log('收到来自' + res.data.form + '消息', res.data);
							switch (res.data.type) {
								case 'text':
									this.$audio.palys();
									this.$common.addNewMessageList(res.data.form, res.data.value, res.data.type);
									uni.$emit('reMessgaeList');
									this.$common.addRecord(res.data.form, res.data);
									break;	
								case 'tips':
									console.log('收到用发来的文本消息');
									this.$common.addNewMessageList(res.data.form, res.data.value, res.data.type);
									uni.$emit('reMessgaeList');
									this.$common.addRecord(res.data.form, res.data);
									break;
								default:
									console.log('非常规消息', res.data);
									break;
							}
						} else {
							console.log('未知来源消息', res);
							return;
						}
						break;
						// 答复
					case 'response':
						// this.$common.updateRecordState(res.data);
						break;
						// 心跳
					case 'ping':
						uni.sendSocketMessage({
							data: JSON.stringify({
								type: 'ping'
							})
						});
						console.log('给服务器ping回去');
						break;
					default:
						console.log('啥玩意数据，我咋不认识')
						break;
				}
			});
			
			
		}
	}
</script>


<style lang="less">
.menu-main {
	bottom: 0;
	width: 100%;
	// height: 100rpx;
	position: fixed;
	left: 0;
	white-space: nowrap;
	box-sizing: border-box;
	overflow: hidden;
	// line-height: 100rpx;
	z-index: 999;
	.my-tab-item {
		display: inline-block;
		width: 25%;
		text-align: center;
		.icon {
			margin-top: 10rpx;
		}
		.text {
			font-size: 20rpx;
		}
	}
	.active {
		font-size: larger;
	}
}
</style>
