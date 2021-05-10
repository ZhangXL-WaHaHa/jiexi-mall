// pages/index/gift/index.js
import product from "../../../utils/product-operation"
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		giftBoxList: null,  //礼盒定制信息
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.getGiftList() // 获取定制礼盒信息
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	},

	/**
	 * 获取定制礼盒信息
	 */
	getGiftList() {
		wx.showLoading({
			title: '获取数据中…',
			mask: true
		})
		product.getGiftList().then(res => {
			console.log('输出返回的数据==>', res)
			this.setData({
				giftBoxList: res.data
			})
			wx.hideLoading()
    }).catch(error => {
			console.log('获取返回数据失败==>', error)
			wx.showToast({
				title: '获取商品数据失败，请将bug反馈给开发者',
				icon: 'none'
			})
    })
	}
})
