const db_name = 'jiexi_products'
const gift_db_name = 'jiexi_gift'
const MAX_LIMIT = 100 // 最大数据

export default {
  /**
   * 初始化数据库，并且获取数据库集合
   * @param {Object} name 数据库集合名称
   * @returns {Object} 集合对象
   */
  initDbBase(name) {
    wx.cloud.init() // 初始化云函数

    return wx.cloud.database().collection(name) // 返回集合对象
  },

  /**
   * 往数据库中push商品信息
   * @param {Object} data 商品信息，包括（介绍，商品名称，价格等）
   * price 价格
   * desc 商品详情
   * name 商品价格
   * cover 商品图片
   */
  postProductsList(data) {
    const db = this.initDbBase(db_name)

    return db.add({
      data: {
        id: new Date().getTime(),
        ...data
      }
    })
  },

  /**
   * 从数据库中push定制礼盒信息
   * @param {*} event 
   * @param {*} context 
   */
  postGiftInfo(data) {
    const db = this.initDbBase(gift_db_name)

    return db.add({
      data: {
        id: new Date().getTime(),
        ...data
      }
    })
  },

  /**
   * 从数据库中获取集合数据
   */
  getProductList(event, context) {
    const db = this.initDbBase(db_name)
    return db.get()
  },

  /**
   * 从数据库中获取集合数据
   */
  getGiftList() {
    const db = this.initDbBase(gift_db_name)
    return db.get()
  }
}