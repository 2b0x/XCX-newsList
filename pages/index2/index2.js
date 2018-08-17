// var time = 0;
// var touchDotX = 0;//触摸时X轴的原点
// var touchDotY = 0;//触摸时y轴的原点
// var interval = "";
// var flag_hd = true;
// var loadingTime = "";

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
        // wpL: '-100%',
        // wpR: '-100%',
        // wpLShow: 'block',
        // wpRShow: 'block',
        windowHeight: 0,
        windowWidth: 0,
        cur: 0,
        isHideLoadMore: 'none',
        // scrollHeight: 0,
        // isfrist: '1',
        // wrapperShow: '' 
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
        
        // for(var i=0;i<this.data.navData.length;i++){
        //     var StorageDataCur = 'newslist' + i;
        //     var StorageData = wx.getStorageSync(StorageDataCur);
        // }
        // that.data.newslist[cur]
        // var cache =  
    },

    onReady: function() {
        // this.loadList('switch');
        this.switchList();
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
        this.setData({
            isHideLoadMore: 'block'
        })
        this.loadList('addMore')
        console.log(123)
    },

    loadList: function (repaint, callback) {
        var that = this;
        var repaint = repaint;
        var cur = that.data.cur;
        var url = that.data.url + that.data.navData[cur].catid
        var StorageDataCur = 'newslist' + cur;
        // var StorageData = wx.getStorageSync(StorageDataCur);
        wx.request({
            url: url,
            method: 'get',
            success: function(res) {
                console.log(res)
                var status = res.data.result;
                var total = res.data.data.total;   
                if(status==='ok' && total>0){
                    var newData = res.data.data.news;
                    var oldData = that.data.newslist[cur];
                    // console.log('loading success') addMore   refresh   switch
                    if(repaint==='addMore'){
                        that.data.newslist[cur] = oldData.concat(newData);
                        that.setData({
                            newslist: that.data.newslist
                        })
                    }else if(repaint==='refresh'){
                        wx.setStorageSync(StorageDataCur, newData)
                        that.data.newslist[cur] = newData.concat(oldData);
                        that.setData({
                            newslist: that.data.newslist
                        })
                    }
                }else{  
                    console.log('loading fail')
                }
            },
            fail: function(res) {
                
            }
        })
    },

    switchList:function () {
        console.log('switchList')
        var that = this;
        var cur = that.data.cur;
        var curData = that.data.newslist[cur];
        if(!curData){
            console.log('!curData')
            var url = that.data.url + that.data.navData[cur].catid
            var StorageDataCur = 'newslist' + cur;
            var StorageData = wx.getStorageSync(StorageDataCur);
            if(StorageData.length>0){
                console.log('hasCache')
                console.log(StorageData.length);
                that.data.newslist[cur] = StorageData;
            }else{
                wx.request({
                    url: url,
                    method: 'get',
                    success: function (res) {
                        console.log(res)
                        var status = res.data.result;
                        var total = res.data.data.total;
                        if (status === 'ok' && total > 0) {
                            var newData = res.data.data.news;
                            wx.setStorageSync(StorageDataCur, newData);
                            that.data.newslist[cur] = newData;    
                        } else {
                            console.log('loading fail')
                        }
                    },
                    fail: function (res) {
                        console.log('request fail')
                    }
                })
            }
            that.setData({
                newslist: that.data.newslist
            })
        }  
    },


    onMyEvent: function(e) {
        this.data.cur = e.detail.cur;
        this.setData({
            cur: this.data.cur
        })
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        })
        // this.loadList('switch')
        this.switchList();
    },

    toDetail: function(e) {
        var targetUrl = encodeURIComponent(e.currentTarget.dataset.url);
        // console.log(targetUrl)
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
        // that.loadList('switch')
        this.switchList();
    },

    test:function() {
        this.setData({
            cur: 3
        })
    }

})