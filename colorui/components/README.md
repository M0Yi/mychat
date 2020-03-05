# boboMessage消息提示组件

消息提示组件，可显示`info`、`success`、`error`和`warn`类型的提示信息。

> 这个组件的样式是仿照`iview`的提示组件的样式来做的，制作时还参考了插件市场中已有的steffen的信息弹窗popup组件的动画显示方式（以前很少自己做动画。。。）

## 安装及使用

下载插件后，可全局导入组件或局部导入组件。对于提示组件来说，还是推荐全局导入的，这里只演示全局导入组件的方式。

```js
// main.js

import boboMessage from './components/bobo-message/bobo-message.vue'

// 使用自定义消息提示
Vue.component('message', boboMessage)
```

在具体的页面中使用时，还是需要在每个页面中再声明一下组件的。

```html
// ***.vue

<template>
	<view>
		<message ref="Message"></message>
	</view>
</template>

<script>

// 直接传递消息内容
this.$refs['Message'].info('我是消息')
this.$refs['Message'].success('我是消息')
this.$refs['Message'].error('我是消息')
this.$refs['Message'].warn('我是消息')

// 自定义单个消息的样式
this.$refs['Message'].success({
	content: '我是消息',
	duration: 1000,
	background: true
})

</script>
```

## 组件配置项

| 属性名   | 类型   | 默认值 | 描述         |
| -------- | ------ | ------ | ------------ |
| z-index  | Number | 10000  | 组件Z轴高度  |
| duration | Number | 2000   | 消息显示时长 |
| background | Boolean | false   | 是否显示背景颜色 |

## 常见问题

**能否直接调用命令显示提示**

暂时不能。我看过`iview`的Message组件的实现方式，用到了render函数，而uni-app应该是只有h5能使用render函数的，所以我也不知道要怎样在uni-app上实现。

## 已知问题

1. 多行提示和单行提示同时出现时消失动画有跳动
2. 带背景颜色提示和普通提示在微信小程序同时出现，在显示消失动画时背景颜色提示会重新渲染（边框颜色跳动）