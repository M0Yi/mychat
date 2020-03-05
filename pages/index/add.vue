<template>
	<view>
		<view class="my-bar" :style="topBar.style" :class="[$config.bgClass]">
			<navigator open-type="navigateBack" class="action " style="width: 15%;" @tap="goBack">
				<text class="cuIcon-back"></text>
				<view >{{i18n.back}}</view>
			</navigator>
			<view class="content ">
				<view class="text-cut text-center" style="width:220px">{{i18n.add}}</view>
			</view>
			<view style="width: 15%;"></view>
		</view>
		
	<!-- 	<view>
			<view class="cu-btn sm bg-red margin-sm" @click="test1()">测试1</view>
			<view class="cu-btn sm bg-red margin-sm" @click="test2()">测试2</view>
			<view class="cu-btn sm bg-red margin-sm" @click="test1()">按钮</view>
		</view>
 -->
		<view class="cu-bar bg-white search margin-bottom-sm">
			<view class="search-form">
				<text class="cuIcon-search"></text>
				<input type="text" :placeholder="i18n.pleaseInputUID" confirm-type="search"></input>
			</view>
			<view class="action" @tap="search()">
				<button class="cu-btn shadow-blur bg-blue">{{i18n.search}}</button>
			</view>
		</view>
		
		<view class="cu-list menu-avatar">
			<view class="cu-item contacts-list" v-for="(item, index) in search.list" :key="index">
				<view class="cu-avatar round" :style="[{ backgroundImage: 'url(' + item.avatar + ')' }]"></view>
				<view class="content">
					<view class="text-black text-xl">{{ item.nickname }}</view>
				</view>
				<view class="action margin">
					<view class="bg-blue radius cu-btn">{{i18n.add}}</view>
					<!-- <view class="cu-tag round bg-red sm">{{ item.tips.count > 99 ? '99+' : item.tips.count }}</view> -->
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			InputBottom: 0,
			topBar: {
				style: 'height:' + this.CustomBar + 'px;padding-top:' + this.StatusBar + 'px;',
				back: false,
				title: this.$config.title
			},
			modal: {
				name: null,
				history: []
			},

			base: {
				lessClass: 'less-gradual-pink line-gradual text-gradual'
			},
			search: {
				list:[
					{
						uid: 1,
						nickname: '默毅',
						avatar: this.$config.logo
					},
					{
						uid: 2,
						nickname: '默毅',
						avatar: this.$config.logo
					}
				]
			}
		};
	},
	methods: {
		InputFocus(e) {
			this.InputBottom = e.detail.height
		},
		InputBlur(e) {
			this.InputBottom = 0
		},
		test1() {

		},
		test2(){
		}
	},
	created() {
		this.pageState = true;
	},
	onLoad() {},
	computed: {
		// 初始化多语言
		i18n() {
			return this.$t('add');
		}
	}
};
</script>

<style>
page {
	height: 100%;
}

.h100 {
	height: 100%;
}

.inline-shrink {
	display: inline-flex;
}

.w100 {
	width: 100%;
}

.min-w13 {
	min-width: 130upx;
	text-align: center;
}

.lang {
	margin-bottom: 20upx;
	margin-right: 5upx;
}

.lang-select {
	margin-bottom: 20upx;
	margin-right: 0;
	border-right: #0081ff solid 5upx;
}
.cu-bar {
	border-top: 1rpx #eee solid;
	/* padding-top: 5px; */
}
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

.topBar-tag {
	background-color: #ffffff44;
	font-size: 24upx;
	vertical-align: middle;
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	padding: 0upx 16upx;
	height: 48upx;
	font-family: Helvetica Neue, Helvetica, sans-serif;
	white-space: nowrap;
}
.cuIcon-back {
	font-size: 40upx;
}

/* .cu-list>.contacts-list.cu-item:after{
	border-:0;
} */
.cu-list>.contacts-list{
	height: 110upx;
}
.cu-list>.contacts-list>.cu-avatar{
	height: 80upx;
	width: 80upx;
}
.contacts-list>.content>.text-xl{
	font-size: 36upx!important;
}

.input-textarea{
	padding-left: 20upx;
	padding-right: 20upx;
	margin-top:9upx;
	margin-bottom:9upx;
	max-height: 300upx;
}
.send-btn{
	margin-top: auto;
	padding-bottom: 18upx;
}
.cu-bar .search-form{
	background-color: initial;
	
}
</style>
