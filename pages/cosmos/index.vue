<template>
	<view class="moyi-bg-a">
		<moreModal :show="moreData.show" :type='moreData.type' :pid="moreData.id"></moreModal>
		<previewModal :list="preview.list" :show="preview.show" :index="preview.index"> </previewModal>
		
		<!-- 置顶按钮 -->
		<view class="moyi-abs-br-btn text-center round moyi-bg-c" @tap="puls()">
			<text class=" text-xl moyi-te-c">╋</text>
		</view>
		
		<view class="moyi-top-bar moyi-bg-b" :style="'height:'+base.CustomBar+'px'" >
			<view style="position: absolute; bottom: 10rpx; " class=" moyi-te-b t">
				<text class="margin-left text-xl">最新</text>
				<text class="margin-left  moyi-te-a" @tap="$common.errorToShow('点击了推荐userOpenuserOpen')">推荐</text>
			</view>
		</view>

 
		<scroll-view 
		class="scroll-view moyi-bg-a"
		 @touchstart="cosmosMod.touchstart" @touchmove="cosmosMod.touchmove"
		 :change:prop="cosmosMod.end" :prop="cosmos.propValue" @touchend="cosmosMod.touchend" :data-top="cosmos.scrollTop" id="cosmos-refresh-container"
		 scroll-y upper-threshold="50">
			<view id="load-text" :style="'height:'+base.CustomBar+'px'" class="load-text anim-text-lePeek text-center text-gray">
				<text class="anim-text" v-for="(item, index) in base.title" :key="index" :style="'animation-delay:'+ (200+index*100) +'ms;'">{{item}}</text>
			</view>
			
			<view @tap="cosmosOpen(index)" class="cosmos-chat text-grey" v-for="(item, index) in cosmosList" :key="index">
				<view class="flex margin-tb padding-lr-xls">
					<view @tap.stop="" @tap="userOpen(index)" class="cu-avatar round lg" :style="'background-image:url(' + item.avatar + ');'">
						<image :src="item.frame" mode="widthFix"></image>
					</view>
					<view class="margin-auto padding-lr-sm">
						<text class="padding-right-sm ">{{item.nickname}}</text>
						<text :class="['text-bold',item.gender==0?'text-pink  cuIcon-female':'text-blue  cuIcon-male']"></text>
					</view>
					<view class="flex-sub margin-auto">
					</view>

					<view class="flex cosmos-time">
						<view class="text-grey ">{{ $common.timeToDate(item.createtime) }}</view>
					</view>
				</view>
				<view class="cu-item cosmos-text margin-bottom-sm">
					{{item.text}}
				</view>
				<view class="padding-lr-xls" @tap.stop="">
					<view :class="['grid','margin-auto',item.images_arr.length==1?'':'col-3 grid-square']" v-if="item.images">
						<view @tap="previews(item.images_arr,indexs)" class="margin-tb-sm cosmos-image-item" v-for="(items, indexs) in item.images_arr"
						 :key="indexs">
							<image lazy-load class="cosmos-image-item-image" :src="items" mode="aspectFill"></image>
						</view>
						<!-- {{item.images}}  -->
					</view>	
				</view>
				<!-- <view class="cu-item padding-lr-xls grid col-2 margin-bottom-sm">
					<view>
						#热门
					</view>
					<view class="text-right">
						<text class="cuIcon-location text-xl "></text>
						<text>{{item.place}}</text>
					</view>
				</view> -->
				<view class="padding-lr-xls grid col-4 border-bottom text-center">
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

			<view id="more-text" class="text-center text-white margin-auto">
				加载中...
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
				modalName: null,
				base: {
					avatar: this.$config.avatar,
					CustomBar: this.CustomBar,
					title: this.$config.title
				},
				operate: {
					id: 1
				},
				preview: {
					list: [
						"https://image.aishencn.com/2020/03/17/095817937_81909778-bbs.jpg",
					],
					show: false,
					index: 0,
				},
				cosmos: {
					scrollTop: 0,
					propValue: true,
					loadMore: false
				},
				cosmosList: [],
				tabScroll: 0,
				currentTab: 0,
				tabScrollItem: 0,
				currentTabItem: 0,
				
			}
		},
		onLoad() {
			console.log('onLoad~');
		},
		
		created(){
			console.log('this.cosmosList.length',this.cosmosList.length)
			if(this.cosmosList.length==0){
				this.cosmosGetList()
				console.log('created??');
			}
		},
		methods: {
			like(index) {
				this.cosmosList[index].isLike = !this.cosmosList[index].isLike;
				this.$api.cosmosLike({
					pid: this.cosmosList[index].id
				}, (res) => {
					if (res.code) {
						this.cosmosList[index].isLike = res.data
						if (res.data) {
							this.cosmosList[index].likes++;
						} else {
							this.cosmosList[index].likes--;
						}
					}
				})
			},
			userOpen(index) {
				this.$db.set('user', this.cosmosList[index])
				uni.navigateTo({
					url: '/pages/user/index'
				})
			},
			previews(list, index) {
				this.preview.index = index;
				this.preview.list = list;
				this.preview.show = !this.preview.show;
			},
			puls(){
				uni.navigateTo({
					url:'/pages/cosmos/push'
				})
			},
			cosmosMoreOperate(id){
				this.moreData.show = !this.moreData.show
			},
			cosmosGetList(id) {
				this.$api.getCosmosList({
					id: id
				}, (res) => {
					if (res.code) {
						this.cosmosList = [...this.cosmosList, ...res.data];
						this.cosmos.loadMore = true;
					}
				});
			},
			cosmosOpen(index) {
				this.$db.set('cosmos', this.cosmosList[index])
				uni.navigateTo({
					url: '/pages/cosmos/details?id=' + this.operate.id,
				})
			},
			cosmosTrigger(i) {
				switch (i) {
					case 0:
						// 松开刷新
						break;
					case 1:
						// 触发刷新

						this.$api.getCosmosList({}, (res) => {
							if (res.code) {
								this.cosmosList = res.data;
								this.cosmos.propValue = !this.cosmos.propValue
							} else {
								this.$common.errorToShow('空空如也');
							}
						});
						break;
					case 2:
						const query = uni.createSelectorQuery().in(this);
						query.select('#more-text').boundingClientRect(data => {
							
							if (data.top < 1500) {
								if (this.cosmos.loadMore) {
									this.cosmos.loadMore = false;
									this.cosmosGetList(this.cosmosList.length?this.cosmosList[this.cosmosList.length - 1].id:0);
								}
							}
						}).exec();
						// 未触发刷新
						
						break;
					case 3:
						// 
						// if (this.cosmos.loadMore) {
						// 	this.cosmos.loadMore = false;
						// 	this.cosmosGetList(this.cosmosList[this.cosmosList.length - 1].id);
						// }
						// this.cosmosList[this.cosmosList.length-1];

						// console.log('开始预加载',this.cosmosList[this.cosmosList.length-1])
						break;

					default:
						break;
				}
			},
		}
	}
