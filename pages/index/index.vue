<template>
	<view class="h100">
		<myMessage ref="myMessage"></myMessage>

		<!-- 为什么要加个三元运算符   因为不加的话 变量还没初始化  就加载了这个，控制台报错500 自从fastadmin老大说要规范 不报错，我就得解决 -->
		<view class="bg-img flex align-center h100" :style="{backgroundImage:'url(../../static/index.jpg)'}">
			<!-- <image src="../../static/index.jpg"></image> -->
			<view class="text-white h100 ">
				<view class="abs-top text-right padding" :style="topMarginStyle">
					<view :class="lang=='zh-CN'?'lang-select':'lang'" class="inline-flex" @click="ChangeLanguage('zh-CN')">
						<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2463">
							<path d="M116.224 414.208a409.6 409.6 0 1 1 297.984 493.568 407.04 407.04 0 0 1-297.984-493.568" fill="#E72D14"
							 p-id="2464"></path>
							<path d="M537.6 498.688l-18.944 23.04L491.008 512l15.872 25.088-18.944 23.04 28.672-7.168 16.384 25.088v-29.696l29.184-7.68-27.648-10.752z m110.592-62.464h-29.696L609.28 409.6l-9.216 28.672h-29.696l24.064 17.408-9.216 28.672 24.064-17.92 24.064 17.92-9.216-28.672z m-48.64-109.568l4.608 31.744 13.824-26.624 29.696 4.608-21.504-20.992L640 288.768l-25.6 11.264-20.992-20.992 4.608 29.696-26.624 13.312z m-61.44-136.704l-18.944 23.04-28.16-11.264 16.384 25.6-19.456 22.528 29.184-7.168 15.872 25.088V238.08l30.208-7.168-27.648-11.264zM329.728 321.536l-28.16-86.528-28.16 86.528h-90.624L256 374.784 227.84 460.8l73.728-51.2 73.216 51.2-28.16-86.016 73.728-51.2z"
							 fill="#FFD700" p-id="2465"></path>
						</svg>
						<view class="min-w13 margin-auto">简体中文</view>
					</view>	
					<view>
						<view :class="lang=='zh-TW'?'lang-select':'lang'" class="inline-flex" @click="ChangeLanguage('zh-TW')">
							<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2463">
								<path d="M116.224 414.208a409.6 409.6 0 1 1 297.984 493.568 407.04 407.04 0 0 1-297.984-493.568" fill="#E72D14"
								 p-id="2464"></path>
								<path d="M537.6 498.688l-18.944 23.04L491.008 512l15.872 25.088-18.944 23.04 28.672-7.168 16.384 25.088v-29.696l29.184-7.68-27.648-10.752z m110.592-62.464h-29.696L609.28 409.6l-9.216 28.672h-29.696l24.064 17.408-9.216 28.672 24.064-17.92 24.064 17.92-9.216-28.672z m-48.64-109.568l4.608 31.744 13.824-26.624 29.696 4.608-21.504-20.992L640 288.768l-25.6 11.264-20.992-20.992 4.608 29.696-26.624 13.312z m-61.44-136.704l-18.944 23.04-28.16-11.264 16.384 25.6-19.456 22.528 29.184-7.168 15.872 25.088V238.08l30.208-7.168-27.648-11.264zM329.728 321.536l-28.16-86.528-28.16 86.528h-90.624L256 374.784 227.84 460.8l73.728-51.2 73.216 51.2-28.16-86.016 73.728-51.2z"
								 fill="#FFD700" p-id="2465"></path>
							</svg>
							<view class="min-w13 margin-auto">繁體中文</view>
						</view>

					</view>

					<view>
						<view :class="lang=='en'||!lang?'lang-select':'lang'" class="inline-flex" @click="ChangeLanguage('en')">
							<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1075">
								<path d="M116.224 414.208a409.6 409.6 0 1 1 297.984 493.568 407.04 407.04 0 0 1-297.984-493.568" fill="#F7F8F8"
								 p-id="1076"></path>
								<path d="M889.344 358.4H573.44v60.928h335.872a422.912 422.912 0 0 0-19.968-60.928m-80.896-126.464H573.44V294.4h283.648a409.6 409.6 0 0 0-48.64-62.464M217.6 795.136h589.312a455.68 455.68 0 0 0 51.2-62.464H168.448a388.608 388.608 0 0 0 51.2 62.464m390.144-678.912c-11.776-3.072-24.064-5.632-36.352-7.68v60.928h160.256a389.632 389.632 0 0 0-123.904-51.2m307.2 365.568H573.44v62.464h345.088a364.032 364.032 0 0 0 0-62.464M135.68 669.184h752.64a366.592 366.592 0 0 0 19.456-59.392v-3.072H115.2a371.712 371.712 0 0 0 20.48 62.464m278.528 238.592A391.68 391.68 0 0 0 486.4 921.6h51.2a400.384 400.384 0 0 0 192-62.464H293.376a403.968 403.968 0 0 0 120.832 51.2"
								 fill="#E72D14" p-id="1077"></path>
								<path d="M542.208 521.216l-8.704-6.144-8.704 6.144 3.072-10.24-8.704-6.144h10.752l3.584-10.752 3.584 10.752h10.752l-8.704 6.144zM499.2 192.512l3.072 12.288-8.704-6.656-8.704 6.656 3.072-10.752-8.704-6.144h10.752l3.584-10.752 3.584 10.752h10.752z m0 94.208l3.072 10.24-8.704-6.656-8.704 6.656 3.072-10.24-8.704-6.656h10.752l3.584-10.24 3.584 10.24h10.752z m0 91.648l3.584 10.752-9.216-6.656-8.704 6.656 3.584-10.752-9.216-6.144h11.264l3.072-10.24 3.584 10.24h9.728z m0 102.4l-8.704-6.144-8.704 6.144 3.072-10.24-7.168-9.728h10.752l3.584-10.24 3.072 10.24h11.264l-9.216 6.656zM457.216 238.08l3.584 10.24-8.704-6.144-9.216 6.144 3.584-10.24-8.704-6.144h10.752l3.584-10.752 3.072 10.752h11.264z m0 91.136l3.584 10.24-8.704-6.144-9.216 6.144 3.584-10.24-8.704-6.656h10.752l3.584-10.24 3.072 10.24h11.264z m0 93.184l3.584 10.24-8.704-6.656-9.216 6.656 3.584-10.24-8.704-6.656h10.752l3.584-10.24 3.072 10.24h11.264z m3.584 98.816l-8.704-6.144-9.216 6.144 3.584-10.24-8.704-6.144h10.752l3.584-10.752 3.072 10.752h11.264L457.216 512z m-43.52-328.704l3.584 12.288-8.704-6.656-9.216 6.656 3.584-10.752-8.704-6.144H409.6l3.584-10.752 3.072 10.752h11.264z m0 94.208l3.584 10.24-8.704-6.656-9.216 6.656 3.584-10.24-8.704-6.656H409.6l3.584-10.24 3.072 10.24h11.264z m0 91.648l3.072 10.752-10.752-6.656-8.704 6.656 3.072-10.752-8.704-6.144H409.6v-10.24l3.584 10.24h10.752z m0 102.4l-7.68-7.168-9.216 6.144 3.584-10.24-7.68-8.704H409.6v-8.192l3.072 10.24h10.752l-8.704 6.656z m-43.52-332.8l3.584 10.752-7.168-5.12-8.704 6.656 3.584-10.752-6.656-8.704h10.752l3.072-10.24 3.584 10.24h10.752z m0 91.136l3.584 10.24-9.216-6.144-8.704 6.144 3.584-10.24-4.608-7.168h10.752l3.072-10.752 3.584 10.752h10.752z m0 91.136l3.584 10.24-9.216-6.144-8.704 6.144 3.584-10.24-4.608-7.68h10.752l3.072-10.24 3.584 10.24h10.752z m0 93.184l3.584 10.24-9.216-6.656-8.704 6.656 3.584-10.24-4.608-7.68h10.752l3.072-10.24 3.584 10.24h10.752z m3.584 98.816l-9.216-6.144-8.704 6.144 3.584-10.24-4.608-7.168h10.752l3.072-10.752 3.584 10.752h10.752L375.808 512z m-41.472-332.8l3.584 10.24-9.216-6.144-8.704 6.144 3.584-10.24-9.216-6.656h11.264l3.072-10.24 3.584 10.24h10.752z m0 93.696l3.584 10.24-9.216-6.144-8.704 6.144 3.584-10.24-9.216-6.144h11.264l3.072-10.24 3.584 10.24h10.752z m0 92.16l3.584 10.24-8.704-6.144-9.216 6.144 3.584-10.24-9.728-6.656h10.752l3.584-10.24 3.072 10.24h11.264z m0 102.4l-8.704-6.656-8.704 6.656 3.584-10.24-7.68-6.656h11.264l3.072-10.24 3.584 10.24h10.752l-8.704 6.656zM294.4 238.08l3.072 10.24-8.704-6.144-8.704 6.144 3.584-10.24-9.216-6.144h11.264l3.072-10.752 3.584 10.752h10.752z m0 91.136l3.072 10.24-8.704-6.144-8.704 6.144 3.584-10.24-9.216-6.656h11.264l3.072-10.24 3.584 10.24h10.752z m0 93.184l3.072 10.24-8.704-6.656-8.704 6.656 3.584-10.24-9.216-6.656h11.264l3.072-10.24 3.584 10.24h10.752z m3.072 98.816l-8.704-6.144-8.704 6.144 3.584-10.24-9.216-6.144h11.264l3.072-10.752 3.584 10.752h10.752L294.4 512zM256 282.624l3.072 10.24-8.704-6.656-8.704 6.656 3.072-10.24-8.704-6.656h9.728l3.072-10.24 3.584 10.24h10.752z m0 91.648l3.584 10.24-8.704-6.144-9.216 6.144 3.584-10.24-8.704-6.144h10.752l1.024-9.728 3.072 10.752h10.752z m0 102.4l-8.704-6.144-8.704 6.144 3.072-10.24-8.704-5.632h10.752l3.584-10.24 3.584 10.24h10.752l-8.704 6.656zM448.512 140.8l3.584-10.24 3.072 10.24h11.264l-9.216 6.144 3.584 10.752-8.704-4.096-9.216 6.656 3.584-10.752-8.704-6.144z m81.408 274.944l3.584-10.24 3.584 10.24h10.752l-8.704 6.656 3.072 10.24-8.704-6.656-8.704 6.656 3.072-10.24-8.704-6.656z m0-93.184l3.584-10.24 3.584 10.24h10.752l-8.704 6.656 3.072 10.24-8.704-6.144-8.704 6.144 3.072-10.24-8.704-6.656z m0-90.624l3.584-10.752 3.584 10.752h10.752l-8.704 6.144 3.072 10.24-8.704-6.144-8.704 6.144 3.072-10.24-8.704-6.144z m0-91.136l3.584-10.24 3.584 10.24h10.752l-8.704 6.144 3.072 10.752-8.704-4.096-8.704 6.656 3.072-10.752-8.704-6.144zM212.992 329.216l3.072 10.24-8.704-6.144-8.704 6.144 3.072-10.24-8.704-6.656H204.8l3.584-10.24 3.072 10.24h11.264z m0 93.184l3.072 10.24-8.704-6.656-8.704 6.656 3.072-10.24-8.704-6.656H204.8l3.584-10.24 3.072 10.24h11.264z m3.072 98.816l-8.704-6.144-8.704 6.144 3.072-10.24-8.704-6.144H204.8l3.584-10.752 3.072 10.752h11.264L212.992 512z m-44.032-148.48l3.072 10.24-8.704-6.144-8.704 6.144 3.072-10.24-7.168-6.144h11.264l1.536-8.192 3.584 10.752h10.752z m2.56 102.4l-8.704-6.656-9.216 6.656 3.584-10.24-6.656-7.68h10.752l3.584-10.24 3.072 10.24h10.752l-8.704 6.656z m-39.936 47.104l-8.704-6.144-9.216 6.144L120.32 512l-8.704-6.144h10.752l3.584-10.752 3.072 10.752h10.752L131.072 512zM573.44 108.544l-37.888-6.144-74.752 4.608a409.6 409.6 0 0 0-204.8 87.04v4.608-2.56a318.464 318.464 0 0 0-38.4 35.84h6.144l-8.704 6.144 3.072 10.24-8.704-6.144-4.608 2.56c-8.192 9.216-15.872 19.456-23.552 29.696l-5.632 7.68v7.168l-5.12-3.072a401.408 401.408 0 0 0-54.272 128h6.656l3.584-10.24 3.072 10.24h10.752l-8.704 6.656 3.584 10.24-8.704-6.656-9.216 6.656 3.584-10.24-5.12-4.096a393.728 393.728 0 0 0-9.728 126.464H573.44z"
								 fill="#073470" p-id="1078"></path>
							</svg>
							<view class="min-w13 margin-auto">English</view>
						</view>
					</view>
				</view>
				<view class="abs-bottom text-white" :class="indexClass">

					<view class="padding text-center" @tap="Toggle('register')">
						<myButton :text="i18n.registerOrFastLogin"></myButton>
					</view>

					<view class="padding text-center" @tap="Toggle('login')">
						<myButton :text="i18n.accountLogin"></myButton>
					</view>

					<view class="padding text-right margin-lr margin-bottom">
						<view class="inline-shrink" @tap="skip()">
							{{i18n.skip}}
						</view>
					</view>
				</view>

				<view class="abs-bottom text-white" :class="loginClass">
					<view class="padding text-center ">
						<myInput :placeholder="i18n.accountOrMobile" v-model="param.account"></myInput>
					</view>
					<view class="padding text-center ">
						<myInput :placeholder="i18n.password" pass v-model="param.password"></myInput>
					</view>
					<view class="padding text-center">
						<view @tap="login">
							<myButton :text="i18n.login" :rotate="isRotate"></myButton>
						</view>
					</view>
					<view class="padding text-right margin-lr margin-bottom ">
						<view class="inline-shrink" @tap="Toggle('index')">
							{{i18n.back}}
						</view>
					</view>
				</view>

				<view class="abs-bottom text-white" :class="registerClass">
					<view class="padding text-center ">
						<myInput :placeholder="i18n.mobile" v-model="param.mobile" icon="cuIcon-mobile" type="number"></myInput>
					</view>
					<view class="padding text-center ">
						<myInput :countdownText="i18n.getCaptcha" :countdownEndText="i18n.retrySeconds" v-model="param.captcha" countdown
						 ref="countdown" @countdownClick="getCaptcha()" icon="cuIcon-comment" :placeholder="i18n.captcha"></myInput>
					</view>
					<view class="padding text-center">
						<view @tap="mobileLogin()">
							<myButton :text="i18n.login" :rotate="isRotate"></myButton>
						</view>
					</view>
					<view class="padding text-right margin-lr margin-bottom ">
						<view class="inline-shrink" @tap="Toggle('index')">
							{{i18n.back}}
						</view>
					</view>
				</view>

				<view class="abs-bottom text-white" :class="userClass">
					<view class="text-center margin">
						<view class="cu-avatar xl round" :style="avatarStyle"></view>
					</view>
					<view class="padding text-center">
						<view @tap="skip()">
							<myButton :text="i18n.loginThisAccount" :rotate="isRotate"></myButton>
						</view>
					</view>
					<view class="padding text-right margin-lr margin-bottom ">
						<view class="inline-shrink" @tap="Toggle('index')">
							{{i18n.switchAccount}}
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
				topMarginStyle:'',
				menu: 'user',
				CustomBar: this.CustomBar,
				indexImages: this.$config.indexImages,
				indexClass: 'animation-slide-bottom',
				loginClass: 'hidden',
				registerClass: 'hidden',
				userClass: 'hidden',
				isRotate: false,
				param: {
					account: 'admin',
					password: '123456',
					mobile: '17080057443',
					captcha: '1111',
				},
				cont: 1,
				lang: localStorage.getItem('locale'),
				userInfo: this.$db.get('userInfo'),
				avatarStyle: this.$config.logo
			}
		},
		methods: {
			getCaptcha() {
				//获取验证码
				console.log('parseInt(this.param.mobile)', parseInt(this.param.mobile))

				// 判断是否加载中，避免重复点击请求
				if (this.isRotate) {
					this.$refs['myMessage'].warn(this.i18n.pleaseWaitPatiently)
				} else if (this.param.mobile < 10000) {
					this.$refs['myMessage'].warn(this.i18n.mobileInputError)
				} else {
					this.isRotate = true;
					this.$api.sendLoginCaptcha(this.param, (res) => {
						if (res.code) {
							this.$refs['myMessage'].success(res.msg);
							this.$refs.countdown.$emit('runCountdown');
						} else {
							this.$refs['myMessage'].err(res.msg);
						}
					}, () => {
						this.isRotate = false;
					})
				}
			},
			ChangeLanguage(item) {
				this.$common.respond();
				this.lang = item;
				this.$i18n.locale = item;
				// localStorage.setItem('locale', item);
			},
			skip() {
				uni.redirectTo({
					url:'./app'
				})
				// this.$api.test();
			},
			// 手机登录
			mobileLogin() {
				// 判断是否加载中，避免重复点击请求
				if (this.isRotate) {
					this.$refs['myMessage'].warn(this.i18n.pleaseWaitPatiently)
				} else if (this.param.mobile == '' || this.param.mobile.length < 6) {
					this.$refs['myMessage'].warn(this.i18n.mobileInputError)
				} else if (this.param.captcha == '' || this.param.mobile.captcha < 4) {
					this.$refs['myMessage'].warn(this.i18n.captchaInputError)
				} else {
					this.isRotate = true;
					this.$api.mobileLogin(this.param, res => {
						if (res.code) {
							this.$common.saveUserInfo(res.data);
							this.$refs['myMessage'].success(res.msg);
						} else {
							this.$refs['myMessage'].err(res.msg);
						}
					}, () => {
						this.isRotate = false;
					});
				}

			},
			// 登录
			login() {
				// 判断是否加载中，避免重复点击请求
				if (this.isRotate) {
					this.$refs['myMessage'].warn(this.i18n.pleaseWaitPatiently)
				} else if (this.param.account == '' || this.param.password.length < 6) {
					this.$refs['myMessage'].warn(this.i18n.accountPassErr)
				} else {
					this.isRotate = true;
					setTimeout(() => {
						this.$api.login(this.param, res => {
							if (res.code) {
								this.$common.saveUserInfo(res.data);
								this.$refs['myMessage'].success(res.msg);
							} else {
								this.$refs['myMessage'].err(res.msg);
							}
						}, () => {
							this.isRotate = false;
						});
					}, 1000);
				}

			},
			Toggle(model) {
				this.isRotate = false;
				switch (model) {
					case 'login':
						this.indexClass = 'anim-slide-right-out';
						setTimeout(() => {
							this.loginClass = 'anim-slide-left-in z-i-9';
						}, 100)
						break;
					case 'user':
						this.indexClass = 'anim-slide-right-out';
						setTimeout(() => {
							this.userClass = 'anim-slide-left-in z-i-9';
						}, 100)
						break;
					case 'register':
						this.indexClass = 'anim-slide-right-out';
						setTimeout(() => {
							this.registerClass = 'anim-slide-left-in z-i-9';
						}, 100)
						break;
					case 'index':
						if (this.menu == 'login') {
							this.loginClass = 'anim-slide-left-out';
							setTimeout(() => {
								this.indexClass = 'anim-slide-right-in z-i-9';
							}, 100)
						} else if (this.menu == 'user') {
							this.$db.del('userInfo')
							this.userClass = 'anim-slide-left-out';
							setTimeout(() => {
								this.indexClass = 'anim-slide-right-in z-i-9';
							}, 100)
						} else {
							this.registerClass = 'anim-slide-left-out';
							setTimeout(() => {
								this.indexClass = 'anim-slide-right-in z-i-9';
							}, 100)
						}
						break;

					default:
						break;
				}
				this.menu = model;
			}
		},
		created() {
			console.log('页面创建完成')
		},
		onLoad() {
			var CustomBar= this.CustomBar;
			this.topMarginStyle = `margin-top:${CustomBar}px;`;
			
			
			if (this.userInfo) {
				let avatarImage = this.userInfo.avatar ? this.userInfo.avatar : this.config.logo;
				this.avatarStyle = `background-image:url(${avatarImage});`;
				console.log('this.userInfo', this.userInfo)
				this.$api.refreshUser('', (res) => {
					if (res.code) {
						this.$common.saveUserInfo(res.data)
						this.Toggle('user')
					}
				})
			}
		},
		computed: {
			// 初始化多语言
			i18n() {
				return this.$t('index')
			}
		}
	}
</script>

<style>
	.icon {
		width: 40upx;
		height: 40upx;
	}

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
		border-right: #0081FF solid 5upx;
	}
</style>
