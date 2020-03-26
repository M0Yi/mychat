<template>
	<view class="moyi-bg-img">
		<view class="cu-modal bottom-modal" :class="modalName=='cosmosMore'?'show':''" @tap="hideModal">
			<view class="cu-dialog">
				<view class="cu-list menu text-center bg-black">
					<view class="cu-item cu-item-bottom" @tap="feedback()">
						<view class="">举报</view>
					</view>
					<view class="cu-item cu-item-bottom">
						<view class="">取消</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 置顶按钮 -->
		<view class="btn-scroll-top bg-black text-center round">
			<text class="cuIcon-fold text-xl"></text>
		</view>

		<scroll-view :class="['my-screen-swiper','shadow']" scroll-x :scroll-left="tabScroll" scroll-with-animation="true">
			<view :class="['my-tab-item','text-xxl', currentTab == index ? 'active' : '']" :data-current="index" @click="clickMenu"
			 v-for="(item, index) in barList" :key="index">
				<text class="text-xxl" :class="[currentTab == index ? 'bg-' : 'text-gray',item.icon]"></text>
				<view style="margin-top: 2px;" :class="[currentTab == index ? '' : 'text-gray ']">{{item.label}}</view>
			</view>
		</scroll-view>

		<preview :list="preview.list" :show="preview.show" :index="preview.index">
		</preview>

		<swiper class="list_content " duration="500" :current="currentTab" @change="changeContent">

			<!-- 社区界面 -->
			<swiper-item class="content-item ">
				<view class="moyi-bg-img cu-bar top-title padding-bottom-sm" :style="'padding-top:'+base.CustomBar+'px'">
					<view class="bar-text margin-left-sm text-white">
						<text>Cosmos</text>
					</view>
				</view>

				<scroll-view class="padding-top	cosmos-scroll-view" @touchstart="cosmosMod.touchstart" @touchmove="cosmosMod.touchmove"
				 :change:prop="cosmosMod.end" :prop="cosmos.propValue" @touchend="cosmosMod.touchend" :data-top="cosmos.scrollTop"
				 id="cosmos-refresh-container" scroll-y upper-threshold="50">
					<view id="load-text" class="load-text  anim-text-lePeek text-center text-gray">
						
						<text class="anim-text" v-for="(item, index) in base.title" :key="index" :style="'animation-delay:'+ (200+index*100) +'ms;'">{{item}}</text>
					</view>
					<view @tap="cosmosOpen(index)" class="cosmos-chat text-grey" v-for="(item, index) in cosmosList" :key="index">
						<view class="flex margin-tb padding-lr-xls">
							<view @tap.stop="" @tap="userOpen(index)"  class="cu-avatar round lg" :style="'background-image:url(' + item.avatar + ');'">
								<image :src="item.frame" mode="widthFix"></image>
							</view>
							<view class="margin-auto padding-lr-sm">
								<text class="padding-right-sm ">{{item.nickname}}</text>
								<text :class="['text-bold',item.gender==0?'text-pink  cuIcon-female':'text-blue  cuIcon-male']"></text>
							</view>
							<view class="flex-sub margin-auto">
							</view>

							<view class="flex cosmos-time">
								<view class="text-grey ">{{ timeToDate(item.createtime) }}</view>
							</view>
						</view>
						<view class="cu-item cosmos-text margin-bottom-sm">
							{{item.text}}
						</view>
						<view class="padding-lr-xls" @tap.stop="" >
							<view  :class="['grid','margin-auto',item.images_arr.length==1?'':'col-3 grid-square']" v-if="item.images">
								<view @tap="previews(item.images_arr,indexs)" class="margin-tb-sm cosmos-image-item" v-for="(items, indexs) in item.images_arr"
								 :key="indexs">
									<image lazy-load class="cosmos-image-item-image" :src="items" mode="aspectFill"></image>
								</view>
								<!-- {{item.images}}  -->
							</view>
						</view>
						<view class="padding-lr-xls grid col-6 border-bottom ">
							<view class="text-right">
								<text class="cuIcon-comment text-xl"></text>
							</view>
							<view class="margin-tb-auto margin-left-ss">
								{{item.reviews>0?item.reviews:''}}
							</view>
							<view class="text-right" @tap.stop="" @tap="like(index)">
								<text :class="item.isLike?'cuIcon-likefill text-red':'cuIcon-like'">
								</text>
							</view>
							<view class="margin-tb-auto margin-left-ss">
								{{item.likes>0?item.likes:''}}
							</view>
							<view class="text-right" @tap.stop="">
								<text class="cuIcon-more text-xl" @tap="cosmosMoreOperate(index)"></text>
							</view>
						</view>
						<view class="cosmos-border">
						</view>
					</view>

					<view id="more-text" class="load-text  anim-text-lePeek text-center text-gray">
						<!-- anim-lePeek -->
						<text class="anim-text" v-for="(item, index) in base.title" :key="index" :style="'animation-delay:'+ (200+index*100) +'ms;'">{{item}}</text>
					</view>
				</scroll-view>
				<!-- <view>第一个</view> -->
			</swiper-item>

			<!-- 最新消息界面 -->
			<swiper-item class="content-item" style="background-image: url(../../static/bg-img.jpg);">
				<view class="moyi-bg-img cu-bar top-title padding-bottom-sm" :style="'padding-top:'+base.CustomBar+'px'">
					<view class="bar-text margin-left-sm text-white">
						<text>Message</text>
					</view>
				</view>
				
				
				
				<scroll-view
				 :style="'padding-top:'+base.CustomBar+'px'"
				 class="padding-top	cosmos-scroll-view" @touchstart="cosmosMod.touchstart" @touchmove="cosmosMod.touchmove"
				 :change:prop="cosmosMod.end" :prop="cosmos.propValue" @touchend="cosmosMod.touchend" :data-top="cosmos.scrollTop"
				 id="cosmos-refresh-container" scroll-y upper-threshold="50">
					<view class="tips-msg margin-top-xl" v-if="!newMessageList.length">
						<text class="cuIcon-message icon"></text>
						<text class="margin">暂时没有新的消息</text>
					</view>
					<view class="cu-list menu-avatar" v-else>
						<view class="cu-item" v-for="(item, index) in newMessageList" :key="index" @click="openChat(item.user)">
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
				</scroll-view>
				
				
				
			</swiper-item>

			<!-- 联系人界面 -->
			<swiper-item class="content-item" style="background-image: url(../../static/bg-img.jpg);">
				<view class="moyi-bg-img cu-bar top-title padding-bottom-sm" :style="'padding-top:'+base.CustomBar+'px'">
					<view class="bar-text margin-left-sm text-white">
						<text>Contacts</text>
					</view>
				</view>
				
				<scroll-view
				 :style="'padding-top:'+base.CustomBar+'px'"
				 class="padding-top	cosmos-scroll-view" @touchstart="cosmosMod.touchstart" @touchmove="cosmosMod.touchmove"
				 :change:prop="cosmosMod.end" :prop="cosmos.propValue" @touchend="cosmosMod.touchend" :data-top="cosmos.scrollTop"
				 id="cosmos-refresh-container" scroll-y upper-threshold="50">
					<view class="cu-list menu-avatar">
						<view class="cu-item contacts-list" @tap="openChat(userInfo)">
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
						 @tap="openChat(item.user)">
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
				</scroll-view>
				
				
			</swiper-item>

			<!-- 个人中心界面 -->
			<swiper-item class="content-item " >
				<view class="user-bg " :style="'padding-top:'+base.CustomBar+'px'">
					<view class="flex">
						<view class="cu-avatar xl round margin-left bg-white" :style="'background-image:url(' + userInfo.avatar + ');'">
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
					<!-- <image src="../../static/wave.gif" mode="scaleToFill" class="gif-wave"></image> -->
				</view>
