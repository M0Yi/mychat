<template>
	<view>
		<cu-custom bgColor="bg-black" isAbs :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view class="moyi-te-a moyi-bg-a" style="height: 100vh;">
			<view style="padding-top: 50%;" v-if="loadShow">
				<view class="cu-load loading"></view>
			</view>
			<scroll-view
			v-else
			class="scroll-view moyi-bg-a "
			style="min-height: 100vh;"
			:style="'padding-top:'+base.CustomBar+'px'"
			 scroll-y upper-threshold="50">
			 <view class="margin" >
			 	<rich-text :nodes="details.content"></rich-text>
			 </view>
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:{
					CustomBar:this.CustomBar
				},
				title: '加载中',
				details: {
					content: ''
				},
				loadShow: true
			}
		},
		methods: {},
		onLoad(e) {
			if (e.title) {
				this.title = e.title
			}
			if (e.id) {
				this.$api.cmsGetDetails({
					id: e.id,
				}, (res) => {
					if (res.code) {
						this.details.content = res.data.content;
						this.loadShow = false
					}
				})
			}
		}
	}
</script>


<style lang="less">
	.cu-card {
		height: 100vh;
	}

	.my-textarea {
		min-height: 4.6em;
		max-height: 9.2em;
	}
</style>
