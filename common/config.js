// api调用目录
// export const apiUrl = 'https://api.mymoyi.cn/api/moyichat/'
// export const apiUrl = 'http://modi.com/api/moyichat/'
// api调用目录
// export const apiUrl = 'https://api.mymoyi.cn/api/moyichat/'
export const apiUrl = 'https://api.mymoyi.cn/api/moyicosmic/'
// export const apiUrl = 'http://192.168.43.15/api/moyicosmic/'


// cnd域名。没有就填写后端域名
// export const cdnUrl = 'http://modi.com'
// export const cdnUrl = 'https://api.mymoyi.cn'
// export const cdnUrl = 'http://cdn-fyx.mymoyi.cn'
// export const cdnUrl = 'http://192.168.43.15'

export const cdnUrl = 'https://moyioss.oss-cn-shanghai.aliyuncs.com'

// webSocket
// export const webSocket = 'ws://api.mymoyi.cn:8282/'
export const webSocket = 'wss://api.mymoyi.cn:8282/'
// export const webSocket = 'ws://192.168.43.15:8282/'

// 网站标题
export const title = 'MoYiCosmic 0.1'
// logo使用base64编码
export const logo = 'data:image/png;base64,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'
// 次要样式	文字 图标的颜色
export const avatar = cdnUrl + '/assets/img/avatar.png'
// 本地端主动给服务器ping的时间, 0 则不开启 , 单位秒 
export const pingInterval = 0;
// 超时时间 超出时间段将重连系统 单位秒
export const timeout = 30


