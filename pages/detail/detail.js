var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    targetURL: '',
    windowHeight: 0,
    height: '100%'
  },

  onLoad: function (options) {
    var that = this
    var targetUrl = options.url
    
    wx.getSystemInfo({
        success: (res) => {
            that.setData({
                windowHeight: res.windowHeight,
                windowWidth: res.windowWidth
            })
        }
    }) 


    console.log(encodeURIComponent(targetUrl))
      var urls = 'http://10.13.144.3/iframe.php?targetURL=' + targetUrl

    console.log(urls)
    this.setData({
        targetURL: urls
    })
  },

  onShareAppMessage: function (options) {
    return {
      title: '自定义转发标题',
      path: '/index/index?id=123'
    }
  }
  
})