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
        windowHeight: 0,
        windowWidth: 0,
        cur: 0,
        offsetTop: 0,
        isHideLoadMore: 'none',

    },

    onLoad: function() {
        var that = this;
        // wx.getSystemInfo({
        //     success: (res) => {
        //         this.setData({
        //             windowHeight: res.windowHeight,
        //             windowWidth: res.windowWidth
        //         })
        //     }
        // }) 
        that.switchList();  
    },

    onReady: function() {
        
    },

    onPullDownRefresh: function () {
        var that = this;
        wx.setNavigationBarTitle({
            title: '刷新中……'
        })

        wx.showNavigationBarLoading();

        this.loadList('refresh', function () {
            wx.stopPullDownRefresh();
            wx.hideNavigationBarLoading();
            wx.setNavigationBarTitle({
                title: 'WPS资讯'
            });
        });
    },

    bottomAad: function () {
        var that = this;
        that.setData({
            isHideLoadMore: 'block'
        })
        setTimeout(function() {
            that.loadList('addMore')
        },800)
        
    },

    hiddenLoadMore: function() {
        var that = this;
        that.setData({
            isHideLoadMore: 'none'
        })
    },

    loadList: function (repaint, callback) {
        var that = this;
        var repaint = repaint;
        var cur = that.data.cur;
        var url = that.data.url + that.data.navData[cur].catid
        var StorageDataCur = 'newslist' + cur;
        wx.request({
            url: url,
            method: 'get',
            success: function(res) {
                // console.log(res)
                var statusCode = res.statusCode;
                if (statusCode == 200) {
                    var status = res.data.result;
                    var total = res.data.data.total;
                    if (status === 'ok' && total > 0) {
                        var newData = res.data.data.news;
                        var oldData = that.data.newslist[cur];
                        if (repaint === 'addMore') {
                            that.data.newslist[cur] = oldData.concat(newData);
                            that.setData({
                                newslist: that.data.newslist
                            })
                        } else if (repaint === 'refresh') {
                            wx.setStorageSync(StorageDataCur, newData)
                            that.data.newslist[cur] = newData.concat(oldData);
                            that.setData({
                                newslist: that.data.newslist
                            })
                        }
                    } else {
                        console.log('not data')
                    }
                }else{
                    console.log('statusCode is not 200')
                } 
            },
            fail: function(res) {
                console.log('request fail')
            }
        })
        this.hiddenLoadMore();
    },

    switchList:function (callback) {
        var that = this;
        var cur = that.data.cur;
        var curData = that.data.newslist[cur];
        if(!curData){
            // console.log('!curData')
            var url = that.data.url + that.data.navData[cur].catid
            var StorageDataCur = 'newslist' + cur;
            var StorageData = wx.getStorageSync(StorageDataCur);
            if(StorageData.length>0){
                // console.log('hasCache')
                that.data.newslist[cur] = StorageData;
                that.setData({
                    newslist: that.data.newslist
                })
            }else{
                wx.request({
                    url: url,
                    method: 'get',
                    success: function (res) {
                        // console.log(res)
                        var statusCode = res.statusCode;
                        if(statusCode==200){
                            var status = res.data.result;
                            var total = res.data.data.total;
                            console.log(total)
                            if (status === 'ok' && total > 0) {
                                var newData = res.data.data.news;
                                wx.setStorageSync(StorageDataCur, newData);
                                that.data.newslist[cur] = newData;
                                that.setData({
                                    newslist: that.data.newslist
                                })
                            } else {
                                console.log('not data')
                            }
                        }else{
                            console.log('statusCode is not 200')
                        }
                    },
                    fail: function (res) {
                        console.log('request fail')
                    }
                })
            }
        }      
        setTimeout(function () {
            that.setData({
                offsetTop: 0
            })
        }, 800)
        callback = callback || function(){};
        callback();
    },


    onMyEvent: function(e) {
        this.data.cur = e.detail.cur;
        this.setData({
            cur: this.data.cur
        })
        this.switchList();
        this.setData({
            offsetTop: '80rpx'
        })
    },

    toDetail: function(e) {
        var targetUrl = encodeURIComponent(e.currentTarget.dataset.url);
        var urls = '../detail/detail?url=' + targetUrl;             
        wx.navigateTo({
            url: urls,
        })
    },

    changeCurrent: function(e) {
        var that = this;
        var cur = e.detail.current;
        that.setData({
            cur: cur,
        })    
        this.selectComponent('#topNav').showDemo();
        this.switchList();
        
    },

    test:function() {
        this.setData({
            cur: 3
        })
    }

})