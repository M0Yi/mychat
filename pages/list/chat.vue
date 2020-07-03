<template>
	<view class="moyi-bg-a">
		<!-- <bottomMenu :current='1'></bottomMenu> -->
		<moreModal :show="moreData.show" :type='moreData.type' :pid="moreData.id"></moreModal>
		
		<view class="moyi-top-bar moyi-bg-b" :style="'height:'+base.CustomBar+'px'" >
			<view style="position: absolute; bottom: 10rpx; " class=" moyi-te-b t">
				<text class="margin-left text-xl">消息</text>
				<text>{{messageCount==0?'':messageCount}}</text>
				<!-- <text class="margin-left moyi-te-a" @tap="$common.errorToShow('点击了推荐userOpenuserOpen')">推荐</text> -->
			</view>
		</view>
		
		<scroll-view
		class="scroll-view moyi-bg-a "
		style="min-height: 95vh;"
		:style="'padding-top:'+base.CustomBar+'px'"
		 scroll-y upper-threshold="50">
			<view class="tips-msg" v-if="!newMessageList.length">
				<text class="cuIcon-message icon"></text>
				<text class="margin">您没有来自宇宙的回响</text>
			</view>
			<view class="cu-list menu-avatar" v-else>
				<view class="cu-item" v-for="(item, index) in newMessageList" :key="index" @click="openChat(index)">
					<view v-if="item.user.avatar" class="cu-avatar round lg" :style="[{ backgroundImage: 'url(' + item.user.avatar + ')'}]">
						<image :src="item.user.frame" mode="widthFix"></image>
					</view>
					<view v-else class="cu-avatar round lg" :style="[{ backgroundImage: 'url(' + base.avatar +')'}]">
						
					</view>
					<view class="content">
						<view class="text-grey">{{ item.user.nickname }}</view>
						<view class="text-gray text-cut text-sm tips-value">
							{{ item.tips.value }}
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{ $common.timeToDate(item.tips.time) }}</view>
						<view class="cu-tag round bg-red sm" v-if="item.tips.count != 0">{{ item.tips.count > 99 ? '99+' : item.tips.count }}</view>
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
				moreData: {
					show: false,
					type: 'cosmos',
					id: 0,
				},
				newMessageList: [],
				messageCount: 0,
			};
		},
		created() {
			// 注册打开监听
			
			this.reMessgaeList();
			
			uni.$on('reMessgaeList', () => {
				this.reMessgaeList();
			});
		},
		onLoad() {
			console.log('listchatonLoad')
		},
		methods: {
			// 打开对话
			openChat(index) {
				let user = this.newMessageList[index].user;
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
		margin-top: 50%;
		position: sticky;
		// top: 30%;
		color: #8799A3;
		display: grid;
		text-align: center;
	
		.icon {
			font-size: 98rpx;
		}
	}
</style>
