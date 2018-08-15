var time = 0;
var touchDotX = 0;//触摸时X轴的原点
var touchDotY = 0;//触摸时y轴的原点
var interval = "";
var flag_hd = true;
var loadingTime = "";

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
        // listCache: [],
        // navCur: 0,
        wpL: '-100%',
        wpR: '-100%',
        wpLShow: 'block',
        wpRShow: 'block',
        windowHeight: 0,
        windowWidth: 0,
        cur: 0,
        isHideLoadMore: 'none'
    },

    onLoad: function() {
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
        this.loadList('switch');
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
        flag_hd = true;
        clearInterval(interval);
        time = 0;
    },

    loadList: function(repaint, callback) {
        var that = this;
        var url = that.data.url + that.data.navData[that.data.cur].catid;
        var StorageDataCur = 'newslist' + that.data.cur;
        var StorageData = wx.getStorageSync(StorageDataCur);
        wx.request({
            url: url,
            method: 'get',
            success: function(res) {
                var status = res.data.result;
                if(status==='ok'){
                    var total = res.data.data.total;
                    if(total==0){
                        wx.showToast({
                            icon: 'none',
                            title: '暂无新数据哦~',
                            duration: 1500,
                            mask: true
                        });
                        that.setData({
                            newslist: StorageData
                        })
                    }else{
                        var data = res.data.data.news;
                        // 记录加载
                        var dataArr = that.data.newslist;
                        if (repaint === 'addMore') {
                            that.setData({
                                newslist: dataArr.concat(data)
                            })
                        } else if (repaint === 'refresh') {
                            wx.setStorageSync(StorageDataCur, data)
                            that.setData({
                                newslist: data.concat(dataArr)
                            })
                        } else if (repaint === 'switch') {
                            if (StorageData) {
                                that.setData({
                                    newslist: StorageData
                                })
                            } else {
                                wx.setStorageSync(StorageDataCur, data)
                                that.setData({
                                    newslist: data
                                })
                            }
                        }
                        that.setData({
                            isHideLoadMore: 'none'
                        })
                    } 
                }else{
                    // console.log('data load error')
                    wx.showToast({
                        icon: 'none',
                        title: '等会儿嘛~等会儿再来嘛~',
                        duration: 2000,
                        mask: true
                    });
                    that.setData({
                        isHideLoadMore: 'none'
                    })
                }              
                
            },
            fail: () => {
                wx.showToast({
                    icon: 'none',
                    title: '当前网络异常，请稍后再试',
                    duration: 2000,
                    mask: true
                });
                that.setData({
                    isHideLoadMore: 'none'
                })
            }
        });
        
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

    wpLeftShow: function (hiddenTime) {
        var that = this;
        var hiddenTime = hiddenTime;
        this.selectComponent('#topNav').showDemo();
        this.setData({
            wpLShow: 'block',
            wpL: '0px'
        })  
    },

    wpRightShow: function (hiddenTime) {
        var that = this;
        var hiddenTime = hiddenTime;
        this.selectComponent('#topNav').showDemo();
        this.setData({
            wpRShow: 'block',
            wpR: '0px'
        })
    },

    wpLeftHidden: function(){
        var that = this;
        clearTimeout(loadingTime)
        loadingTime = setTimeout(function(){
            that.setData({
                wpLShow: 'none',
                wpL: '-100%'
            })
            setTimeout(function () {
                that.setData({
                    wpLShow: 'block'
                })
                flag_hd = true;
            }, 50) 
            that.loadList('switch')
        },1000)
    },

    wpRightHidden: function () {
        var that = this;
        clearTimeout(loadingTime)
        loadingTime = setTimeout(function () {
            that.setData({
                wpRShow: 'none',
                wpR: '-100%'
            })
            setTimeout(function () {
                that.setData({
                    wpRShow: 'block'
                })
                flag_hd = true;
            }, 50)
            that.loadList('switch')
        }, 1000)
    },

    touchStart: function (e) {
        var that = this;
        touchDotX = e.touches[0].pageX;
        touchDotY = e.touches[0].pageY;
        that.setData({
            wpLShow: 'none',
            wpRShow: 'none'
            
        })
        flag_hd = true; 
        setTimeout(function () {
            that.setData({
                wpLShow: 'block',
                wpRShow: 'block',
                wpL: '-100%',
                wpR: '-100%'
            })             
        }, 50)  
        interval = setInterval(function () {
            time++;
        }, 100);   
    },

    touchEnd: function (e) {
        var that = this;
        var touchMoveX = e.changedTouches[0].pageX;
        var touchMoveY = e.changedTouches[0].pageY;
        var moveY = Math.abs(touchMoveY - touchDotY);
        if (touchMoveX - touchDotX <= -50 && time < 10 && moveY < 10 && flag_hd == true) {
            flag_hd = false;
            // console.log("向左滑动");
            var cur = that.data.cur
            if(cur==(that.data.navData.length)-1){
                console.log('已经到尽头')
            }else{
                that.setData({
                    cur: cur + 1,
                    newslist: []
                })
                that.wpRightShow(500);
                that.wpRightHidden();
            }
           
        } 
        if (touchMoveX - touchDotX >= 50 && time < 10 && moveY < 10 && flag_hd == true) {
            flag_hd = false;
            // console.log("向右滑动");
            var cur = that.data.cur
            if(cur==0){
                console.log('已经到尽头')
            }else{
                that.setData({
                    cur: cur - 1,
                    newslist: []
                })
                that.wpLeftShow(500);
                that.wpLeftHidden();
            }
            
        }
        clearInterval(interval);
        time = 0;
    }
})