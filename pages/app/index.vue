<template>
	<view>
		<scroll-view :class="['my-screen-swiper','shadow']" scroll-x :scroll-left="tabScroll" scroll-with-animation="true">
			<view :class="['my-tab-item','text-xxl', currentTab == index ? 'active' : '']" :data-current="index" @click="clickMenu"
			 v-for="(item, index) in barList" :key="index">
				<text class="text-xxl" :class="[currentTab == index ? 'bg-' : 'text-gray',item.icon]"></text>
				<view style="margin-top: 2px;" :class="[currentTab == index ? '' : 'text-gray ']">{{item.label}}</view>
			</view>
		</scroll-view>
		
		<swiper class="list_content" duration="500" :current="currentTab" @change="changeContent">
			
			<!-- 社区界面 -->
			<swiper-item class="content-item">
				<view>第一个</view>
			</swiper-item>
			
			<!-- 最新消息界面 -->
			<swiper-item class="content-item" style="background-image: url(../../static/bg-img.jpg);">
				<view class="cu-bar padding-bottom-sm" :style="'padding-top:'+base.CustomBar+'px'">
					<view class="bar-text margin-left-sm text-white">
						<text>Message</text>
					</view>
				</view>
				<view class="tips-msg margin-top-xl" v-if="!newMessageList.length">
					<text class="cuIcon-message icon"></text>
					<text class="margin">暂时没有新的消息</text>
				</view>
				<view class="cu-list menu-avatar" v-else>
					<view class="cu-item" v-for="(item, index) in newMessageList" :key="index" @click="openChat(item.user.id)">
						<view v-if="item.user.avatar" class="cu-avatar round lg" :style="[{ backgroundImage: 'url(' + item.user.avatar + ')'}]"></view>
						<view v-else class="cu-avatar round lg" :style="[{ backgroundImage: 'url(' + base.avatar +')'}]"></view>
						<view class="content">
							<view class="text-grey">{{ item.user.nickname }}</view>
							<view class="text-gray text-sm tips-value">{{ item.tips.value }}</view>
						</view>
						<view class="action">
							<view class="text-grey text-xs">{{ timeToDate(item.tips.time) }}</view>
							<view class="cu-tag round bg-red sm" v-if="item.tips.count != 0">{{ item.tips.count > 99 ? '99+' : item.tips.count }}</view>
						</view>
					</view>
				</view>
			</swiper-item>
			
			<!-- 联系人界面 -->
			<swiper-item class="content-item"  style="background-image: url(../../static/bg-img.jpg);">
				<view class="cu-bar padding-bottom-sm" :style="'padding-top:'+base.CustomBar+'px'">
					<view class="bar-text margin-left-sm text-white">
						<text>Contacts</text>
					</view>
				</view>
				<view class="cu-list menu-avatar">
					<!-- {{ contacts.list }} -->
					
					<view class="cu-item contacts-list"
					 @tap="openChat(userInfo.id)">
						<view class="cu-avatar round wh-100" :style="[{ backgroundImage: 'url(' + userInfo.avatar + '),url(' + userInfo.avatar + ')' }]">
							<!-- <image src="../../static/v-1.png" mode="aspectFit"></image> -->
						</view>
						<view class="content margin-left-sm">
							<view class="text-xl text-white">{{ userInfo.nickname }}</view>
						</view>
						<view class="action">

						</view>
					</view>
					
					<view class="cu-item contacts-list" v-for="(item, index) in contacts.list" :key="index" v-if="item.state == 'normal'"
					 @tap="openChat(item.user.id)">
						<view class="cu-avatar round wh-100" :style="[{ backgroundImage: 'url(' + item.user.avatar + '),url(' + base.avatar + ')' }]">
							<!-- <image src="../../static/v-1.png" mode="aspectFit"></image> -->
						</view>
						<view class="content margin-left-sm">
							<view class="text-xl text-white">{{ item.user.nickname }}</view>
						</view>
						<view class="action">
							<!-- <view class="text-grey text-xs">{{ timeToDate(item.time) }}</view> -->
							<!-- <view class="cu-tag round bg-red sm">{{ item.tips.count > 99 ? '99+' : item.tips.count }}</view> -->
						</view>
					</view>
				</view>
			</swiper-item>
			
			<!-- 个人中心界面 -->
			<swiper-item class="content-item"  style="background-image: url(../../static/bg-img.jpg);">
				<view class="user-bg " :style="'padding-top:'+base.CustomBar+'px'">
					<view class="flex">
						<view class="cu-avatar xl round margin-left" :style="'background-image:url(' + userInfo.avatar + ');'">
							<!-- <image src="../../static/v-1.png" mode="aspectFit"></image> -->
						</view>
						<view class="bio-area">
							<view class="grid col-1">
								<view class="text-xl margin-bottom-sm">
									{{ userInfo.nickname }}
									<text class="text-sm margin-left-sm">ID:{{userInfo.id}}</text>
									<view class="text-sm text-cut" style="width: 500rpx;">{{ userInfo.bio ? userInfo.bio : '这家伙很懒，什么也没写！' }}</view>
								</view>
							</view>
						</view>
					</view>
					<image src="../../static/wave.gif" mode="scaleToFill" class="gif-wave"></image>
				</view>
				<view class="padding flex text-center text-grey bg-white shadow-warp">
					<view class="flex flex-sub flex-direction solid-right">
						<view class="text-xxl text-orange">{{userInfo.score}}</view>
						<view class="margin-top-sm">
							<text class="cuIcon-attentionfill"></text>积分</view>
					</view>
					<view class="flex flex-sub flex-direction solid-right">
						<view class="text-xxl text-blue">0</view>
						<view class="margin-top-sm">
							<text class="cuIcon-favorfill"></text> 粉丝</view>
					</view>
					<view class="flex flex-sub flex-direction">
						<view class="text-xxl text-green">0</view>
						<view class="margin-top-sm">
							<text class="cuIcon-fork"></text> 关注</view>
					</view>
				</view>
				<view class="cu-card margin-bottom-xl">
					
					<view class="cu-item shadow-warp" >
						<view class="margin-top-sm margin-left">工具</view>
						<view class="grid col-4 fixed padding-lr text-center">
							<view class="text-xxl padding-lr" >
								<view class="text-xxl padding-tb-sm" style="position: relative">
									<view @tap="clean()">
										<text class="cuIcon-copy"></text>
										<view class="text-sm margin-top-sm">清除缓存</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					
					<view class="cu-item shadow-warp" v-for="(item, index) in menuList" :key="index">
						<view class="margin-top-sm margin-left">{{ item.label }}</view>
						<view class="grid col-4 fixed padding-lr text-center">
							<view class="text-xxl padding-lr" v-for="(items, indexs) in item.list" :key="indexs">
								<view class="text-xxl padding-tb-sm" style="position: relative">
									<view class="cu-tag badge" :class="items.url ? '' : 'bg-grey'" v-show="items.tag">{{ items.tag }}</view>
									<navigator :url="items.url">
										<text :class="items.icon"></text>
										<view class="text-sm margin-top-sm">{{ items.label }}</view>
									</navigator>
								</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script src="pages/app/index.js">
