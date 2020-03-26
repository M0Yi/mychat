<template>
	<view>
		<myMessage ref="myMessage"></myMessage>
		
		<view class="bg-gradual-orange moyi-bg-img login-bg">
			<swiper disable-touch class="list_content" duration="500" :current="indexTab">
				<swiper-item>
					<view class="swiper-content text-white">
					
						
						<view class="padding text-center">
							<myButton text="Fast Login"></myButton>
						</view>
						
						<view class="padding text-center margin-bottom-xl" @tap="Toggle(1)">
							<myButton text="Account Login"></myButton>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-content text-white">
						<view class="padding text-center ">
							<myInput placeholder="Account or Mobile" v-model="param.account"></myInput>
						</view>
						<view class="padding text-center ">
							<myInput placeholder="Password" pass v-model="param.password"></myInput>
						</view>
						<view class="padding text-center">
							<view @tap="login">
								<myButton text="Login" :rotate="isRotate"></myButton>
							</view>
						</view>
						<view class="padding text-right margin-lr margin-bottom ">
							<view class="inline-shrink" @tap="Toggle(0)">
								Back
							</view>
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
				indexTab:1,
				isRotate:false,
				param: {
					account: 'admin',
					password: '123456',
					mobile: '17080057443',
					captcha: '1111',
				},
			}
		},
		methods: {
			loginSuccess(){
				uni.reLaunch({
					url:'../app/index'
				})
			},
			Toggle(index){
				console.log('test')
				this.indexTab=index;
			},
			// 登录
			login() {
				// 判断是否加载中，避免重复点击请求
				if (this.isRotate) {
					this.$refs['myMessage'].warn('Please Wait Patiently')
				} else if (this.param.account == '' || this.param.password.length < 6) {
					this.$refs['myMessage'].warn('Account or Password Error')
				} else {
					this.isRotate = true;
					setTimeout(() => {
						this.$api.login(this.param, res => {
							if (res.code) {
								this.$common.saveUserInfo(res.data);
								this.$refs['myMessage'].success(res.msg);
								this.loginSuccess();
							} else {
								this.$refs['myMessage'].err(res.msg);
							}
						}, () => {
							this.isRotate = false;
						});
					}, 1000);
				}
			},
		},
		onLoad() {
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
