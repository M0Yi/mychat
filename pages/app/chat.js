export default {
	data() {
		return {
			scrollAnimation: false, //滑动动画开关
			scrollTop: 0, //竖向滚动条位置
			scrollToView: '', //滚动到元素位置
			InputBottom: 0,

			record: [{
				"id": 1583304081699,
				"type": "text",
				"to": 1074,
				"from": 1081,
				"value": "娃大王的娃",
				"state": "Fail",
				"time": 1583304081699
			}, {
				"id": 1583304081,
				"to": "1081",
				"form": 1074,
				"type": "tips",
				"value": "You have been blacklisted or deleted by the other party"
			}],
			base: {
				avatar: this.$config.avatar,
				CustomBar: this.CustomBar,

			},
			chat: {
				id: 1,
				type: 'caht',
				nickname: '默毅',
				avatar: this.$config.logo,
				inputText: ''
			},

			inputText: '',
			userInfo: this.$common.userInfo(),


			tabScroll: 0,
			currentTab: 3,

			tabScrollItem: 0,
			currentTabItem: 0,

			//文字笑话
			list: [],
			//加载条数
			pages: 0,
			pages_all: false
		};
	},
	created() {

	},
	onLoad() {
		// console.log('page.route	',getCurrentPages())
		// let CP = getCurrentPages();
		// console.log('cp',CP.length);

		// if(CP.length == 1 || CP[CP.length-2].route == '/pages/app/index'){
		// 	console.log('并非当前页面')
		// 	uni.reLaunch({
		// 		url:'/pages/app/index'
		// 	})
		// }
		// let peges = getCurrentPages();
		// // let page = ;
		// console.log('pages[pages.length',getCurrentPages()[getCurrentPages().length]);

		// let pages = getCurrentPages();
		// let page = pages[pages.length - 1];

		// this.loadShow = true;
		let chat = this.$db.get('chat');


		console.log('onLoad,chat', chat);
		if (chat.user_id) {
			chat.id = chat.user_id;
		}
		this.$common.addUserInfo(chat)
		this.chat = chat
		this.title = chat.nickname

		//进入页面滚动到底部
		this.$nextTick(function() {
			this.scrollTop = 99999;
		});

		this.record = this.$common.getRecord(chat.id);

		// 注册接受消息监听
		uni.$on('socketMessage', (res) => {
			let data = res.data;
			// console.log('socketMessage',res)
			switch (res.type) {
				case 'init':
					break;
					// 消息
				case 'msg':
					if (data.to == chat.id || data.form == chat.id) {
						switch (data.type) {
							case 'text':
								this.record.push(data);
								this.goViewId(data.id);
								break;
							case 'tips':
								console.log('监听到提示消息');
								this.record.push(data);
								this.goViewId(data.id);
								break;
							default:
								console.log('监听到未标记消息');
								break;
						}
					} else {
						switch (data.type) {
							case 'text':
								let userInfo = this.$common.getUserInfo(data.form);
								break;
						}
					}
					break;
					// 答复
				case 'response':
					// 监听到答复
					if (data.to == chat.id || data.form == chat.id) {
						let record = this.record;
						for (var i = record.length - 1; i >= 0; i--) {
							// 查找ID
							if (record[i].id == data.id) {
								this.record[i].state = data.value;
								i = 0;
							}
						}
					}
					break;
				default:
					console.log(res.type + '数据不作处理')
					break;
			}
		});

	},
	methods: {
		navigateBack() {
			uni.navigateBack({

			})
		},
		test1() {
			//进入页面滚动到底部
			this.$nextTick(function() {
				this.scroc = 99999;
			});
		},
		sendBtn() {
			let text = this.inputText;
			console.log('this.chat.inputText', text)
			if (text) {
				this.send(text);
				this.inputText = '';
			}
		},
		send(value, type = 'text') {
			let chat = {
				id: new Date().getTime(),
				type: type,
				to: this.chat.id,
				from: this.userInfo.id,
				value: value,
				state: 'Sending',
				time: new Date().getTime()
			}
			this.$common.addRecord(this.chat.id, chat);
			this.$common.addNewMessageList(this.chat.id, chat.value);
			this.record.push(chat);
			this.goViewId(chat.id);
			console.log('发送数据', chat)
			uni.sendSocketMessage({
				data: JSON.stringify(chat)
			});
		},
		goViewId(id) {
			if (id) {
				this.$nextTick(() => {
					this.scrollToView = 'msg' + id;
				});
			}
		}
	},
	// 页面卸载的时候清除当前消息数量
	onUnload() {
		this.$common.readNewMessageList(this.chat.id)
	},
};
