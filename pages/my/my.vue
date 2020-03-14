<template>
	<view>
		<view class="cu-custom">
			<view class="cu-bar fixed" :class="scrollTop < 100?'show':'hide'" :style="[{height:CustomBar + 'px',paddingTop:StatusBar + 'px',backgroundColor:'rgba(255,119,17,' + (scrollTop>CustomBar?1:scrollTop/CustomBar) + ')'}]">
				<view class="action text-bold">
					<view class="text-white text-xl">
						我的
					</view>
				</view>
				<view style="opacity: 0;">
					{{scrollTop}}
				</view>
				<view class="action text-white">
					<navigator url="/pages/set/set" hover-class="none" class="icon-settingsfill padding-lr-sm"></navigator>
					<navigator url="/pages/notice/notice" hover-class="none" class="icon-noticefill padding-lr-sm"></navigator>
				</view>
			</view>
		</view>
		<view class="bg-gradual-orange myHead" :style="[{paddingTop:(CustomBar + 10) + 'px'}]">
			<view class="cu-list menu-avatar" v-if="isLogin">
				<view class="cu-item">
					<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
					<view class="content">
						<view class="text-white">文晓港</view>
						<view class="text-white text-sm flex">
							<view class="text-cut">
								ID：1231312312
								<text class="icon-copy text-white margin-left-xs"></text>
							</view>
						</view>
					</view>
					<view class="action">
						<text class="icon-right text-xl"></text>
					</view>
				</view>
			</view>
			<view class="cu-list menu-avatar" v-else>
				<view class="cu-item" @tap="showModal" data-target="loginModal">
					<view class="cu-avatar round lg bg-white shadow"><text class="icon-myfill text-red"></text></view>
					<view class="content">
						<view class="text-white">注册 / 登录</view>
						<view class="text-white text-sm flex">
							<view class="text-cut">
								新用户注册最高可得 <text class="">999元现金奖励</text>
							</view>
						</view>
					</view>
					<view class="action">
						<text class="icon-right text-xl"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="navHead bg-white shadow">
			<navigator url="/pages/sign/sign" hover-class="none" class="flex-sub">
				<view class='text-xxl icon-zhengguifapiao text-orange'></view>
				<view class="text-sm margin-top-xs">签到</view>
			</navigator>
			<navigator url="/pages/wallet/wallet" hover-class="none" class="flex-sub solid-left">
				<view class='text-xxl icon-qianbao text-red'></view>
				<view class="text-sm margin-top-xs">钱包</view>
			</navigator>
			<navigator url="/pages/footprint/footprint" hover-class="none" class="flex-sub solid-left">
				<view class='text-xxl icon-footprint text-mauve'></view>
				<view class="text-sm margin-top-xs">足迹</view>
			</navigator>
		</view>
		<view class="cu-bar bg-white margin-top" @tap="toOrder()">
			<view class='action'><text class="icon-titles text-orange"></text>我的订单</view>
			<view class='action'>
				<view class='text-gray text-sm'>
					查看全部
					<text class='icon-right'></text>
				</view>
			</view>
		</view>
		<view class="cu-list grid col-5 no-border solid-top">
			<view class="cu-item" @tap="toOrder(1)">
				<view class='icon-pay text-gray'>
					<view class="cu-tag badge" v-if="order.unpaid!=0">{{order.unpaid}}</view>
				</view>
				<text>待付款</text>
			</view>
			<view class="cu-item" @tap="toOrder(2)">
				<view class='icon-deliver text-gray'>
					<view class="cu-tag badge" v-if="order.unship!=0">{{order.unship}}</view>
				</view>
				<text>待发货</text>
			</view>
			<view class="cu-item" @tap="toOrder(3)">
				<view class='icon-send text-gray'>
					<view class="cu-tag badge" v-if="order.unrecv!=0">{{order.unrecv}}</view>
				</view>
				<text>待收货</text>
			</view>
			<view class="cu-item" @tap="toOrder(4)">
				<view class='icon-evaluate text-gray'>
					<view class="cu-tag badge" v-if="order.uncomment!=0">{{order.uncomment}}</view>
				</view>
				<text>待评价</text>
			</view>
			<view class="cu-item" @tap="toRefund(5)">
				<view class='icon-refund text-gray'></view>
				<text>退款/售后</text>
			</view>
		</view>


		<view class="cu-bar bg-white margin-top">
			<view class='action'><text class="icon-titles text-orange"></text>我的福利</view>
		</view>

		<scroll-view scroll-x class="topicBox topicImg bg-white solid-top padding-bottom-xs padding-right-sm">
			<view v-for="(item,index) in topicList" :key="index" class="cu-item bg-gray">
				<view class="cu-avatar round" :style="[{backgroundImage:'url(' + item.img + ')'}]"></view>
				<view class="text-bold">
					{{item.title}}
				</view>
				<view class="text-xs text-orange" v-if="item.isGet">
					已领取
				</view>
				<view class="text-xs text-gray" v-else>
					未领取
				</view>
			</view>
		</scroll-view>
		<view class="bg-white padding-lr-sm padding-bottom">
			<view class="myUpShop">
				<view class="flex-sub">
					<view class="text-xl">会员免费升级云店</view>
					<view class="text-sm">累计购物 <text class="text-orange">满 2000 元</text> 即可升级</view>
					<view class="margin-top-xs">
						<button class="cu-btn bg-orange round sm shadow">立即查看</button>
					</view>
				</view>
				<image src="https://image.weilanwl.com/qhShop/myUpShop.jpg" mode="aspectFill"></image>
			</view>
		</view>

		<view class="cu-bar bg-white margin-top">
			<view class='action'><text class="icon-titles text-orange"></text>我的服务</view>
		</view>

		<view class="cu-list grid col-4 no-border solid-top">
			<navigator url="/pages/coupon/coupon" hover-class="none" class="cu-item">
				<view class='icon-ticket text-red'></view>
				<text>优惠券</text>
			</navigator>
			<navigator url="/pages/invita/invita" hover-class="none" class="cu-item">
				<view class='icon-qr_code text-green'></view>
				<text>邀请有奖</text>
			</navigator>
			<navigator url="/pages/fans/fans" hover-class="none" class="cu-item">
				<view class='icon-group_fill text-pink'></view>
				<text>我的粉丝</text>
			</navigator>
			<navigator url="/pages/address/address" hover-class="none" class="cu-item">
				<view class='icon-locationfill text-cyan'></view>
				<text>收货地址</text>
			</navigator>
			<navigator url="/pages/collect/collect" hover-class="none" class="cu-item">
				<view class='icon-favorfill text-orange'></view>
				<text>我的收藏</text>
			</navigator>
			<navigator url="/pages/feedback/feedback" hover-class="none" class="cu-item">
				<view class='icon-questionfill text-blue'></view>
				<text>意见反馈</text>
			</navigator>
			<view class="cu-item">
				<view class='icon-servicefill text-mauve'></view>
				<text>在线帮助</text>
			</view>
			<view class="cu-item">
				<view class='icon-brandfill text-blue'></view>
				<text>关于我们</text>
			</view>
		</view>
		<view class="cu-tabbar-height margin-top"></view>
		<login :modalName="modalName">
			<block slot="action">
				<view class="action" @tap="hideModal"><view class="margin-left-xs"><view class="icon-close text-xxl"></view></view></view>
			</block>
		</login>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				isLogin: true,
				modalName: null,
				topicList: [{
					title: '免费领面膜',
					img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					isGet: true
				}, {
					title: '免费领眉笔',
					img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					isGet: false
				}, {
					title: '免费领手机',
					img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					isGet: false
				}, {
					title: '免费领粉底液',
					img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					isGet: false
				}, ],
				order:[]
			}
		},
		props: {
			scrollTop: {
				type: Number,
				default: 0
			},
		},
		methods: {
			toOrder(nav) {
				uni.navigateTo({
					url: '/pages/order/list?nav=' + nav,
				});
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			}
		}
	}
</script>

<style>
	.myHead {
		position: relative;
		padding-bottom: 100upx;
	}

	.myHead image {
		position: absolute;
		bottom: 0;
	}

	.myHead .cu-list .cu-item::after {
		display: none;
	}

	.cu-list.menu-avatar .cu-item,
	.myHead .cu-list {
		background-color: transparent;
	}

	.navHead {
		position: relative;
		margin: -90upx 30upx 0;
		padding: 30upx 0;
		display: flex;
		text-align: center;
		border-radius: 10upx;
	}

	.cu-list.menu-avatar.card-menu>.cu-item .content {
		left: 115upx;
	}

	.cu-avatar-group .cu-avatar.sm {
		margin-left: -20upx !important;
		border: 1rpx solid #FFFFFF !important;
	}

	.myUpShop {
		background-color: #fee7b3;
		position: relative;
		padding: 30upx 300upx 30upx 30upx;
		border-radius: 10upx;
	}

	.myUpShop image {
		position: absolute;
		width: 241upx;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		height: 169upx;
	}
</style>
