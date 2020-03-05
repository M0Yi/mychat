<template>
	<view >
		<view class="cu-load load-modal" v-if="show">
			<!-- <image :src="title?logo:''" mode="aspectFit"></image> -->
			<view class="gray-text">{{text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logo: this.$config.logo(),
				title: this.$config.title(),
				// 查询数据
				query: {
					category: '最新',
					sort: 'id',
					order: 'desc',
					offset: 0,
					limit: 10
				}
			}
		},
		methods: {
			ChangeLanguage(item){
				this.$i18n.locale = item;
				localStorage.setItem('locale', item);
			}
		},
		props: {
			//文本
			type: {
				type: [String],
				default: 'load',
			},
			//文本
			text: {
				type: [String],
				default: '请稍后...',
			},
			//显示
			show: {
				type: [Boolean, String],
				default: true,
			},
			//图片
			image: {
				type: [String],
				default: '',
			}
		}
	}
</script>

<style>
</style>
