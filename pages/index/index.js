var time = 0;
var touchDot = 0;//触摸时的原点
var interval = "";
var flag_hd = true;

Page({
    data: {
        navData: [
            {text: '推荐',catid: 0},
            {text: '热点',catid: 1},
            {text: '娱乐',catid: 1183},
            {text: '汽车',catid: 1185},
            {text: '游戏',catid: 1349},
            {text: '时尚',catid: 1173},
            {text: '科技',catid: 1179},
            {text: '体育',catid: 1178},
            {text: '文化',catid: 1172},
            {text: '教育',catid: 1186},
            {text: '房产',catid: 1350},
            {text: '旅游',catid: 1298},
            {text: '军事',catid: 1474}
        ],
        url: 'http://feed.mini.wps.cn/feed/v1/news?hdid=78ae09ead772825aa5a4d86b2d2a75fb&type=0&catid=',
        newslist: [],
        listCache: [],
        navCur: 0,
        wpL: '-100%',
        wpR: '-100%',
        wpShow: 'block',
        // windowHeight: 0,
        // windowWidth: 0,
        cur: 0,
        // imgLoad: '/img/load.png',
        // classNote: 'item-',
        // count: 0,
        isHideLoadMore: 'none'
    },

    onLoad: function() {
        // wx.getSystemInfo({
        //     success: (res) => {
        //         this.setData({
        //             windowHeight: res.windowHeight,
        //             windowWidth: res.windowWidth
        //         })
        //     }
        // })  
    },

    onReady: function() {
        this.loadList('switch');
        // this.setData({
        //     count: 5
        // })
        // this.layLoad();
    },

    onPullDownRefresh: function() {
        var that = this;
        wx.setNavigationBarTitle({
            title: '刷新中……'
        })

        wx.showNavigationBarLoading();

        this.loadList('refresh', function() {
            wx.stopPullDownRefresh();
            wx.hideNavigationBarLoading();
            wx.setNavigationBarTitle({
                title: 'WPS资讯'
            });
        });
    },

    onReachBottom: function() {
        this.setData({
            isHideLoadMore: 'block'
        })
        this.loadList('addMore')
    },

    onShow: function () {
        flag_hd = true;    //重新进入页面之后，可以再次执行滑动切换页面代码
        clearInterval(interval); // 清除setInterval
        time = 0;
    },

    loadList: function(repaint, callback) {
        var that = this;
        var url = that.data.url + that.data.navData[that.data.cur].catid;
        // wx.request({
        //     url: url,
        //     method: 'get',
        //     success: function(res) {
        //         console.log(res);
        //         var status = res.data.result;
        //         console.log(res.data.result)
        //         if(status==='ok'){
        //             // 无记录加载
        //             // var dataArr = (repaint==='1'?[]:that.data.newslist);
        //             // that.setData({
        //             //     newslist: dataArr.concat(data)
        //             // })

        //             var data = res.data.data.news;
        //             // 记录加载
        //             var dataArr = that.data.newslist;
        //             if (repaint === 'addMore') {
        //                 that.setData({
        //                     newslist: dataArr.concat(data)
        //                 })
        //             } else if (repaint === 'refresh') {
        //                 that.data.listCache[that.data.cur] = data;
        //                 that.setData({
        //                     newslist: data.concat(dataArr)
        //                 })
        //             } else if (repaint === 'switch') {
        //                 that.data.listCache[that.data.cur] = that.data.listCache[that.data.cur] || data;
        //                 that.setData({
        //                     newslist: that.data.listCache[that.data.cur]
        //                 })
        //             }
        //             that.setData({
        //                 isHideLoadMore: 'none'
        //             })
        //         }else{
        //             console.log('data load error')
        //         }              
                
        //     },
        //     fail: () => {
        //         wx.showToast({
        //             icon: 'none',
        //             title: '当前网络异常，请稍后再试',
        //             duration: 2000,
        //             mask: true
        //         });
        //     }
        // });
        callback = callback || function() {};
        callback();
    },

    onMyEvent: function(e) {
        this.data.cur = e.detail.cur;
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        })
        this.loadList('switch')
    },

    wpLeftShow:function() {
        var that = this;
        this.selectComponent('#topNav').showDemo();
        this.setData({
            wpShow: 'block',
            wpL: '0px'
        })
        setTimeout(function(){
            that.setData({
                wpShow: 'none',
                wpL: '-100%'
            })
        },1000)
        setTimeout(function () {
            that.setData({
                wpShow: 'block'
            })
            flag_hd = true;            
        }, 1500)
    },

    wpRightShow: function () {
        var that = this;
        this.selectComponent('#topNav').showDemo();
        this.setData({
            wpShow: 'block',
            wpR: '0px'
        })
        setTimeout(function () {
            that.setData({
                wpShow: 'none',
                wpR: '-100%'
            })
        }, 1000)
        setTimeout(function () {
            that.setData({
                wpShow: 'block'
            })
            flag_hd = true;            
        }, 1500)
    },

    touchStart: function (e) {
        touchDot = e.touches[0].pageX; // 获取触摸时的原点
        // 使用js计时器记录时间    
        interval = setInterval(function () {
            time++;
        }, 100);
    },
    // 触摸结束事件
    touchEnd: function (e) {
        var touchMove = e.changedTouches[0].pageX;
        // 向左滑动   
        if (touchMove - touchDot <= -50 && time < 10 && flag_hd == true) {
            flag_hd = false;
            //执行切换页面的方法
            console.log("向左滑动");
            this.wpRightShow();
        }
        // 向右滑动   
        if (touchMove - touchDot >= 50 && time < 10 && flag_hd == true) {
            flag_hd = false;
            //执行切换页面的方法
            console.log("向右滑动");
            this.wpLeftShow();
        }
        clearInterval(interval); // 清除setInterval
        time = 0;
    }


    // layLoad() {
    //     var that = this;
    //     wx.createIntersectionObserver().relativeToViewport({ bottom: 100 }).observe('.' + that.data.classNote + (that.data.count-1), (res) => {
    //         wx.createIntersectionObserver().disconnect()
    //         that.setData({
    //             count: that.data.count + 5
    //         })
    //         that.layLoad();
    //     }) 
    // }
})