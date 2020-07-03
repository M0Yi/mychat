<template>
	<view class="menu-main shadow moyi-bg-b moyi-te-a">
		<view class="my-tab-item text-xxl" :class="[current == 0 ? 'active moyi-te-b' : '']" @tap="click(0)">
			<view class="icon"><text class="text-xxl" :class="[current == 0 ? 'cuIcon-discoverfill' : 'cuIcon-discover']"></text></view>
			<view class="text">宇宙</view>
		</view>
		<view class="my-tab-item text-xxl" :class="[current == 1 ? 'active moyi-te-b' : '']" @tap="click(1)">
			<view class="icon"><text class="text-xxl" :class="[current == 1 ? 'cuIcon-commennt' : 'cuIcon-commentfill']"></text></view>
			<view class="text">消息</view>
		</view>
		<view class="my-tab-item text-xxl" :class="[current == 2 ? 'active moyi-te-b' : '']" @tap="click(2)">
			<view class="icon"><text class="text-xxl " :class="[current == 2 ? 'cuIcon-friend' : 'cuIcon-friendfill']"></text></view>
			<view class="text">联系人</view>
		</view>
		<view class="my-tab-item text-xxl" :class="[current == 3 ? 'active moyi-te-b' : '']" @tap="click(3)">
			<view class="icon"><text class="text-xxl" :class="[current == 3 ? 'cuIcon-people' : 'cuIcon-peoplefill']"></text></view>
			<view class="text">用户中心</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		current: {
			type: Number|String,
			default: 0
		}
	},
	data() {
		return {
			pages: getCurrentPages()
			// current:1,
		};
	},
	created() {},
	methods: {
		click(i = 0) {
			let url = 'pages/cosmos/index';

			switch (i) {
				case 1:
					url = 'pages/list/chat';
					break;
			}
			let pages = this.pages;
			let le = pages.length-1;
			let back = -1;
			let x = 0;
			console.log('pages.length',pages.length);
			console.log(pages);
			for (let s = le; s >= 0; s--) {
				console.log('sss', s);
				console.log('当前循环route',pages[s].route)
				if (url == pages[s].route) {
					back = x;
					s = -98;
				}
				x ++
				if(s == -99){
					return
				}
				
			}
			console.log('basck', back);
			// return

			switch (back) {
				case -1:
					console.log('前往新页面');
					uni.navigateTo({
						url:'/'+url
					});
					break;
				case 0:
					console.log('无需处理');
					break;
				default:
				uni.navigateBack({
					delta: x
					})
					break;
			}
			console.log('i', i);
		}
	}
};
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