</script>

<style lang="less">
	.bar-text {
		text {
			border-bottom: 2px solid #FBBD08;
		}
	}
	
	.user-bg {
		background-size: cover;
		height: auto;
		display: flex;
		justify-content: center;
		padding-bottom: 100rpx;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);

		.bio-area {
			margin: auto;
			margin-left: 40rpx;
		}

		text {
			opacity: 0.8;
		}

		image {
			width: 200rpx;
			height: 200rpx;
		}

		.gif-wave {
			position: absolute;
			width: 100%;
			bottom: 0;
			left: 0;
			z-index: 99;
			mix-blend-mode: screen;
			height: 100rpx;

		}
	}

	.list_content {
		height: 100vh;
	}

	.content-item {}

	.tips-msg {
		position: relative;
		top: 30%;
		color: #8799A3;
		display: grid;
		text-align: center;

		.icon {
			font-size: 98rpx;
		}
	}

	.nav {
		.cur {
			background-color: #00B0FF;
			width: 100%;
			height: 100%;
		}
	}

	.top-bar {
		position: fixed;
		width: 100%;
		height: 80rpx;
		padding: 30rpx 20rpx 20rpx 20rpx;

		.bar-text {
			border-bottom: 6rpx solid #FBBD08;
		}
	}

	.my-screen-swiper {
		bottom: 0;
		width: 100%;
		height: 100rpx;
		position: fixed;
		left: 0;
		white-space: nowrap;
		box-sizing: border-box;
		overflow: hidden;
		line-height: 100rpx;
		z-index: 999;

		.my-tab-item {
			display: inline-block;
			width: 25%;
			text-align: center;
			color: #fff;
			font-size: 38rpx;
		}

		.active {
			color: fff;
			font-size: larger;
		}
	}
	
	.tips-value {
		word-break: break-all;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