<!-- 				<view class="padding flex text-center text-grey shadow-warp">
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
				</view> -->
				<view class="cu-card margin-bottom-xl">

					<view class="cu-item shadow-warp bg-white">
						<view class="margin-top-sm margin-left">工具</view>
						<view class="grid col-4 fixed padding-lr text-center">
							<view class="text-xxl padding-lr">
								<view class="text-xxl padding-tb-sm" style="position: relative">
									<view @tap="clean()">
										<text class="cuIcon-copy"></text>
										<view class="text-sm margin-top-sm">清除缓存</view>
									</view>
								</view>
							</view>

							<navigator url="../test/test" class="text-xxl padding-lr">
								<view class="text-xxl padding-tb-sm" style="position: relative">
									<view>
										<text class="cuIcon-copy"></text>
										<view class="text-sm margin-top-sm">测试页面</view>
									</view>
								</view>
							</navigator>


							<view class="text-xxl padding-lr">
								<view class="text-xxl padding-tb-sm" style="position: relative">
									<view @tap="qie()">
										<text class="cuIcon-copy"></text>
										<view class="text-sm margin-top-sm">切换登陆</view>
									</view>
								</view>
							</view>
							<view class="text-xxl padding-lr">
								<view class="text-xxl padding-tb-sm" style="position: relative">
									<view @tap="qie()">
										<text class="cuIcon-copy"></text>
										<view class="text-sm margin-top-sm">切换登陆</view>
									</view>
								</view>
							</view>
						</view>
					</view>

					<view class="cu-item shadow-warp bg-white" v-for="(item, index) in menuList" :key="index">
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


