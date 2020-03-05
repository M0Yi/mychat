<template>
	<view >
		<view v-if="bgOpacity == 0" class="fixed-top">
			<view class="action text-white margin-sm text-xl">
				<text class="cuIcon-back text-xxxl"></text>
			</view>
		</view>
		<view v-if="noTitle" class="fixed my-bar" :style="style" :class="[bgClass?bgClass:$config.bgClass]">
			<view class="action" @tap="goBack" v-if="showBack">
				<text class="cuIcon-back margin-left-sm"></text>
				<view>{{ pagesLength != 1 ? backText : homeText }}</view>
			</view>
			<view class="action" style="width: 10%;"></view>
			<view class="content text-center" style="width: 10%;"></view>
			<view style="width: 10%;"></view>
		</view>
		<view v-else class="fixed my-bar" :style="style" :class="[bgClass?bgClass:$config.bgClass]">
			<view class="action" @tap="goBack" v-if="showBack">
				<text class="cuIcon-back margin-left-sm"></text>
				<view>{{ pagesLength != 1 ? backText : homeText }}</view>
			</view>
			<view class="action" style="width: 10%;" v-else></view>
			<view class="content text-center">
				<view class="text-cut" style="width:220px">{{ title?title:$config.title }}</view>
			</view>
			<view style="width: 10%;">{{ rightText }}</view>
		</view>
		<view v-if="occupy " :style="style"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pagesLength: 2,
			platform:'wechat',
		};
	},
	props: {
		//追加高度px
		addHeight: {
			type: [Number, String],
			default: 0
		},
		//背景样式
		bgClass: {
			type: [String],
			default: ""
		},
		//标题
		title: {
			type: [String],
			default: ""
		},
		//标题
		noTitle: {
			type: [Boolean],
			default: false
		},
		//显示返回
		showBack: {
			type: Boolean,
			default: false
		},
		//返回文字
		backText: {
			type: [String],
			default: '返回'
		},
		//首页文字
		homeText: {
			type: [String],
			default: '首页'
		},
		//首页链接
		homeUrl: {
			type: [String],
			default: '/pages/user/index'
		},
		//靠右文字
		rightText: {
			type: [String],
			default: ''
		},
		//背景文字
		bgImage: {
			type: [String],
			default: ''
		},
		//占位
		occupy: {
			type: Boolean,
			default: true
		},
		zIndex: {
			type: [Number, String],
			default: 64
		},
		bgOpacity: {
			type: [Number, String],
			default: 1
		}
	},
	created() {
		this.pagesLength = getCurrentPages().length;
		// if(!this.title)this.title = this.$config.title;
	},
	methods: {
		goBack() {
			if (this.pagesLength != 1) {
				uni.navigateBack({
					delta: 1
				});
			} else {
				uni.reLaunch({
					url: this.homeUrl
				});
			}
		}
	},
	computed: {
		style() {
			var addHeight = parseInt(this.addHeight);
			var StatusBar = this.StatusBar;
			var zIndex = this.zIndex;
			if (this.noTitle) {
				var CustomBar = addHeight;
			} else {
				var CustomBar = this.CustomBar + addHeight;
			}
			var bgImage = this.bgImage;
			var opacity = this.bgOpacity;
			var style = `opacity:${opacity};z-index:${zIndex};height:${CustomBar}px;padding-top:${StatusBar}px;padding-bottom:${addHeight}px;`;
			if (this.bgImage) {
				style = `${style}background-image:url(${bgImage});`;
			}
			return style;
		}
	}
};
</script>

<style>
.my-bar {
	width: 100%;
	display: flex;
	position: relative;
	align-items: center;
	justify-content: space-between;
}

.my-bar.fixed {
	position: fixed;
	width: 100%;
	top: 0;
}

.my-bar .action {
	display: flex;
	align-items: center;
	height: 100%;
	justify-content: center;
	max-width: 100%;
}
</style>
