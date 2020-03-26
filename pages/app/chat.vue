<template>
	<view class="moyi-bg-img">
		<cu-custom bgColor="bg-black" isAbs :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		
		
			
		<scroll-view 
		:style="'top:' + base.CustomBar + 'px'" 
		class="scroll-view"
		 scroll-y
		 :scroll-top="scrollTop" 
		 :scroll-with-animation="scrollAnimation" 
		 :scroll-into-view="scrollToView"
		
		 upper-threshold="50">
		  <!-- @scrolltoupper="loadHistory" -->
			<view class="cu-chat">
				<view class="bg-gray cu-info round text-center ">安全提示：如果聊天中涉及在转账及裸聊等请提高警惕，谨防诈骗，发现可疑请立即举报</view>
			</view>
			<view class="cu-chat" v-for="(item, index) in record" :key="index" :id="'msg' + item.id">
				<block v-if="item.type == 'tips'">
					<view class="cu-info round text-center">{{ item.value }}</view>
				</block>
				<block v-else>
					<view class="cu-item self" v-if="item.from == userInfo.id">

						<!-- 状态 -->
						<view v-if="item.state == 'Sending'" class="state anim-spin "><text class="cuIcon-loading text-gray text-xxl"></text></view>
						<view v-else-if="item.state == 'Fail'" class="state"><text class="cuIcon-infofill text-red text-xxl"></text></view>
						<!-- 状态 -->

						<!-- 内容 -->
						<view class="main">
							<!-- // Sending Finish Arrive Read Fail -->
							<image v-if="item.type == 'images'" :src="item.value" mode="widthFix"></image>
							<view v-else-if="item.type == 'voice'" class="content shadow"><text class="cuIcon-sound text-xxl padding-right-xl"></text></view>
							<view v-else class="content shadow text-value">
								<text>{{ item.value }}</text>
							</view>
						</view>
						<!-- 内容 -->
						<view class="cu-avatar radius" :style="'background-image:url(' + userInfo.avatar + '),url(' + base.avatar + ');'"></view>
					</view>

					<view class="cu-item" v-else>
						<view class="cu-avatar radius" :style="'background-image:url(' + chat.avatar + '),url(' + base.avatar + ');'"></view>
						<view class="main">
							<image v-if="item.type == 'images'" :src="item.value" mode="widthFix"></image>
							<view v-else-if="item.type == 'voice'" class="content shadow"><text class="cuIcon-sound text-xxl padding-right-xl"></text></view>
							<view v-else class="content shadow text-value">
								<text>{{ item.value }}</text>
							</view>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
		<view class="cu-bar input foot bg-black" :style="'background:url(../../static/bg-img.jpg) fixed;'">
			<view class="bg-black radius input-aera">
				<textarea 
				class="input-textarea solid-bottom" 
				:maxlength="-1" 
				v-model="inputText" 
				confirm-type="send"
				 auto-height></textarea>
			</view>
			<button class="cu-btn bg-green shadow-blur" @tap="sendBtn()">
				<text class="cuIcon-send">发送</text>
			</button>
		</view>

	</view>
</template>

<script src="pages/app/chat.js">
</script>

<style lang="less">
	.state{
		    margin-top: auto;
		    margin-bottom: auto;	
	}
	.scroll-view{
		position: absolute;
		top: 0;
		bottom: 96upx;
		// padding-bottom: 96rpx;
	}
	.my-bg-img {
		background-image: url(../../static/bg-img.jpg);
		background-attachment: fixed;
	}

	.cu-bar {
		position: fixed;
		width: 100%;
		z-index: 999;
	}

	.cu-item {
		padding: 30rpx 30rpx 10rpx !important;
	}

	.wh100 {
		width: 100%;
		height: 100vh;
		background-attachment: fixed;
	}

	.input-aera {
		margin-left: 20rpx;
		padding: 20rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		max-height: 300rpx;
	}

	.input-textarea {
		width: 500rpx;
		max-height: 260upx;
	}

	.bar-top {
		bottom: 10rpx;
		position: absolute;
		width: 750rpx;

		.bar-icon {
			width: 120rpx;
		}

		.bar-title {
			width: 510rpx;
		}

	}
</style>
