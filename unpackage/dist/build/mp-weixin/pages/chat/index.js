(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/chat/index"],{"0339":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{CustomBar:this.CustomBar,scrollAnimation:!1,scrollTop:0,scrollToView:"",InputBottom:0,inputText:"",base:{avatar:this.$config.avatar},userInfo:this.$common.userInfo(),user:{id:342,nickname:"半甜",gender:0,avatar:"https://image.aishencn.com/2020/03/18/164612564_10784128-user.jpg",frame:null},chat:{id:342,nickname:"半甜",gender:0,avatar:"https://image.aishencn.com/2020/03/18/164612564_10784128-user.jpg",frame:null},record:[]}},created:function(){},onLoad:function(){var e=this,n=this.$db.get("chat");this.chat=n,this.record=this.$common.getRecord(n.id),this.$nextTick((function(){this.scrollTop=99999})),t.$on("socketMessage",(function(t){var i=t.data;switch(t.type){case"init":break;case"msg":if(i.to==n.id||i.form==n.id)switch(i.type){case"text":e.record.push(i),e.goViewId(i.id);break;case"tips":console.log("监听到提示消息"),e.record.push(i),e.goViewId(i.id);break;default:console.log("监听到未标记消息");break}else switch(i.type){case"text":e.$common.getUserInfo(i.form);break}break;case"response":if(i.to==n.id||i.form==n.id)for(var o=e.record,a=o.length-1;a>=0;a--)o[a].id==i.id&&(e.record[a].state=i.value,a=0);break;default:console.log(t.type+"数据不作处理");break}}))},methods:{sendBtn:function(){var t=this.inputText;console.log("this.chat.inputText",t),t&&(this.send(t),this.inputText="")},send:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"text",i={id:(new Date).getTime(),type:n,to:this.chat.user_id?this.chat.user_id:this.chat.id,from:this.userInfo.id,value:e,state:"Sending",time:(new Date).getTime()};this.$common.addRecord(this.chat.id,i),this.$common.addNewMessageList(this.chat.id,i.value),this.record.push(i),this.goViewId(i.id),console.log("发送数据",i),t.sendSocketMessage({data:JSON.stringify(i)})},goViewId:function(t){var e=this;t&&this.$nextTick((function(){e.scrollToView="msg"+t}))},InputFocus:function(t){this.InputBottom=t.detail.height},InputBlur:function(t){this.InputBottom=0}},onUnload:function(){this.$common.readNewMessageList(this.chat.id)}};e.default=n}).call(this,n("543d")["default"])},"2f22":function(t,e,n){},abb5:function(t,e,n){"use strict";(function(t){n("aff0"),n("921b");i(n("66fd"));var e=i(n("d4e7"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},b02b:function(t,e,n){"use strict";var i=n("2f22"),o=n.n(i);o.a},bc7c:function(t,e,n){"use strict";n.r(e);var i=n("0339"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},d4e7:function(t,e,n){"use strict";n.r(e);var i=n("f552"),o=n("bc7c");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("b02b");var s,c=n("f0c5"),r=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);e["default"]=r.exports},f552:function(t,e,n){"use strict";var i,o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}))}},[["abb5","common/runtime","common/vendor"]]]);