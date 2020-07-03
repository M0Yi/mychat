<template>
	<view class="moyi-bg-a">

		<cu-custom bgColor="bg-black" isAbs :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">修改手机</block>
		</cu-custom>

		<view :style="'padding-top:'+base.CustomBar+'px'" style="height:100vh" class="moyi-bg-a moyi-te-a">
			<view class="cu-form-group text-center grid col-1 ">
				<view class="align-center padding-tb">
					<view class="cu-avatar round xxl" :style="'background-image:url(' + user.avatar + ');'">
						<image :src="user.frame" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">旧手机号码
				</view>
				<input class="text-right" placeholder="未绑定留空即可" v-model="path.oldMobile"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">新手机号码
				</view>
				<input class="text-right" v-model="path.newMobile"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">
					验证码
				</view>
				<input class="text-center text-right" type="number" placeholder="4位验证码" name="input" v-model="path.captcha"></input>
				<view class="cu-btn radius moyi-bg-b text-white" @click="getCaptcha" v-show="!verifyTime">发送验证码</view>
				<view class="cu-btn moyi-bg-b radius" v-show="verifyTime">{{verifyTime}}秒后重试</view>
			</view>
		</view>
		<view class="bottom-card">
			<view class="cu-btn moyi-bg-c radius" @tap="subMobile()">
				<text class="padding-tb-sm">修改手机</text>
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
				verifyTime: 0,
				switchC: '',
				// base: this.$common.baseInfo(),
				user: this.$common.userInfo(),
				path: {
					oldMobile: '',
					newMobile: '',
					captcha: '',
					event: 'changemobile',
					data: ''
				}
			};
		},
		onLoad() {},
		methods: {
			subMobile() {
				let _this = this
				if (_this.path.captcha.length != 4) {
					_this.$common.errorToShow('验证码不正确');
				} else if (!_this.$common.testString(_this.path.newMobile, 'mobile')) {
					_this.$common.errorToShow('手机号码不正确');
				} else {
					_this.$api.changeMobile(_this.path, (res) => {
						if (res.code) {
							_this.$common.errorToShow(res.msg);
							setTimeout(() => {
								uni.navigateBack({})
							}, 900);
						} else {
							_this.$common.errorToShow(res.msg);
						}
					})
				}
			},
			getCaptcha() {
				let _this = this
				//获取验证码
				// console.log('_this.path.newMobile',_this.path.newMobile)
				if (!_this.$common.testString(_this.path.newMobile, 'mobile')) {
					_this.$common.errorToShow('手机号码不正确')
				} else {
					uni.showLoading({
						title: '请稍后'
					})
					_this.$api.sendBindMobileCaptcha(_this.path,
						res => {
							if (res.code) {
								_this.verifyTime = 60;
								_this.countDown(); // 执行验证码计时
								uni.hideLoading();
							} else {
								_this.$common.errorToShow(res.msg);
							}
						}
					);
				}
			},
			//	倒计时
			countDown() {
				let auth_timer = setInterval(() => {
					// 定时器设置每秒递减
					this.verifyTime--; // 递减时间
					uni.setStorage({
						key: 'timer',
						data: this.verifyTime,
						success: function() {}
					});
					if (this.verifyTime <= 0) {
						clearInterval(auth_timer);
					}
				}, 1000);
			}
		}
	};
</script>

<style lang="less">
</style>