<script module="cosmosMod" lang="wxs">
	// 起始y的坐标
	var startY = 0
	// 起始y的坐标
	var startX = 0
	// y轴移动距离
	var top = 0
	// 防止重复下拉刷新
	var code = 0
	// 防止重复向逻辑层交互
	var mit = 0

	function touchstart(event, ins) {
		console.log('touchstart');
		top = 0;
		if (code == 0) {
			mit = 0
			ins.callMethod('cosmosTrigger', 2);
			var touch = event.touches[0] || event.changedTouches[0]
			startY = touch.pageY
			startX = touch.pageX
		}
	}

	function end(newValue, oldValue, ownerInstance, instance) {
		console.log('end');
		console.log('selectComponent', ownerInstance.selectComponent('#cosmos-refresh-container'));

		// 收回
		ownerInstance.selectComponent('#cosmos-refresh-container').setStyle({
			'transform': 'translateY(0)',
			'transition': 'ease 0.3s'
		})
		// 停止转圈
		ownerInstance.selectComponent('#load-text').removeClass('anim-text-infinite')

		ownerInstance.selectComponent('#load-text').setStyle({
			'transform': 'scale(0)'
		})

		// 复原
		code = 0
	}

	function touchend(event, ins) {
		console.log('touchend');
		if (code == 0) {
			// let bottom = ins.selectComponent('#more-text').$el.offsetTop - event.instance.$vm.lastScrollTop;
			// console.log('天热搜图');



			// const query = wx.createSelectorQuery()
			// query.select('#more-text').boundingClientRect(function(res){
			// 	console.log(res);
			//   res.top // #the-id 节点的上边界坐标（相对于显示区域）
			// })

			// console.log('moretext',ins.select('#more-text'));
			// select('#the-id').boundingClientRect()
			// console.log('moretext',ins.selectComponent('#more-text').triggerEvent);
			// let bottom = ins.selectComponent('#more-text').$el.offsetTop - event.instance.$vm.lastScrollTop;
			// if(bottom<1500){
			// 	ins.callMethod('cosmosTrigger', 3);
			// }
			// 这里根据自己业务处理,小于60则不作操作
			if (top < 60) {
				ins.selectComponent('#cosmos-refresh-container').setStyle({
					'transform': 'translateY(0)',
					'transition': 'ease 0.3s'
				})

				ins.selectComponent('#load-text').setStyle({
					'transform': 'scale(0)'
				})
			} else {
				ins.selectComponent('#load-text').setStyle({
					'transform': 'scale(1)'
				})
				// 改变提示文字
				ins.callMethod('cosmosTrigger', 1);
				// 防止重复下拉
				code = 1
				ins.selectComponent('#cosmos-refresh-container').setStyle({
					// 成功刷新回弹的距离
					'transform': 'translateY(60px)',
					'transition': 'ease 0.3s',
					'padding-bottom': '60px',
				})
				ins.selectComponent('#load-text').addClass('anim-text-infinite')

			}
		} else {

		}


	}

	function touchmove(event, ins) {
		if (code == 0) {
			var touch = event.touches[0] || event.changedTouches[0]
			var pageY = touch.pageY
			var pageX = touch.pageX
			var vew = ins.selectComponent('#cosmos-refresh-container')
			var dataset = vew.getDataset();
			top = pageY - startY
			var lr = pageX - startX
			console.log('touchmove', lr);

			// 页面是否触底
			if (dataset.top == 0) {
				// 改变提示文字,且只会触发一次
				if (top > 60) {
					if (mit == 0) {
						ins.callMethod('cosmosTrigger', 0);
					}
					mit = 1
				}
				vew.setStyle({
					'transform': 'translateY(' + (top) + 'px)',
					'padding-bottom': top + 'px',
				})
				// console.log('top', top)
				ins.selectComponent('#load-text').setStyle({
					'transform': 'scale(' + (top > 100 ? 1 : top / 100) + ')'
				})
			} else {
				// 从长列表下拉上来 ,这里要实时更新起始位置
				startY = pageY
			}
		}
	}
	module.exports = {
		end: end,
		touchend: touchend,
		touchstart: touchstart,
		touchmove: touchmove,
	}
</script>

<style lang="less">
	.cosmos-image-item-image {
		width: 670rpx;
	}


	.load-text {
		transform: scale(0);
	}

	.cosmos-chat {}

	.cosmos-main {
		margin: 0 20rpx !important;
	}

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
		padding-bottom: 50rpx;
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

	.content-item {
		
	}

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

	.cu-bar {
		top: -60rpx;
		z-index: 1;
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

	.cosmos-scroll-view {
		position: absolute;
		top: 0;
		bottom: 96upx;
	}
</style>
