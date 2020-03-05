<template>
	<view class="margin-lr" @touchstart="respond()">
		<!-- 按钮 -->
		<button :class="['my-btn-anim','margin-auto', 'anim','round','shadow-warp',bgClass?bgClass:btnClass]" :style="'height:'+ height +'rpx;line-height:' + height + 'rpx;'+ (rotate ?'width:'+ height +'rpx;':'width:100%')">
			<view class="spin" v-if="rotate">
				<text :style="'font-size:' + height * 0.4 +'rpx;'" class="cuIcon-loading1"></text>
			</view>
			<text :style="'font-size:' + height * 0.4 +'rpx;'" v-else>
				{{text}}
			</text>
		</button>
		<view style="width: inherit;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnClass: this.$config.btnClass
			}
		},
		props: {
			//确认按钮
			text: {
				type: String,
				default: "登　　陆",
			},
			//选择状态
			rotate: {
				type: [Boolean, String],
				default: false,
			},
			//背景类
			bgClass: {
				type: String,
				default: "",
			},
			//高度 rpx
			height: {
				type: [Number, String],
				default: 80,
			},
		},
		methods: {
			respond() {
				// 短震动
				uni.vibrateShort({});
			}
		},

	}
</script>

<style>
	.margin-auto {
		margin: auto;
	}

	.bg-gradual-gray {
		background-image: linear-gradient(45deg, #555, #333);
		color: #ffffff;
	}

	.spin {
		animation: cuIcon-spin 2s infinite linear;
	}

	.anim {
		-webkit-transition: all 0.4s cubic-bezier(.57, .19, .51, .95);
		-moz-transition: all 0.4s cubic-bezier(.57, .19, .51, .95);
		-ms-transition: all 0.4s cubic-bezier(.57, .19, .51, .95);
		-o-transition: all 0.4s cubic-bezier(.57, .19, .51, .95);
		transition: all 0.4s cubic-bezier(.57, .19, .51, .95);
	}
</style>
