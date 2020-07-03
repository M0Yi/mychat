<template>
	<view class="moyi-bg-a">
		<view class="user-bg " :style="'padding-top:'+base.CustomBar+'px'">
			<view class="flex">
				<view class="cu-avatar xl round margin-left bg-white" :style="'background-image:url(' + userInfo.avatar + ');'">
					<image :src="userInfo.frame" mode="widthFix"></image>
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
		</view>
		<view style="height: 80vh;">

			<view class="cu-card margin-bottom-xl">

				<view class="cu-item shadow-warp moyi-bg-b moyi-te-a">
					<view class="margin-top-sm margin-left">用户中心
					</view>
					<view class="grid col-4 fixed padding-lr text-center">
						<view class="text-xxl padding-lr">
							<view class="text-xxl padding-tb-sm" style="position: relative">
								<view @tap="navigateTo('/pages/user/profile')">
									<text class="cuIcon-profile"></text>
									<view class="text-sm margin-top-sm">个人资料</view>
								</view>
							</view>
						</view>
						<view class="text-xxl padding-lr">
							<view class="text-xxl padding-tb-sm" style="position: relative">
								<view @tap="navigateTo('/pages/user/changepwd')">
									<text class="cuIcon-command"></text>
									<view class="text-sm margin-top-sm">修改密码</view>
								</view>
							</view>
						</view>
						<view class="text-xxl padding-lr">
							<view class="text-xxl padding-tb-sm" style="position: relative">
								<view @tap="navigateTo('/pages/user/changemobile')">
									<text class="cuIcon-mobile"></text>
									<view class="text-sm margin-top-sm">换绑手机</view>
								</view>
							</view>
						</view>
						<view class="text-xxl padding-lr">
							<view class="text-xxl padding-tb-sm" style="position: relative">
								<view @tap="logout()">
									<text class="cuIcon-exit"></text>
									<view class="text-sm margin-top-sm">安全退出</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-item shadow-warp moyi-bg-b moyi-te-a">
					<view class="margin-top-sm margin-left">其他</view>
					<view class="grid col-4 fixed padding-lr text-center">
						<view class="text-xxl padding-lr">
							<view class="text-xxl padding-tb-sm" style="position: relative">
								<view @tap="navigateTo('/pages/user/feedback')">
									<text class="cuIcon-edit"></text>
									<view class="text-sm margin-top-sm">建议反馈</view>
								</view>
							</view>
						</view>
						<view class="text-xxl padding-lr">
							<view class="text-xxl padding-tb-sm" style="position: relative">
								<view @tap="navigateTo('/pages/cms/index?id=1&title=用户协议')">
									<text class="cuIcon-text"></text>
									<view class="text-sm margin-top-sm">用户协议</view>
								</view>
							</view>
						</view>
						<view class="text-xxl padding-lr">
							<view class="text-xxl padding-tb-sm" style="position: relative">
								<view @tap="navigateTo('/pages/cms/index?id=2&title=隐私政策')">
									<text class="cuIcon-text"></text>
									<view class="text-sm margin-top-sm">隐私政策</view>
								</view>
							</view>
						</view>
						
						<view class="text-xxl padding-lr">
							<view class="text-xxl padding-tb-sm" style="position: relative">
								<view @tap="navigateTo('/pages/cms/index?id=3&title=关于我们')">
									<text class="cuIcon-question"></text>
									<view class="text-sm margin-top-sm">关于我们</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base: {
					avatar: this.$config.avatar,
					CustomBar: this.CustomBar,
					title: this.$config.title
				},
				userInfo: this.$common.userInfo()
			}
		},
		created() {
			uni.$on('refreshUser', (data) => {
				this.userInfo = data
			})
		},
		methods: {
			logout() {
				uni.reLaunch({
					url: '/pages/user/login'
				},()=>{},()=>{
					uni.clearStorageSync()
					this.$common.errorToShow('已安全退出');
					this.$api.logout();
				})
				
			},
			navigateTo(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="less">
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
</style>
