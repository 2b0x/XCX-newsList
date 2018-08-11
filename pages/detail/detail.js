var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    
  },

  onLoad: function (options) {
    var targetUrl = options.url
      console.log(targetUrl)
    var urls = 'http://10.13.144.3/aritice.php'
    var that = this
    wx.request({
      url: urls,  
      data: {
          targetUrl: targetUrl
      },
      method: 'GET',
      success: function (res) {
        var article = res.data

        // console.log(res)
        WxParse.wxParse('article', 'html', article, that, 5);
      },
      fail: function () {}
    });
  },

  onShareAppMessage: function () {
    return {
      title: '自定义转发标题',
      path: '/index/index?id=123'
    }
  }
  
})