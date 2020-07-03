<template>
	<view class="cu-modal bottom-modal" id="top" :class="shows==show?'show':''" @tap="hideModal">
		<view class="cu-dialog">
			<view class="cu-list menu text-center bg-black">
				<view class="cu-item cu-item-bottom" @tap="report()">
					<view class="">举报</view>
				</view>
				<view class="cu-item cu-item-bottom">
					<view class="">取消</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			default: true
		},
		type: {
			type: String,
			default: 'cosmos'
		},
		pid: {
			type: String|Number,
			default: 0
		}
	},
	data() {
		return {
			shows:true
		};
	},
	created() {
		
	},
	methods:{
		hideModal(){
			this.shows = !this.shows;
		},
		report(){
			console.log('举报'+this.type+'中的id:'+this.pid);
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
			.icon{
				margin-top: 10rpx;
			}
			.text{
				font-size: 20rpx;
			}
		}
		.active {
			font-size: larger;
		}
	}
	
	
</style>
