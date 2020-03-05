<template>
	
	<view>
		<scroll-view
			class="cu-chat"
			scroll-y="true"

			:scroll-into-view="scrollToView"

		>
		
		<view class="cu-load bg-green" :class="true ? 'loading' : 'over'"></view>
		
			<view v-for="(item, index) in chat.record" :key="index" :id="'msg_' + item.id">
				<!-- <view v-if="item.type == 'text'"> -->
				<!-- <view class="text-center margin-top text-grey">test</view>   self -->
				<view class="cu-item" v-if="item.from == userInfo.id">
					<!-- <view
							v-if="item.from != userInfo.id"
							class="cu-avatar radius"
							:style="'background-image:url(' + (item.from == userInfo.id ? userInfo.avatar : chat.avatar) + ');'"
						></view> -->
					<view class="main">
						<!-- // Sending Finish Arrive Read Fail -->
						<view class="action" v-if="item.state != 'Finish'">
							<text v-if="item.state != 'Sending'" class="cuIcon-loading text-orange text-xxl anim-spin" style="height: 14px;"></text>
							<text v-if="item.state != 'Fail'" class="cuIcon-infofill text-red text-xxl"></text>
							<!-- <text class="cuIcon-infofill text-red text-xxl"></text> -->
						</view>
						<view class="content shadow">
							<text>{{ item.value }}</text>
						</view>
					</view>
		
					<!-- <view
							class="cu-avatar radius"
							:style="'background-image:url(' + (item.from == userInfo.id ? userInfo.avatar : chat.avatar) + ');'"
						></view> -->
					<view class="cu-avatar radius" :style="'background-image:url(' + chat.avatar + ');'"></view>
					<view class="date ">{{ item.time }}</view>
				</view>
				<!-- </view> -->
			</view>
		</scroll-view>
	</view>
</template>

<script>
</script>

<style>
</style>
