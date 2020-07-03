<template>
	<view class="moyi-bg-img">
		<cu-custom class="moyi-te-a" :bgColor="showTitle?'moyi-bg-b':''" isAbs :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">
				<view v-if="showTitle">
					<view  class="cu-avatar round sm " :style="'background-image:url('+ user.avatar +');'">
						<image :src="user.frame" mode="widthFix"></image>
					</view>
					<text class="margin-left-ss">{{user.nickname}}</text>
					
				</view>
			</block>
		</cu-custom>
		
		<moreModal :show="moreData.show" :type='moreData.type' :pid="moreData.id"></moreModal>
		<previewModal :list="preview.list" :show="preview.show" :index="preview.index"> </previewModal>
		
		
		
		<view class="moyi-fix-b  moyi-bg-c text-center">
			<view @tap="openChat()" class=" text-center padding-sm margin-xs">
				<text class="cuIcon-mark margin-right-sm"></text>
				私聊
			</view>
		</view>
		<view id="top-title"></view>
		<scroll-view scroll-y scroll-with-animation :scroll-left="scrollLeft" 
		 @touchmove="isTopTitle"
		 @touchend="isTopTitle"
		 @touchstart="isTopTitle"
		  class="cosmos-scroll-view moyi-bg-b">
		 
		 <view id="user-info" class="moyi-bg-b padding-bottom text-center moyi-te-a" :style="'padding-top:'+(CustomBar+20)+'px'">
		 	<view @tap="previews(user.avatar)"  class="cu-avatar round xxl" :style="'background-image:url('+ user.avatar +');'">
		 		<image :src="user.frame" mode="widthFix"></image>
		 	</view>
		 	<view class="margin-top">
		 		<text class="text-xl">{{user.nickname}}</text>
		 		<text :class="['text-bold','margin-tb-auto','margin-left-ss',user.gender==0?'text-pink  cuIcon-female':'text-blue  cuIcon-male']"></text>
		 	</view>
			<view class="text-sm">
				{{user.bio}}
			</view>
		 </view>
			<view class="cu-list menu-avatar moyi-bg-a" style="min-height: 100vh;padding-bottom: 120rpx;">
				<view v-if="loadShow">
					<view class="cu-load loading"></view>
				</view>
				<view v-else>
					<view @tap="cosmosOpen(index)" class="cosmos-chat text-grey" v-for="(item, index) in cosmosList" :key="index">
						<view class="cu-item cosmos-text margin-bottom-sm margin-top">
							{{item.text}}
						</view>
						<view class="padding-lr-xls" @tap.stop="">
							<view :class="['grid','margin-auto',item.images_arr.length==1?'':'col-3 grid-square']" v-if="item.images">
								<view @tap="previews(item.images_arr,indexs)" class="margin-tb-sm cosmos-image-item" v-for="(items, indexs) in item.images_arr"
								 :key="indexs">
									<image lazy-load class="cosmos-image-item-image" :src="items" mode="aspectFill"></image>
								</view>
							</view>	
						</view>
						<view class="cu-item padding-lr-xls grid col-2 margin-bottom-sm">
							<view class="text-grey ">{{ $common.timeToDate(item.createtime) }}</view>
							<view class="text-right">
								<text class="cuIcon-location text-xl "></text>
								<text>{{item.place}}</text>
							</view>
						</view>
						
						<view class="padding-lr-xls grid col-4 text-center">
							<view >
								<text class="cuIcon-attention text-xl"></text>
								<text class="margin-left-ss">{{item.views>0?item.views:''}}</text>
								
							</view>
							<view >
								<text class="cuIcon-comment text-xl"></text>
								<text class="margin-left-ss">{{item.reviews>0?item.reviews:''}}</text>
								
							</view>
							<view @tap.stop="" @tap="like(index)">
								<text :class="item.isLike?'cuIcon-likefill text-red':'cuIcon-like'">
								</text>
								<text class="margin-left-ss">{{item.likes>0?item.likes:''}}</text>
								
							</view>
							<view @tap.stop="">
								<text class="cuIcon-more text-xl" @tap="cosmosMoreOperate(index)"></text>
							</view>
						</view>
						<view class="cosmos-border">
						</view>
					</view>
					<view class="text-center margin-top-sm" v-if="cosmosList.length==0">
						暂无动态
					</view>
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				moreData: {
					show: false,
					type: 'cosmos',
					id: 0,
				},
				showTitle:false,
				modalName:'',
				scrollLeft: 0,
				CustomBar: this.CustomBar,
				loadShow: true,
				inputText: '',
				isLike:0,
				inputShow: false,
				reply_id: 0,
				reply_user_id:0,
				inputPlaceholder: '写下你评论吧',
				title: '此刻',
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
				cosmosList:[
					
				],
				user: {
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
			isTopTitle(e){
				const query = uni.createSelectorQuery().in(this);					
				query.select('#user-info').boundingClientRect(data => {
					if(data.top < -150){
						this.showTitle = true;
					}else{
						this.showTitle = false;
					}
				}).exec();
			},
			
			hideModal() {
				this.modalName = null
			},
			like(index){
				this.$api.cosmosLike({
					pid:this.cosmosList[index].id
				},(res)=>{
					if(res.code){
						this.cosmosList[index].isLike= res.data
						if(res.data){
							this.cosmosList[index].likes++; 
						}else{
							this.cosmosList[index].likes--; 
						}
					}
				})
			},
			cosmosOpen(index){
				this.$db.set('cosmos',this.cosmosList[index])			
				uni.navigateTo({
					url:'/pages/app/cosmos/index',
				})
			},
			// 打开对话
			openChat() {
				let user = this.user
				if(user.user_id){
					user.id = user.user_id
				}
				this.$db.set('chat',this.user)
				this.$db.set('uid_' + this.user.user_id, this.user);
				uni.navigateTo({
					url:'/pages/chat/index',
				})
				this.$common.readNewMessageList(this.user.user_id);
			},
			// 宇宙操作
			feedback(){
				this.$common.errorToShow('反馈id:'+ this.operate.id);
				return
				uni.navigateTo({
					url:'/pages/app/feedback?id=' + this.operate.id,
				})
			},
			cosmosMoreOperate(index) {
				this.operate = this.cosmosList[index];
				this.modalName = 'cosmosMore'
			},
			
			previews(list, index = 0) {
				let type = (typeof list)
				if(type == 'string' || type == 'String'){
					list = [list]
				}
				this.preview.index = index;
				this.preview.list = list;
				this.preview.show = !this.preview.show;
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
						this.review = res.data
						this.cosmos.reviews++;
						this.inputText = ''
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
			let user = this.$db.get('user');
			console.log('onLoad,user',user);
			this.user = user
			this.title = user.nickname + '的主页'
			// this.isLike = cosmos.isLike
			this.$api.getCosmosUserList({
				user: this.user.user_id
			}, (res) => {
				if (res.code) {
					this.cosmosList = res.data
				}
			},()=>{
				this.loadShow = false;
			});
		}
	}
</script>

<style lang="less">
	.cosmos-chat{
		
	}
	.cosmos-image-item-image {
		width:600rpx;
	}
	.border-rigth{
		border-right:1rpx #303030 solid ;
	}
	.info-card{
		height: 80vh;
		// margin-top: 90rpx;
		// height: 120rpx;
	}
	.bottom-card{
		width: 750rpx;
		height: auto !important;
		bottom: 0;
		position: absolute;
		z-index: 1;
		.cu-item{
			border-top: 1rpx #303030 solid;
			margin-bottom: 0;
			border-radius: 0;
			height: 100rpx;
		}
	}
	.top-card{
		    height: auto !important;
			top: -90rpx;
			left: 20rpx;
		    position: absolute;
		    z-index: 1;
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
		
		// padding-bottom: 180rpx;
		// height: 100vh;
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
