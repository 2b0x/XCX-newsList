var url = 'http://10.13.144.3/index.php';
Page({
data: {
    navData: [
    { text: '头条' },
    { text: '精选' },
    { text: '娱乐' },
    { text: '汽车' },
    { text: '运动' },
    { text: '平顶山' },
    { text: '漫画' }
    ],
    navUrl:[
    'http://c.m.163.com/nc/article/headline/T1348647853363/',
    'http://c.3g.163.com/nc/article/list/T1467284926140/',
    'http://c.3g.163.com/nc/article/list/T1348648517839/',
    'http://c.m.163.com/nc/auto/list/5bmz6aG25bGx/',
    'http://c.3g.163.com/nc/article/list/T1348649079062/',
    'http://c.3g.163.com/nc/article/local/5bmz6aG25bGx/',
    'http://c.m.163.com/nc/article/list/T1444270454635/'
    ],
    newslist: [],
    windowHeight: 0,
    windowWidth: 0,
    page: 0,
    cur: 0,
    imgLoad: '/img/load.png',
    classNote: 'item-',  
    count: 0,
    isHideLoadMore: 'none',
    newData: { title: '这是标题', source: 'WPS' }
},

onLoad: function () {  // 页面首次载入
    // this.loadList(this.data.page, this.data.navUrl[this.data.cur], '0');
    this.loadList(this.data.page, url, '0');
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
        count: 10
    })
    this.showImg();
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
    this.data.page++
    // this.loadList(this.data.page, this.data.navUrl[this.data.cur], '0')
    this.loadList(this.data.page, url, '0')
},

loadList: function (page, url, repaint) {
    var that = this;
    var page = page + 1;
    page = ( ( page * 10) - 10 + '-' + (page * 10) ) +'.html';
    // var url = url+page;
    // console.log(url)
    wx.request({
    url: url,
    method: 'get',
    success: (res) => {
        // var data = res.data;
        var data = JSON.parse(res.data); //本地环境
        var dataArr = (repaint==='1'?[]:that.data.newslist);
        for (var item in data) { 
        that.setData({
            newslist: dataArr.concat(data[item])
        })
        }
        that.data.newslist.forEach((e)=>{
            e.imgShow = false;
        })
        that.setData({
            isHideLoadMore: 'block'
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
    // this.showImg()
},

onMyEvent: function (e) {
    this.data.page = 0;
    this.data.cur = e.detail.cur;
    // this.loadList(this.data.page, this.data.navUrl[this.data.cur], '1')
    this.loadList(this.data.page, url, '1')
},

//version one
// showImg(){
//     var that = this
//     var newslist = that.data.newslist // 获取图片数组数据
    
//     for (let i in that.data.newslist){
//         wx.createIntersectionObserver().relativeToViewport().observe('.img' + i, (ret) => {
//             console.log(132)
//             if (ret.intersectionRatio > 0) {
//                 newslist[i].imgShow = true
//             }
//             // var arr = newslist
//             that.setData({
//                 newslist
//             })
//         })
//     }
// }

// showImg() {
//         var that = this
//         var newslist = that.data.newslist // 获取图片数组数据
//         var oldCount = this.data.count

//         for (let i in that.data.newslist) {
//             wx.createIntersectionObserver().relativeToViewport().observe('.item-' + oldCount, (ret) => {
//                 console.log(132)
//                 if (ret.intersectionRatio > 0) {
//                     that.setData({
//                         count: that.data.count + 10
//                     })
//                 } 
//                 that.showImg();
//             })
//         }
//     }

    showImg() {
        var that = this;
        // var intersectionObserver = wx.createIntersectionObserver();
        //这里bottom：100，是指显示区域以下 100px 时，就会触发回调函数。
        for(let i in that.data.newslist){
            wx.createIntersectionObserver().relativeToViewport().observe('.item-' + this.data.count, (res) => {
                console.log(123)
                if (res.boundingClientRect.top > 0) {
                    // intersectionObserver.disconnect()
                    that.setData({
                        count: that.data.count + 10
                    })
                    that.showImg();
                }
            })
        }   
    }

})
