import Vue from 'vue'
import App from './App'

import * as Config from './common/config.js'

Vue.prototype.$config = Config;


// import * as Lang from './common/lang.js'
// Vue.prototype.__ = Lang.__;


import my from './pages/my/my.vue'

import * as Db from './common/db.js'
import * as Api from './common/api.js'
import * as Common from './common/common.js'
import * as Socket from './common/socket.js'
import * as Audio from './common/audio.js'
import * as mySocket from './common/mysocket.js'
Vue.prototype.$api = Api;
Vue.prototype.$common = Common;
Vue.prototype.$db = Db;
Vue.prototype.$socket = Socket;
Vue.prototype.$audio = Audio;
Vue.prototype.$mysocket = mySocket;

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

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

//	自定义预览界面 
import preview from './colorui/components/my-preview.vue'; //button
Vue.component('preview',preview)


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



