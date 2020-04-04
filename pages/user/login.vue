<template>
	<view>
		<view class="cu-load load-modal moyi-bg-b " v-if="loadModal">
				<image :src="base.logo" mode="aspectFit"></image>
				<view class="moyi-te-a">登陆中...</view>
		</view>
		<view class="cu-modal" :class="modalName=='wechat'?'show':''" @tap="hideModal">
			<view class="cu-dialog moyi-bg-b moyi-te-a" @tap.stop="">
				<view class="margin text-xl ">微信快捷登陆</view>
				<view class="flex align-center justify-center text-green" style="font-size: 100rpx;">
					<text class="cuIcon-weixin"></text>
					<text class="text-xl margin margin-right-xl moyi-te-b" style="transform:rotate(90deg);"><text class="cuIcon-order"></text></text>
					<image class="margin-top-sm" :src="base.logo" style="width: 120rpx;height: 120rpx;"></image>
				</view>
				<view class="flex margin justify-center">
					<button class="margin cu-btn bg-green radius" :disabled="!wechatPath.code" open-type="getUserInfo" @getuserinfo="wechatMpLogin">
						{{ wechatPath.code ? '快捷登陆' : '加载中..' }}
					</button>
				</view>
			</view>
		</view>
		
		<view class="moyi-bg-a moyi-te-a" style="height:100vh">
			<view style="padding: 20%;text-align: center;">
				<image class="moyi-bg-a" :src="base.logo" mode="widthFix" style=";width: 150rpx;height: 150rpx;"></image>
				<view>
					{{base.title}}
				</view>
			</view>
			<swiper disable-touch class="padding-lr-xl" style="height:50vh" duration="500" :current="indexTab">
				<swiper-item>
					
					<view class="cu-form-group moyi-bg-c moyi-te-c round margin-top-xl  ">
						<view style="width: 100%" class="text-center" @tap="wechatBtn()">
							<text class="cuIcon-weixin text-xl padding-right-sm"></text>微信快速登陆
						</view>
					</view>
					
					<view class="cu-form-group moyi-bg-c moyi-te-c round margin-top-xl" @tap="Toggle(1)">
						<view style="width: 100%" class="text-center">
							账号密码登陆
						</view>
					</view>
					
					
					<view class="padding text-center margin-lr text-sm ">
						<view class="inline-shrink" @tap="Toggle(0)">
							登陆即代表同意<text class="text-yellow" @tap="navigateTo('/pages/cms/index?id=1&title=用户协议')">《用户协议》</text>以及<text @tap="navigateTo('/pages/cms/index?id=2&title=隐私政策')" class="text-yellow">《隐私政策》</text>
						</view>
					</view>
				</swiper-item>
				
				<swiper-item>
					<view class="cu-form-group moyi-bg-b round">
						<view class="title">账号:
						</view>
						<input class="text-right" placeholder="请输入ID或手机号" v-model="param.account"></input>
					</view>
					<view class="cu-form-group moyi-bg-b round margin-top-xl">
						<view class="title">密码:
						</view>
						<input class="text-right" type="password" placeholder="请输入密码" v-model="param.password"></input>
					</view>

					<view class="cu-form-group moyi-bg-c moyi-te-c round margin-top-xl" @tap="login">
						<view style="width: 100%" class="text-center" >
							登陆
						</view>
					</view>
					
					<view class="padding text-center margin-lr text-sm ">
						<view class="inline-shrink" @tap="Toggle(0)">
							返回
						</view>
					</view>
				</swiper-item>
				
				<swiper-item>
					<view class="cu-form-group moyi-bg-b round">
						<view class="title">手机号码:
						</view>
						<input class="text-right" placeholder="请输入ID或手机号" v-model="param.account"></input>
					</view>
					<view class="cu-form-group moyi-bg-b round margin-top-xl">
						<view class="title">验证码:
						</view>
						<input class="text-right" type="password" placeholder="验证码" v-model="param.password"></input>
						<view class="cu-btn radius moyi-bg-b text-white" @click="getCaptcha" v-show="!verifyTime">发送验证码</view>
						<view class="cu-btn moyi-bg-b radius" v-show="verifyTime">{{verifyTime}}秒后重试</view>
					</view>
				
					<view class="cu-form-group moyi-bg-c moyi-te-c round margin-top-xl" @tap="login">
						<view style="width: 100%" class="text-center" >
							注册/登陆
						</view>
					</view>
					
					<view class="padding text-center margin-lr text-sm ">
						<view class="inline-shrink" @tap="Toggle(0)">
							返回
						</view>
					</view>
				</swiper-item>
				
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base:{
					title:this.$config.title,
					logo:this.$config.logo
				},
				verifyTime: 0,
				loadModal:false,
				modalName:'',
				indexTab:1,
				isRotate:false,
				param: {
					account: 'admin',
					password: '123456',
					mobile: '17080057443',
					captcha: '1111',
				},
				wechatPath: {
					encryptedData: '',
					iv: '',
					code: false
				}
			}
		},
		methods: {
			wechatBtn(){
				this.modalName = 'wechat';
			},
			wechatMpLogin(e) {
				this.loadModal = true;
				let _this = this;
				let modalName = _this.modalName;
				
				// 隐藏登陆
				_this.modalName = '';
				// 显示等待
				// _this.loadModal = true;
				// 获取关键内容
				_this.wechatPath.iv = e.detail.iv;
				_this.wechatPath.encryptedData = e.detail.encryptedData;
				// 请求小程序登陆接口
				_this.$api.wechatLogin(_this.wechatPath, res => {
					if (res.code) {
						// 保存登陆并返回
						_this.$common.saveUserInfo(res.data);
						_this.loginSuccess();

					} else {
						_this.$common.errorToShow(res.msg);
						_this.hideModal();
						_this.modalName = modalName;						
						_this.getCode();
					}
				});
			},
			
			// 获取登陆代码
			getCode() {
				uni.login({
					success: res => {
						console.log('wechatPath', res);
						if (res.code) {
							this.wechatPath.code = res.code;
						} else {
							this.$common.errorToShow('用户未授权code');
						}
					},
					fail: res => {
						this.$common.errorToShow('用户授权失败');
					}
				});
			},
			hideModal() {
				this.loadModal = null;
				this.modalName = null;
			},
			navigateTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			loginSuccess(){
				setTimeout(function() {
					uni.reLaunch({
						url:'/pages/app/indexs'
					})
				}, 1000);
				
			},
			Toggle(index){
				console.log('test')
				this.indexTab=index;
			},
			// 登录
			login() {
				// 判断是否加载中，避免重复点击请求
				if (this.param.account == '' || this.param.password.length < 6) {
					this.$common.errorToShow('账号或密码错误');
				} else {
					// 显示等待
					this.loadModal = true;
					setTimeout(() => {
						this.$api.login(this.param, res => {
							this.$common.errorToShow(res.msg);
							if (res.code) {
								this.$common.saveUserInfo(res.data);
								this.loginSuccess();
							}
						}, () => {
							this.loadModal = false;
						});
					}, 1000);
				}
			},
		},
		onLoad() {			
			// #ifdef MP-WEIXIN
			this.getCode();
			// #endif
			console.log('onLoad')
		}
	}
</script>

<style lang="less">
	.login-bg{
		width: 100%;
		height: 100%;
		position: absolute;
	}
	.list_content{
		width: 100%;
		height: 100%;
		bottom: 20%;
	}
	.swiper-content{
		bottom: 0;
		position: absolute;
		width: 100%;
	}

</style>
