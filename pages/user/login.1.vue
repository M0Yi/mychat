<template>
	<view>
		test
		<view class="bg-gradual-pink login-bg">
			<swiper disable-touch class="list_content" duration="500" :current="indexTab">
				<swiper-item>
					<view class="abs-bottom text-white" >
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
							<view class="inline-shrink" @tap="Toggle('index')">
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
				indexTab:0,
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
			Toggle(){
				console.log('test')
			}
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
		
	}

</style>
<template>