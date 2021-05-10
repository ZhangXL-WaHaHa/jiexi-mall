//index.js
import foodData from '../../utils/data.js';

//获取应用实例
const app = getApp()

Page({
	data: {
		swiperCurrent: 0, //当前banner所在位置
		bannerList: null,  //轮播图
		shopSubList: null,  //商店详情
	},
	
	// 界面一开始加载
	onLoad() {
		this.setData( {
			bannerList: foodData.bannerList,
			shopSubList: foodData.shopSubList
		})
	},
	
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {
	
	},
	
	// 点击拨打电话
	callPhone(e) {
		wx.makePhoneCall({
			phoneNumber: e.currentTarget.dataset.tel
		})
	},
	
	// 轮播图滑动
	swiperchange(e) {
		console.log('输出数据', e.detail)
		this.setData( {
			swiperCurrent: e.detail.current
		})
	},
	
	// 点击主营产品图片
	viewProduct() {
		wx.navigateTo({
			url: 'products/index'
		})
	},
	
	// 点击礼盒定制图片
	viewGift() {
		wx.navigateTo({
			url: 'gift/index'
		})
	}
})
