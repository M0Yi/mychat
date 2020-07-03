<template>
	<view >
		<view class="cu-load load-modal moyi-bg-b " v-if="show">
				<image :src="image?image:base.logo" mode="aspectFit"></image>
				<view class="moyi-te-a">{{text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:{
					logo:this.$config.logo
				},
			}
		},
		props: {
			//文本
			text: {
				type: [String],
				default: '请稍后...',
			},
			//显示
			show: {
				type: [Boolean, String],
				default: true,
			},
			//图片
			image: {
				type: [String],
				default: '',
			}
		}
	}
</script>

<style>
</style>
