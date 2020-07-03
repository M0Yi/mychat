<template>
	<view :class="['cu-modal',show!=sw?'show':'']">
		<swiper @tap="hide()" class="cu-preview" @change="changeSwiper" :current="index" circular duration="500">
			<swiper-item class="cu-preview-item" v-for="(src, index) in list" :key="index">
				<view class="cu-preview-img" :style="{ backgroundImage: 'url('+ src +')'}">
					<image class="cu-preview-image" :src="src" show-menu-by-longpress></image>
					
				</view>
			</swiper-item>
		</swiper>
		<view class="cu-preview-tips" v-if="list.length>1">{{ currentIndex != -1 ?Number(currentIndex) + 1:index + 1 }} / {{ list.length }}</view>
		<view class="cu-preview-bottom">
			<view class="cu-btn line-white round" @tap="saveFile()"> 保存 </view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: [Boolean],
				default: true,
			},
			list: {
				type: Array,
				default: []
			},
			index: {
				type: Number,
				default: 0
			}
		},

		data() {
			return {
				sw: false,
				indicatorDots: false,
				autoplay: false,
				duration: 500,
				circular: true,
				currentIndex: -1,
			};
		},
		mounted() {},
		methods: {

			saveFile() {
				let index = this.currentIndex != -1 ? this.currentIndex : this.index;
				console.log('尝试保存', this.list[index])
				// #ifdef H5
				uni.downloadFile({
					url: this.list[index],
					success: (res) => {
						if (res.statusCode === 200) {
							let name = this.list[index];
							name = name.substring(name.lastIndexOf('\/') + 1);
							var linkElement = document.createElement('a')
							linkElement.setAttribute('href', res.tempFilePath)
							linkElement.setAttribute('downLoad', name)
							linkElement.click()

						}
					}
				});
				// #endif

				// #ifndef H5
				console.log('尝试saveImageToPhotosAlbum保存')
				uni.downloadFile({
					url: this.list[index],
					success: (res) => {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								console.log('save success');
								uni.showToast({
									title: '图片保存成功',
									icon: 'none',
									duration: 1200
								});
							}
						});
					}
				})

				// #endif
			},
			hide() {
				this.currentIndex = -1;
				this.sw = !this.sw;
			},
			changeSwiper(e) {
				console.log(this.currentIndex, this.index)
				this.currentIndex = e.target.current;
			},
		}
	}
</script>

<style lang="less">
	.cu-modal {
		.cu-preview {
			position: relative;
			display: inline-block;
			vertical-align: middle;
			width: 100%;
			max-width: 100%;
			height: 100%;

			.cu-preview-item {
				.cu-preview-image{
					height: 100%;
					width: 100%;
					opacity: 0;
				}
				.cu-preview-img {
					background-size: 100% auto;
					background-repeat: no-repeat;
					background-position: center;
					width: 100%;
					height: 100%;
				}
			}
		}

		.cu-preview-bottom {
			position: absolute;
			color: #fff;
			bottom: 80rpx;
			text-align: center;
			width: 100%;

			.cu-btn {
				background-origin: 200;
				background-color: rgba(80, 80, 80, 0.5);
			}
		}

		.cu-preview-tips {
			position: absolute;
			color: #fff;
			bottom: 160rpx;
			text-align: center;
			width: 100%;
		}
	}
</style>
