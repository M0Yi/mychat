<template>
	<view>
		<view 
		class="my-form round " 
		:class="formClass" 
		:style="'height:'+ height +'rpx'">
			<text 
			class="margin-left" 
			:class="icon" 
			v-if="icon" 
			:style="'font-size:' + height * 0.3 +'rpx;'"></text>
			<input class="margin" 
			:maxlength="maxlength" 
			:password="pass&&showPassword" 
			:type="type" 
			:placeholder="placeholder" 
			:style="'height:'+ height * 0.8 +'rpx;font-size:' + height * 0.3 +'rpx;'"
			 @input="onInput"></input>
			<text 
			v-if="pass" 
			class="margin"
			
			@tap="switchPass" 
			:class="showPassword?'cuIcon-attentionforbidfill' : 'cuIcon-attention'"></text>
			<view 
			v-if="countdown" 
			:class="countdownClass" 
			@tap="countdownClick"
			:style="'font-size:' + height * 0.3 +'rpx;'"
			>{{countdownState?countdownTexts:countdownText}}
			</view>
		</view>
	</view>
</template>

<script>
	var countDown;
	export default {
		data() {
			return {
				showPassword: true, //是否显示明文
				timer: 60, //时间
				countdownState: false, //倒计时状态
				countdownTexts:'test'
			}
		},
		props: {
			//图标
			icon: {
				type: [String],
				default: '',
			},
			//提示框
			placeholder: {
				type: [String],
				default: ''
			},
			//是否为密码
			pass: {
				type: [Boolean],
				default: false,
			},
			//类型
			type: {
				type: [String],
				default: 'text'
			},
			//高度 rpx
			height: {
				type: [Number, String],
				default: 80,
			},
			//最大长度
			maxlength: {
				type: [Number,String],
				default: 20,
			},
			//倒计时
			countdown: {
				type: [Boolean],
				default: false,
			},
			//计时时间
			countdownTime: {
				type: [Number, String],
				default: 60,
			},
			//按钮文字
			countdownText: {
				type: [String],
				default: '获取验证码',
			},
			//按钮结束文字
			countdownEndText: {
				type: [String],
				default: '{$time}秒后重试',
			},
			//主样式
			formClass: {
				type: [String],
				default: 'bg-white text-geay shadow-warp'
			},
			//倒计时主样式
			countdownClass: {
				type: [String],
				default: 'margin-right-sm'
			},
			value: String, //值
		},
		model: {
			prop: 'value',
			event: 'input'
		},
		mounted() {
			//挂载
			this.$on('runCountdown', (val) => {
				this.runCountdown(val);
			});
			clearInterval(countDown); //先清理一次循环，避免缓存
		},
		created() {
			this.countdownTexts = this.countdownEndText.replace("{$time}", this.countdownTime);
		},
		methods: {
			//切换密码
			switchPass() {
				this.showPassword = !this.showPassword
			},
			//点击计时器
			countdownClick() {
				if (this.countdownState) {
					console.log('已开始')
					return false;
				}
				this.$emit('countdownClick')
			},
			//运行计时器
			runCountdown(val) {
				//开始倒计时
				if (String(val) == "0") {
					//判断是否需要终止循环
					this.timer = 0; //初始倒计时
					clearInterval(countDown); //清理循环
					this.countdownState = false; //关闭循环状态
					return false;
				}
				//判断是否开始倒计时，避免重复点击
				if (this.countdownState) {
					return false;
				}
				this.countdownState = true
				this.timer = this.countdownTime //倒数秒数
				countDown = setInterval(() => {
					this.timer--
					// str.replace(//g，"新字符串")
					this.countdownTexts = this.countdownEndText.replace("{$time}", this.timer);
					if (this.timer == 0) {
						this.countdownState = false
						clearInterval(countDown)
					}
				}, 1000)
			},
			//设置获取验证码的
			countdownRun() {
				this.$emit('setCode')
			},
			//传出值
			onInput(e) {
				this.$emit('input', e.target.value)
			}
		}
	}
</script>

<style>
	.my-form {
		line-height: 64rpx;
		flex: 1;
		display: flex;
		align-items: center;
		margin: 0 30rpx;
	}

	.my-form input {
		flex: 1;
		line-height: 64rpx;
		font-size: 26rpx;
	}
</style>
