import Vue from 'vue'
import App from './App'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

import * as Db from './common/db.js'
import * as Config from './common/config.js'
import * as Api from './common/api.js'
import * as Common from './common/common.js'

import * as Soccket from './common/socket.js'

Vue.prototype.$soccket = Soccket;


Vue.prototype.$api = Api;
Vue.prototype.$common = Common;
Vue.prototype.$db = Db;
Vue.prototype.$config = Config;


//	按钮
import myButton from './colorui/components/my-button.vue'; //button
Vue.component('myButton', myButton)

//	输入框
import myInput from './colorui/components/my-input.vue'; //button
Vue.component('myInput', myInput)

//	提示消息
import myMessage from './colorui/components/my-message.vue'; //button
Vue.component('myMessage', myMessage)

//	顶部条
import myBar from './colorui/components/my-bar.vue'; //button
Vue.component('myBar',myBar)
Vue.config.productionTip = false

const i18n = new VueI18n({
	//初始化语言
	
	// #ifdef MP
	locale: 'zh-CN',
	// #endif
	// #ifndef MP
	locale: localStorage.getItem('locale') || 'en',
	// #endif
	messages: {
		'zh-CN': require('./lang/zh-CN.js').lang,
		'zh-TW': require('./lang/zh-TW.js').lang,
		'en': require('./lang/en.js').lang
	}
})
Vue.prototype._i18n = i18n

App.mpType = 'app'

const app = new Vue({
	i18n,
	...App
})
app.$mount()
