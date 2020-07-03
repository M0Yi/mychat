<template>
	<view class="moyi-bg-a">
		<cu-custom bgColor="bg-black" isAbs :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<preview :list="preview.list" :show="preview.show" :index="preview.index">
		</preview>
		
		<view class="cu-card case" :style="'padding-top:'+CustomBar+'px'">
			<view class="cu-item shadow bg-black">

				<scroll-view scroll-y scroll-with-animation :scroll-left="scrollLeft" class="cosmos-scroll-view">
					<view class="cu-list menu-avatar ">
						<view class="cu-item">
							<view @tap="userOpen()" class="cu-avatar round lg" :style="'background-image:url('+ cosmos.avatar +');'">
								<image :src="cosmos.frame" mode="widthFix"></image>
							</view>
							<view class="content flex-sub">
								<view class="text-grey">{{cosmos.nickname}}</view>
								<view class="text-gray text-sm flex justify-between">
									{{timeToDate(cosmos.createtime)}}
								</view>
							</view>
						</view>
						<view class="padding-lr">
							{{cosmos.text}}
						</view>
						<view :class="['grid','margin-lr-sm',cosmos.images_arr.length==1?'':'col-3 grid-square']" v-if="cosmos.images">
							<view @tap="previews(cosmos.images_arr,indexs)" class="margin-tb-sm cosmos-image-item" v-for="(items, indexs) in cosmos.images_arr"
							 :key="indexs">
								<image lazy-load class="cosmos-image-item-image" :src="items" mode="aspectFill"></image>
							</view>
							<!-- {{item.images}} -->
						</view>
						<view class="padding-lr padding-tb-sm grid col-3 border-bottom">
							<view class="text-center">
								<text class="cuIcon-attention margin-right-sm"></text>
								{{cosmos.views}}
							</view>
							<view class="text-center" @tap="openInput()">
								<text class="cuIcon-comment margin-right-sm"></text>
								{{cosmos.reviews>0?cosmos.reviews:''}}
							</view>
							<view class="text-center" @tap="like()">
								<text class="margin-right-sm" :class="isLike?'cuIcon-likefill text-red':'cuIcon-like'">
								</text>
								{{cosmos.likes>0?cosmos.likes:''}}
							</view>
						</view>
						<view v-if="loadShow">
							<view class="cu-load loading"></view>
						</view>
						<view class="margin-tb-ss" v-else>
							<view class="comment" v-for="(item, index) in review" :key="index">
								<view @tap="userOpen(index)" class="cu-avatar round" :style="'background-image:url('+ item.avatar +');'">
									<image :src="item.frame" mode="aspectFill" style="height:64upx;"/>
								</view>
								<view class="content padding-right">
									<view class="text-grey">{{index}}{{item.nickname}}</view>
									<view class="text-gray text-content text-df">
										<text class="text-grey" v-if="item.reply_id">回复 {{item.reply_nickname}}：</text> {{item.text}}
									</view>
									<view class="flex text-sm">
										<view class="text-gray ">{{timeToDate(item.createtime)}}</view>
										<view class="margin-lr-sm" @tap="reply(index)">回复</view>
									</view>
								</view>
							</view>
							<view class="text-center margin-top-sm" v-if="review.length==0">
								暂无评论
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="bg-black cu-bar foot input " :class="inputShow?'':'none'" :style="[{bottom:InputBottom+'px'}]">
			<view class="cu-avatar round" :style="'background-image:url('+userInfo.avatar+');'"></view>
			<input :placeholder="inputPlaceholder" class="padding-lr-sm bg-black " :adjust-position="false"
			 maxlength="300" cursor-spacing="10" confirm-type="send" v-model="inputText" @confirm="sendMsg()" :focus="inputShow"
			 @focus="InputFocus" @blur="InputBlur"></input>
			<button class="cu-btn bg-black shadow" @tap="sendMsg()">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollLeft: 0,
				CustomBar: this.CustomBar,
				loadShow: true,
				inputText: '',
				isLike:0,
				inputShow: false,
				reply_id: 0,
				reply_user_id:0,
				inputPlaceholder: '写下你评论吧',
				title: '详情',
				InputBottom: 0,
				userInfo: this.$common.userInfo(),
				review: [],
				preview: {
					list: [
						"https://image.aishencn.com/2020/03/17/095817937_81909778-bbs.jpg",
					],
					show: false,
					index: 0,
				},
				cosmos: {
					id: 342,
					user_id: 1430,
					flag: "",
					secret: "",
					place: "其他",
					views: 28,
					likes: 0,
					reviews: 0,
					shares: 0,
					text: "想劫持一颗星星✨ 在月色朦胧的夜晚降落到你的梦里劫持一颗星星✨ 在月色朦胧的夜晚降落到你的梦里劫持一颗星星✨ 在月色朦胧的夜晚降落到你的梦里.🌃想劫持一颗星星✨ 在月色朦胧的夜晚降落到你的梦里.🌃想劫持一颗星星✨ 在月色朦胧的夜晚降落到你的梦里.🌃",
					images: "https://image.aishencn.com/2020/03/19/120149179_10784128-bbs.jpg",
					weigh: 0,
					collect: 1,
					third_id: 50027332,
					createtime: 1584590513,
					updatetime: 1584590541,
					deletetime: null,
					status: "normal",
					nickname: "半甜",
					gender: 0,
					isLike:0,
					avatar: "https://image.aishencn.com/2020/03/18/164612564_10784128-user.jpg",
					frame: null,
					images_arr: [
						"https://image.aishencn.com/2020/03/19/120149179_10784128-bbs.jpg",
						"https://image.aishencn.com/2020/03/19/120149179_10784128-bbs.jpg",
						"https://image.aishencn.com/2020/03/19/120149179_10784128-bbs.jpg"
					]
				}
			}
		},
		methods: {
			userOpen(index=null){
				if(index == null){
					this.$db.set('user',this.cosmos)
				}else{
					console.log('this.review',this.review);
					console.log('this.review',this.review[index]);
					this.$db.set('user',this.review[index])
				}
				uni.navigateTo({
					url:'../user/index'
				})
			},
			previews(list, index) {
				this.preview.index = index;
				this.preview.list = list;
				this.preview.show = !this.preview.show;
			},
			like(){
				this.$api.cosmosLike({
					pid:this.cosmos.id
				},(res)=>{
					if(res.code){
						this.isLike= res.data
						if(res.data){
							this.cosmos.likes++; 
						}else{
							this.cosmos.likes--; 
						}
					}
				})
			},
			reply(index) {
				this.inputShow = true;
				this.reply_id = this.review[index].id
				this.reply_user_id = this.review[index].user_id
				this.inputPlaceholder = '回复' + this.review[index].nickname
			},
			openInput() {
				console.log('openInput')
				this.inputShow = true;
				this.reply_id = 0
				this.reply_user_id = 0
				this.inputPlaceholder = '写下你评论吧'
			},
			InputFocus(e) {
				console.log('')
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				setTimeout(()=>{
					this.inputShow = false
				}, 100);
				this.InputBottom = 0
			},
			sendMsg() {
				this.$api.addReview({
					pid:this.cosmos.id,
					reply_id: this.reply_id,
					reply_user_id: this.reply_user_id,
					text:this.inputText
				},(res)=>{
					if (res.code) {
						this.review = [...res.data]
						this.cosmos.reviews++;
						this.inputText = ''
						if(res.msg){
							this.$common.errorToShow(res.msg);
						}
					}else{
						this.$common.errorToShow(res.msg);
					}
				})
			},
			timeToDate(time) {
				if (time < 9999999999) {
					time = time * 1000;
				}
				let timeDate = new Date(time);
				return (timeDate.getYear() + 1900) + '年' + (timeDate.getMonth() + 1) + '月' + timeDate.getDate() + '日';
			}
		},
		onLoad(e) {
			this.loadShow = true;
			let cosmos = this.$db.get('cosmos');
			this.cosmos = cosmos
			this.isLike = cosmos.isLike
			this.$api.getReviewList({
				id: this.cosmos.id
			}, (res) => {
				if (res.code) {
					this.review =res.data
					console.log('res.data',res.data)
					// this.review = []
				}
			},()=>{
				this.loadShow = false;
			});
		}
	}
</script>

<style lang="less">
	.border-bottom {
		border-bottom: 1px solid #303030;
	}

	.cu-card {


		height: 100vh;
		// 不知哪儿来的动画属性将卡片隐藏强制不让隐藏
		transform: scale(1) !important;
	}

	.none {
		display: none;
	}

	.comment {
		margin-bottom: 20rpx;
		display: flex;

		.cu-avatar {
			width: 10%;
			margin: 0 20rpx;
		}

		.content {
			width: 90%;
		}
	}

	.input {
		background-color: #222;
	}

	.cosmos-scroll-view {
		height: 90vh;
	}

	.my-screen-swiper {
		bottom: 0;
		width: 100%;
		height: 100rpx;
		position: fixed;
		left: 0;
		white-space: nowrap;
		box-sizing: border-box;
		overflow: hidden;
		line-height: 100rpx;
		z-index: 999;
	}
</style>
