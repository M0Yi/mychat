<template>
	<view :style="{zIndex: zIndex}" class="container">
		<block v-for="message in messageQueue" :key="message.id">
			<view :class="[message.animation, backgroundClass(message)]" class="message">
				<text v-if="message.type === 'info'" class="bm-icon info">&#xe671;</text>
				<text v-if="message.type === 'success'" class="bm-icon success">&#xe62f;</text>
				<text v-if="message.type === 'warn'" class="bm-icon warn">&#xe671;</text>
				<text v-if="message.type === 'error'" class="bm-icon error">&#xe630;</text>
				<text>{{message.content}}</text>
			</view>
		</block>
	</view>
</template>

<script>
	// 需要支持的单独配置项：显示时长、是否启用背景、类型、内容
	export default {
		name: 'bobo-message-cpt',
		props: {
			zIndex: {
				type: Number,
				default: 10000
			},
			duration: {
				type: Number,
				default: 2000
			},
			background: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				messageQueue: [],
				lastId: 0
			}
		},
		computed: {
			backgroundClass() {
				return msg => {
					return this.background || msg.background ? `background-${msg.type}` : ''
				}
			}
		},
		methods: {
			/**
			 * 展示普通提示信息
			 * @param {Object} content
			 */
			info(arg) {
				const message = {
					type: 'info'
				}
				if (typeof arg === 'object' && arg) {
					message.content = arg.content
					message.duration = arg.duration
					message.background = arg.background
				} else if(typeof arg === 'string') {
					message.content = arg
				}
				this.fadeIn(message)
			},
			/**
			 * 展示成功提示
			 * @param {Object} content
			 */
			success(arg) {
				const message = {
					type: 'success'
				}
				if (typeof arg === 'object' && arg) {
					message.content = arg.content
					// 显示时长会用在 settimeout的参数中，必须保证类型正确
					if (arg.duration && typeof arg.duration === 'number' && arg.duration >= 0) {
						message.duration = arg.duration
					}
					message.background = arg.background
				} else if(typeof arg === 'string') {
					message.content = arg
				}
				this.fadeIn(message)
			},
			/**
			 * 展示警告提示
			 */
			warn(arg) {
				const message = {
					type: 'warn'
				}
				if (typeof arg === 'object' && arg) {
					message.content = arg.content
					if (arg.duration && typeof arg.duration === 'number' && arg.duration >= 0) {
						message.duration = arg.duration
					}
					message.background = arg.background
				} else if(typeof arg === 'string') {
					message.content = arg
				}
				this.fadeIn(message)
			},
			/**
			 * 展示错误提示
			 * @param {Object} message
			 */
			error(arg) {
				const message = {
					type: 'error'
				}
				if (typeof arg === 'object' && arg) {
					message.content = arg.content
					if (arg.duration && typeof arg.duration === 'number' && arg.duration >= 0) {
						message.duration = arg.duration
					}
					message.background = arg.background
				} else if(typeof arg === 'string') {
					message.content = arg
				}
				this.fadeIn(message)
			},
			fadeIn(message) {
				message.id = this.generateId()
				message.animation = 'fadeIn'
				this.messageQueue.push(message)
				// 动画执行完毕后取消动画效果，防止列表刷新时重新执行动画
				setTimeout(() => {
					message.animation = ''
				}, 410)
				// 显示一段时间后隐藏
				setTimeout(() => {
					this.fadeOut(message)
				}, message.duration || this.duration)
			},
			fadeOut(message) {
				message.animation = 'fadeOut'
				setTimeout(() => {
					let idx = 0
					this.messageQueue.some((msg, index) => {
						if (msg.id === message.id) {
							idx = index
							return true
						}
					})
					this.messageQueue.splice(idx, 1)
				}, 500)
			},
			generateId() {
				return (new Date()).getTime() * 1000 + (this.lastId++) % 1000
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	@font-face {
	  font-family: 'bobo-message-iconfont';  /* project id 1477381 */
	  src: url('https://at.alicdn.com/t/font_1477381_i3ji49ios6.eot');
	  src: url('https://at.alicdn.com/t/font_1477381_i3ji49ios6.eot?#iefix') format('embedded-opentype'),
	  url('https://at.alicdn.com/t/font_1477381_i3ji49ios6.woff2') format('woff2'),
	  url('https://at.alicdn.com/t/font_1477381_i3ji49ios6.woff') format('woff'),
	  url('https://at.alicdn.com/t/font_1477381_i3ji49ios6.ttf') format('truetype'),
	  url('https://at.alicdn.com/t/font_1477381_i3ji49ios6.svg#iconfont') format('svg');
	}

	.container {
		left: 0;
		right: 0;
		top: calc(var(--status-bar-height) + 24px);
		min-width: 10rpx;
		max-width: 550rpx;
		position: fixed;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		// 透明层允许点击穿透
		pointer-events: none;

		.message {
			display: flex;
			// 内容区域禁止点击穿透
			pointer-events: all;
			align-items: center;
			padding: 8px 16px;
			border-radius: 4px;
			margin-top: 5px;
			box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
			background: #fff;
			min-height: 37px;
			transition: all .5s;
			box-sizing: border-box;

			.bm-icon {
				font-family: bobo-message-iconfont;
				margin-right: 10rpx;
			}

			.info {
				color: #288ced;
			}

			.success {
				color: #09be70;
			}

			.warn {
				color: #ff991f;
			}

			.error {
				color: #ef4017;
			}
		}

		.background-info {
			border: 2px solid #d4eefe;
			background: #f0faff;
			color: #288ced;
			box-shadow: none !important;
		}

		.background-success {
			border: 2px solid #baf2d1;
			background: #edfff4;
			color: #09be70;
			box-shadow: none !important;
		}

		.background-warn {
			border: 2px solid #ffe7a7;
			background: #fff9e7;
			color: #ff991f;
			box-shadow: none !important;
		}

		.background-error {
			border: 2px solid #ffcfb9;
			background: #ffefe6;
			color: #ef4017;
			box-shadow: none !important;
		}

		.fadeIn {
			animation: fadeIn 0.4s both;
		}

		@keyframes fadeIn {
			from {
				opacity: 0;
				transform: translate(0, -30px);
			}

			to {
				opacity: 1;
				transform: translate(0, 0);
			}
		}

		.fadeOut {
			animation: fadeOut 0.4s forwards;
		}

		@keyframes fadeOut {
			from {
				opacity: 1;
				transform: translate(0, 0);
			}

			to {
				opacity: 0;
				margin-top: -37px;
			}
		}
	}
</style>
