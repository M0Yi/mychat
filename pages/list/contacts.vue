<template>
	<view class="moyi-bg-a">
		<!-- <bottomMenu :current='1'></bottomMenu> -->
		<moreModal :show="moreData.show" :type='moreData.type' :pid="moreData.id"></moreModal>
		
		<view class="moyi-top-bar moyi-bg-b" :style="'height:'+base.CustomBar+'px'" >
			<view style="position: absolute; bottom: 10rpx; " class=" moyi-te-b t">
				<text class="margin-left text-xl">通讯</text>
				<text>{{messageCount==0?'':messageCount}}</text>
				<!-- <text class="margin-left moyi-te-a" @tap="$common.errorToShow('点击了推荐userOpenuserOpen')">推荐</text> -->
			</view>
		</view>
		
		<scroll-view
		class="scroll-view moyi-bg-a "
		style="min-height: 95vh;"
		:style="'padding-top:'+base.CustomBar+'px'"
		 scroll-y upper-threshold="50">
		 <view class="cu-list menu-avatar">
		 	<view class="cu-item contacts-list" @tap="openChat()">
		 		<view class="cu-avatar round wh-100" :style="[{ backgroundImage: 'url(' + userInfo.avatar + '),url(' + userInfo.avatar + ')' }]">
		 			<image :src="userInfo.frame" mode="widthFix"></image>
		 		</view>
		 		<view class="content margin-left-sm">
		 			<view class="text-xl text-white">{{ userInfo.nickname }}</view>
		 		</view>
		 		<view class="action">
		 
		 		</view>
		 	</view>
		 
		 	<view class="cu-item contacts-list" v-for="(item, index) in contacts.list" :key="index" v-if="item.state == 'normal'"
		 	 @tap="openChat(index)">
		 		<view class="cu-avatar round wh-100" :style="[{ backgroundImage: 'url(' + item.user.avatar + '),url(' + base.avatar + ')' }]">
		 			<!-- <image src="../../static/v-1.png" mode="aspectFit"></image> -->
		 		</view>
		 		<view class="content margin-left-sm">
		 			<view class="text-xl text-white">{{ item.user.nickname }}</view>
		 		</view>
		 		<view class="action">
		 			<!-- <view class="text-grey text-xs">{{ timeToDate(item.time) }}</view> -->
		 			<!-- <view class="cu-tag round bg-red sm">{{ item.tips.count > 99 ? '99+' : item.tips.count }}</view> -->
		 		</view>
		 	</view>
		 </view>
			
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base: {
					avatar: this.$config.avatar,
					CustomBar: this.CustomBar,
					title: this.$config.title
				},
				userInfo:this.$common.userInfo(),
				moreData: {
					show: false,
					type: 'cosmos',
					id: 0,
				},
				contacts: {
					list:[]
				},
				messageCount: 0,
			};
		},
		created() {
			// 获取好友列表
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
		onLoad() {
			console.log('listchatonLoad')
		},
		methods: {
			// 打开对话
			openChat(index = null) {
				let user = [];				
				if(index == null){
					user = this.userInfo;
				}else{
					user = this.newMessageList[index].user;
				}
				console.log(user);
				this.$db.set('chat',user)
				uni.navigateTo({
					url:'/pages/chat/index',
				})
				this.$common.readNewMessageList(user.user_id);
			},
			// 刷新消息列表
			reMessgaeList() {
				let count = 0;
				this.newMessageList = this.$common.getNewMessageList();
				this.newMessageList.forEach((ele, index) => {
					count += ele.tips.count;
					if (count > 99) {
						this.messageCount = count;
						return;
					}
				});
				this.messageCount = count;
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			}
		}
	};
	
</script>

<style lang="less">
	.tips-msg {
		position: sticky;
		top: 30%;
		color: #8799A3;
		display: grid;
		text-align: center;
	
		.icon {
			font-size: 98rpx;
		}
	}
</style>
