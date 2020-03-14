<template>
	<view>
		<view class="page" :class="$config.bgClass">
			<image class="slogo-img" src="../../static/slogo.png" mode="widthFix"></image>
			<view class="text-center bg-white slogo">
				<image class="cu-logo margin" :src="$config.logo" mode="aspectFit"></image>
				<view class="text-gray padding-bottom-xl">{{__($config.title)}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		test(){
			// this.$config bg-admin
		}
	},
	created() {
		setTimeout(()=>{
			uni.reLaunch({
				url:'../index/login'
			})
		}, 2000);
	},
	onLoad() {},
	onShow() {},
	computed: {
	}
};
</script>

<style lang="less">
.page {
	width: 100%;
	height: 100%;
    position: absolute;
	background-position: top;
}
.cu-logo{
	width: 80rpx;
	height: 80rpx;
}
.slogo{
	width: 750rpx;
	bottom: 0;
	position: absolute;
}
.slogo-img{
	width: 750rpx;
}
</style>
