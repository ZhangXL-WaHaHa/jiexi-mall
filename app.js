//app.js
App({
	onLaunch: function () {
		// 隐藏tab栏
		// wx.hideTabBar({
		// 	animation: false
		// })
		// 展示本地存储能力
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)
	},

	globalData: {
		userInfo: null,
		openid: null
	}
})
