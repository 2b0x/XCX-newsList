var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    
  },

  onLoad: function (options) {
    var url = options.url
    // console.log(url)
    var urls = 'http://10.13.144.3/aritice.php'
    var that = this
    wx.request({
      url: urls,
      // .match(/<div.*?id="endText".*?>(.*?)<\/div>/)
      success: function (res) {
        var article = res.data
        // console.log(article)
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