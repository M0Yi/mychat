<template>
	<view class="moyi-bg-a">

		<cu-custom bgColor="bg-black" isAbs :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">个人资料</block>
		</cu-custom>

		<view :style="'padding-top:'+base.CustomBar+'px'" style="height:100vh" class="moyi-bg-a moyi-te-a">
			<view class="cu-form-group text-center grid col-1 ">
				<view class="align-center padding-tb" @tap="uploadAvatar()">
					<view class="cu-avatar round xxl" :style="'background-image:url(' + profile.avatar + ');'">
						<image :src="profile.frame" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">用户昵称
					<!-- <text class="text-red">*</text> -->
				</view>
				<input class="text-right" placeholder="请输入昵称" v-model="profile.nickname"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">个人介绍</view>
				<input class="text-right" placeholder="一句话介绍一下你自己" v-model="profile.bio"></input>
			</view>
		</view>
		<view class="bottom-card">
			<view class="cu-btn moyi-bg-c radius" @tap="subProfile()">
				<text class="padding-tb-sm">保存资料</text>
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
				profile: this.$common.userInfo()
			};
		},
		onLoad() {},
		methods: {
			DateChange(e) {
				this.profile.birthday = e.detail.value
			},
			genderSwitch(e) {
				this.profile.gender = e.detail.value ? 1 : 0
			},
			uploadAvatar() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (res.errMsg == 'chooseImage:ok') {
							this.$api.uploadFile(res['tempFilePaths'][0], (res) => {
								if (res.code == 1) {
									this.profile.avatar = this.$config.cdnUrl + res.data.url;
								} else {
									this.$common.errorToShow(res.msg)
								}
							}, (error) => {
								this.$common.errorToShow(error.response)
							})
						}
					}
				});

				// this.$common.uploadImage({}, (res) => {
				// 	this.profile.avatar = res
				// })
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
