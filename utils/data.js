const foodData = {
	// 轮播图片
	// 图片地址在images文件夹里面的food_list
	bannerList: [
		{
			businessId: 0,
			picUrl: '/images/food_list/icon-bg.jpg'
		}
	],
	
	// 商店信息
	shopSubList: [
		{
			name: '乡缘情土特产',
			address: '广东省揭西县河婆镇霖都大道7号第1间乡缘情土特产',
			openingHours: '全天',  //营业时间
			linkPhone: '18938638558',  //联系电话
			manPhone: '18924587000',
			// services: [
			// 	'日常礼盒定制',
			// 	'节日礼盒定制',
			// 	'快递服务',
			// 	'商品人选随君搭配'
			// ]
			services: '支持日常礼盒定制，节日礼盒定制，快递服务，商品任选随君搭配'
		}
	], 
	
	// 主营产品信息
	// 图片地址在images文件夹里面的food_list文件夹里面的food
	goodsRecommend: [
		{
			pic: '/images/food_list/food/shop-food',
			name: '春旺花生',
			minPrice: ''
		},
		{
			pic: '/images/food_list/food/shop-food',
			name: '炒茶',
			minPrice: ''
		},
		{
			pic: '/images/food_list/food/shop-food',
			name: '佛手喉宝',
			minPrice: ''
		},
		{
			pic: '/images/food_list/food/shop-food',
			name: '紫金椒酱王',
			minPrice: ''
		},
		{
			pic: '/images/food_list/food/shop-food',
			name: '英红九号红茶',
			minPrice: ''
		},
		{
			pic: '/images/food_list/food/shop-food',
			name: '不知名字',
			minPrice: ''
		}
	],
	
	// 礼盒定制信息
	giftBoxList: [],  //礼盒定制
}

module.exports =  foodData