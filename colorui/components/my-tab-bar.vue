<template>
	<view class="cu-bar tabbar bg-white shadow foot" style="border-top: 1rpx #eee solid;">
		<view @tap="toUrl(item.url)" class="action" v-for="(item, index) in list" :key="index" :url="route == item.url ? '' : item.url">
			<text class="text-xxl" :class="[route == item.url ? base.lessClass + ' ' + item.icons : 'text-gray ' + item.icon]"></text>
			<view style="margin-top: 2px;" :class="[route == item.url ? base.lessClass : 'text-gray ']">{{item.label}}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			route: '',
		};
	},
	created() {
		this.route = '/' + getCurrentPages()[getCurrentPages().length - 1].route;
	},
	methods:{
		toUrl(url){
			if(url != this.route){
				uni.redirectTo({
					url:url,
					animationType:'fade-in',
					animationDuration: 200
				})
			}
		}
	}
};
</script>

<style></style>