</script>


<script module="cosmosMod" lang="wxs">

	var startY = 0;
	var startX = 0;
	var top = 0;
	var code = 0;
	var mit = 0;
	function touchstart(event, ins) {
		top = 0;
		if (code == 0) {
			mit = 0;
			ins.callMethod('cosmosTrigger', 2);
			var touch = event.touches[0] || event.changedTouches[0]
			startY = touch.pageY
			startX = touch.pageX
		}
	}

	function end(newValue, oldValue, ownerInstance, instance) {
		ownerInstance.selectComponent('#cosmos-refresh-container').setStyle({
			'transform': 'translateY(0)',
			'transition': 'ease 0.3s'
		})
		ownerInstance.selectComponent('#load-text').removeClass('anim-text-infinite')

		ownerInstance.selectComponent('#load-text').setStyle({
			'transform': 'scale(0)'
		})

		code = 0
	}

	function touchend(event, ins) {
		if (code == 0) {
			if (top < 60) {
				ins.selectComponent('#cosmos-refresh-container').setStyle({
					'transform': 'translateY(0)',
					'transition': 'ease 0.3s'
				})

				ins.selectComponent('#load-text').setStyle({
					'transform': 'scale(0)'
				})
			} else {
				ins.selectComponent('#load-text').setStyle({
					'transform': 'scale(1)'
				})
				ins.callMethod('cosmosTrigger', 1);
				code = 1
				ins.selectComponent('#cosmos-refresh-container').setStyle({
					'transform': 'translateY(60px)',
					'transition': 'ease 0.3s',
					'padding-bottom': '60px',
				})
				ins.selectComponent('#load-text').addClass('anim-text-infinite')

			}
		} else {

		}


	}

	function touchmove(event, ins) {
		if (code == 0) {
			var touch = event.touches[0] || event.changedTouches[0]
			var pageY = touch.pageY
			var pageX = touch.pageX
			var vew = ins.selectComponent('#cosmos-refresh-container')
			var dataset = vew.getDataset();
			top = pageY - startY
			var lr = pageX - startX
			if (dataset.top == 0) {
				if (top > 60) {
					if (mit == 0) {
						ins.callMethod('cosmosTrigger', 0);
					}
					mit = 1
				}
				vew.setStyle({
					'transform': 'translateY(' + (top) + 'px)',
					'padding-bottom': top + 'px',
				})
				ins.selectComponent('#load-text').setStyle({
					'transform': 'scale(' + (top > 100 ? 1 : top / 100) + ')'
				})
			} else {
				startY = pageY
			}
		}
	}
	module.exports = {
		end: end,
		touchend: touchend,
		touchstart: touchstart,
		touchmove: touchmove,
	}
</script>

<style lang="less">
	.cosmos-image-item-image {
		width: 670rpx;
	}


	.load-text {
		transform: scale(0);
	}

	.cosmos-chat {}

	.cosmos-main {
		margin: 0 20rpx !important;
	}

	.bar-text {
		text {
			border-bottom: 2px solid #FBBD08;
		}
	}
	.list_content {
		height: 100vh;
	}

	.content-item {}

	.tips-msg {
		position: relative;
		top: 30%;
		color: #8799A3;
		display: grid;
		text-align: center;

		.icon {
			font-size: 98rpx;
		}
	}

	.nav {
		.cur {
			background-color: #00B0FF;
			width: 100%;
			height: 100%;
		}
	}

	.cu-bar {
		top: -60rpx;
		z-index: 1;
	}
	.tips-value {
		word-break: break-all;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
