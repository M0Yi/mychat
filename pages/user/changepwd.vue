<template>
	<view class="moyi-bg-a">

		<cu-custom bgColor="bg-black" isAbs :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">修改密码</block>
		</cu-custom>

		<view :style="'padding-top:'+base.CustomBar+'px'" style="height:100vh" class="moyi-bg-a moyi-te-a">
			<view class="cu-form-group text-center grid col-1 ">
				<view class="align-center padding-tb" >
					<view class="cu-avatar round xxl" :style="'background-image:url(' + user.avatar + ');'">
						<image :src="user.frame" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">旧密码
				</view>
				<input class="text-right" type="password" placeholder="未设置留空即可" v-model="pwd.pwd"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">新密码
				</view>
				<input class="text-right" type="password" placeholder="(6至30位字符)" v-model="pwd.npwd"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">重复新密码
				</view>
				<input class="text-right" type="password" placeholder="重复新密码" v-model="pwd.cpwd"></input>
			</view>
		</view>
		<view class="bottom-card">
			<view class="cu-btn moyi-bg-c radius" @tap="subPwd()">
				<text class="padding-tb-sm">修改密码</text>
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
				switchC: '',
				// base: this.$common.baseInfo(),
				user: this.$common.userInfo(),
				pwd:{
					pwd:'',
					npwd:'',
					cpwd:''
				}
			};
		},
		onLoad() {},
		methods: {
			getCaptcha() {
				let _this = this
				//获取验证码
				if (!_this.$common.testString(_this.path.mobile,'mobile')){
					_this.$common.errorToShow('手机号码不正确')
				}else{
					_this.$api.sendSmsVerify(_this.path,
						res => {
							if (res.code) {
								_this.verifyTime = 60;
								_this.countDown(); // 执行验证码计时
								_this.$common.loadToHide();
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
			},
			reProfile() {
				this.profile = this.user
			},
			subProfile() {
				let profile = this.profile
				if (JSON.stringify(profile) == JSON.stringify(this.user)) {
					this.$common.errorToShow('未做修改无需保存')
				} else {
					this.$api.editProfile(profile, (res) => {
						if (res.code) {
							this.$common.errorToShow(res.msg)
							uni.$emit('refreshUser', profile);
							this.$db.set('userInfo', profile);
							// this.$common.saveUserInfo(profile)
							setTimeout(() => {
								uni.navigateBack({})
							}, 900);
						} else {
							this.$common.errorToShow(res.msg)
						}
					})
				}
			}
		}
	};
</script>

<style lang="less">
</style>
	