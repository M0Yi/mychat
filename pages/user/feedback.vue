<template>
	<view class="moyi-bg-a">
		
		<cu-custom bgColor="bg-black" isAbs :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">反馈意见</block>
		</cu-custom>
		
		<view class="cu-card case" :style="'padding-top:'+CustomBar+'px'">
			<view class="cu-item shadow bg-black padding-bottom-sm">
				<view class="cu-form-group bg-black my-textarea">
					<textarea maxlength="500" @input="textareaAInput" placeholder="写下您反馈或者建议吧"></textarea>
				</view>
				<view class="grid col-4 grid-square flex-sub padding-lr-sm">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<imgCount">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="cu-item shadow bg-black ">
				<view class="cu-form-group bg-black">
					<input placeholder="请输入您的联系方式" v-model="formData.contact" />
				</view>
			</view>
		</view>

		<view class="bottom-card">
			<view class="cu-btn bg-black radius" @tap="startPush()">
				<text class="padding-tb-sm">发送</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				textareaAValue: '',
				imgList: [],
				imgCount: 9,
				formData: {
					images: '',
					contact: '',
					text: '',
				}
			}
		},
		methods: {
			startPush() {
				let imgList = this.imgList;
				let images = '';
				let cdn = this.$config.cdnUrl;
				let total = 0;
				if (!this.textareaAValue && !imgList.length) {
					this.$common.errorToShow('无须多言？');
					return
				}
				uni.showLoading({
					title:this.loadTitle
				})
				if (imgList.length) {
					for (var i = 0; i < imgList.length; i++) {
						// console.log('外i'+i);
						this.$api.uploadFile(imgList[i], (res) => {
							console.log('内total' + total);
							if (res.code == 1) {
								if (total) images = images + ',';
								images = images + cdn + res.data.url
								total++;
								this.loadTitle = '正在上传'+ total;
								if (total == imgList.length) {
									this.formData.images = images;
									this.sendPush();
								}
							} else {
								this.errorPush(res.msg)
							}
						}, (error) => {
							this.errorPush(error.response)
						})
					}
				} else {
					this.sendPush();
				}
			},
			sendPush() {
				this.formData.text = this.textareaAValue
				this.$api.feedbackPush(this.formData, (res) => {
					this.$common.errorToShow(res.msg)
					if (res.code) {
						setTimeout(() => {
							uni.navigateBack({})
						}, 2000);
					}
				})
			},
			errorPush(msg) {
				this.$common.errorToShow(msg);
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			ChooseImage() {
				// this.copns
				uni.chooseImage({
					count: this.imgCount,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				this.imgList.splice(e.currentTarget.dataset.index, 1)
			},

		},
		onLoad(e) {

		}
	}
</script>


<style lang="less">
	.cu-card {
		height: 100vh;
	}

	.my-textarea {
		min-height: 4.6em;
		max-height: 9.2em;
	}

</style>
