// pages/user/index.js
import product from "../../utils/product-operation"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [], // 商品图片
    productInfo: {
      name: '',
      price: '',
      desc: '',
      url: '',
      type: 'product',
      number: 100
    }, // 商品信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 更改商品类型
   * @param {} e 
   */
  changeProductType(e) {
    this.setData({
      ['productInfo.type']: e.detail
    })
  },

  /**
   * 设置上传的图片
   * @param {} e 
   */
  setFileList(e) {
    this.data.fileList.push({
      ...e.detail.file,
      name: '图片',
      isImage: true
    })
    this.setData({
      fileList: this.data.fileList
    })
  },

  /**
   * 点击删除图片
   */
  deleteImage() {
    this.setData({
      fileList: []
    })
  },

  /**
   * 上传商商品图片
   */
  uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.url
    })
  },

  /**
   * 点击提交表单
   */
  formSubmit(e) {
    let form_value = e.detail.value

    // 删除单选框传过来的两个值
    delete form_value.product
    delete form_value.gift

    // 判断数据是否填写完成
    let form_flag = true
    Object.keys(form_value).forEach(item => {
      if (!form_value[item]) {
        form_flag = false
      }
    })
    if (!form_flag) {
      wx.showToast({
        title: `请填写完整数据`,
        icon: 'none'
      })
      return
    }

    // 判断图片是否上传
    if (!this.data.fileList.length) {
      wx.showModal({
        cancelColor: '操作提示',
        content: '商品图片还没上传，是否继续发布商品？',
        confirmText: '提交',
        success: res => {
          if (res.confirm) {
            this.submitProductInfo(form_value)
          }
        }
      })
      return
    }

    this.submitProductInfo({
      ...form_value,
      url: this.data.fileList
    }) // 上传数据
  },

  /**
   * 发布商品
   * @param {Object} data 商品信息
   */
  submitProductInfo(data) {
    // 1. 如果有图片，上传图片到云存储
    if (this.data.fileList.length) {
      wx.showLoading({
        title: '上传图片中…',
        mask: true
      })
      wx.cloud.init();
      const { fileList } = this.data;
      if (!fileList.length) {
        wx.showToast({ title: '请选择图片', icon: 'none' })
      } else {
        const uploadTasks = fileList.map((file, index) => this.uploadFilePromise(`products-${new Date().getTime()}-${index}.png`, file))
        Promise.all(uploadTasks)
          .then(res => {
            const newFileList = res.map(item => {
              return { url: item.fileID }
            })
            // this.setData({ fileList: newFileList })
            this.data.fileList = newFileList

            // console.log('输出上传成功之后的数据==>', this.data.cloudPath, this.data.fileList)
            // // 2. 判断商品的类型，提交到商品数据表或者礼盒数据表中
            // console.log('图片上传完毕')
            if (this.data.productInfo.type === 'product') {
              console.log('输出当前的图片链接==>', this.data.fileList)
              this.uploadProductInfo({
                ...data,
                url: this.data.fileList
              })
            }
            if (this.data.productInfo.type === 'gift') {
              this.postGiftInfo({
                ...data,
                url: this.data.fileList
              })
            }
          })
          .catch(e => {
            wx.showToast({ title: '上传图片失败，请将bug反馈给开发者', icon: 'none' });
            console.log(e);
          })
      }
    }
  },

  /**
   * 点击上传商品信息到云数据库中
   * @param {Object} 商品数据
   */
  uploadProductInfo(data) {
    wx.showLoading({
      title: '上传数据中',
      mask: true
    })
    product.postProductsList(data).then(res => {
      console.log('添加商品成功')
      wx.showToast({
        title: '添加商品成功',
        icon: 'none'
      })
      // 重置数据
      this.setData({
        fileList: [], // 商品图片
        productInfo: {
          name: '',
          price: '',
          desc: '',
          url: '',
          type: 'product',
          number: 100
        }, // 商品信息
      })
    }).catch(error => {
      console.log('添加商品失败==>', error)
      wx.showToast({
        title: '添加失败，请将bug反馈给开发者',
        icon: 'none'
      })
    })
  },

  /**
   * 上传定制礼盒信息到云数据库中
   * @param {Object} data
   */
  postGiftInfo(data) {
    wx.showLoading({
      title: '上传数据中…',
      mask: true
    })
    product.postGiftInfo(data).then(res => {
      console.log('输出定制礼盒信息==>', res)
      wx.showToast({
        title: '添加定制礼盒成功',
        icon: 'none'
      })
      // 重置数据
      this.setData({
        fileList: [], // 商品图片
        productInfo: {
          name: '',
          price: '',
          desc: '',
          url: '',
          type: 'product',
          number: 100
        }, // 商品信息
      })
    }).catch(error => {
      wx.showToast({
        title: '添加失败，请将bug反馈给开发者',
        icon: 'none'
      })
    })
  }
})