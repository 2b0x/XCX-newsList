Page({
data: {
    navData: [
        { text: '推荐', catid: 0 },
        { text: '热点', catid: 1 },
        { text: '娱乐', catid: 1183 },
        { text: '汽车', catid: 1185 },
        { text: '游戏', catid: 1349 },
        { text: '时尚', catid: 1173 },
        { text: '科技', catid: 1179 },
        { text: '体育', catid: 1178 },
        { text: '文化', catid: 1172 },
        { text: '教育', catid: 1186 },
        { text: '房产', catid: 1350 },
        { text: '旅游', catid: 1298 },
        { text: '军事', catid: 1474 }
    ],
    url: 'http://feed.mini.wps.cn/feed/v1/news?hdid=78ae09ead772825aa5a4d86b2d2a75fb&type=0&catid=',
    newslist: [],
    windowHeight: 0,
    windowWidth: 0,
    cur: 0,
    imgLoad: '/img/load.png',
    classNote: 'item-',  
    count: 0,
    isHideLoadMore: 'none'
},

onLoad: function () {  // 页面首次载入
    this.loadList( '0');
    wx.getSystemInfo({
        success: (res) => {
            this.setData({
                windowHeight: res.windowHeight,
                windowWidth: res.windowWidth
            })
        }
    })
    
},

onReady: function() {
    this.setData({
        count: 5
    })
    // this.layLoad();
},

onPullDownRefresh:  () => {  // 下拉事件
    wx.setNavigationBarTitle({
    title: '刷新中……'
    })//动态设置当前页面的标题。

    wx.showNavigationBarLoading();//在当前页面显示导航条加载动画。

    setTimeout(() => {
    wx.stopPullDownRefresh();//停止当前页面下拉刷新。
    wx.hideNavigationBarLoading();//隐藏导航条加载动画。
    wx.setNavigationBarTitle({
        title: 'WPS资讯'
    })//动态设置当前页面的标题。
    }, 1000)
},

onReachBottom: function () {  // 上拉事件
    this.setData({
        isHideLoadMore: 'block'
    })
    // console.log('上拉事件')
    this.loadList( '0')
},

loadList: function ( repaint) {
    var that = this;
    var url = that.data.url + that.data.navData[that.data.cur].catid;
    wx.request({
        url: url,
        method: 'get',
        success: (res) => {
            var data = res.data.data.news;
            var dataArr = (repaint==='1'?[]:that.data.newslist);
                that.setData({
                    newslist: dataArr.concat(data)
                })
            that.setData({
                isHideLoadMore: 'none'
            })
        },
        fail: () =>{
            wx.showToast({
            icon: 'none',
            title: '当前网络异常，请稍后再试',
            duration: 2000,
            mask: true
            });
        }
    });
},

onMyEvent: function (e) {
    this.data.count = 10;
    this.data.cur = e.detail.cur;
    this.loadList( '1')
    wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
    })
    this.loadList( '1')
},

    layLoad() {
        var that = this;
        wx.createIntersectionObserver().relativeToViewport({ bottom: 100 }).observe('.' + that.data.classNote + (that.data.count-1), (res) => {
            wx.createIntersectionObserver().disconnect()
            that.setData({
                count: that.data.count + 5
            })
            that.layLoad();
        }) 
    }
})
