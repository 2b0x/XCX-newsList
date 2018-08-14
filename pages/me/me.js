const app = getApp()

Page({
    data: {
        sign: [1, 0, 1, 1, 0, 0, 0],
        week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        signToggle: 0,
        userInfo: {},
        userName: '点击登录',
        userPic: '../../img/wps_icon.png'
    },
    //事件处理函数
    onLoad: function() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                userName: userInfo.nickName,
                userPic: userInfo.avatarUrl
                // hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    userName: userInfo.nickName,
                    userPic: userInfo.avatarUrl
                    // hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        userName: res.userInfo.nickName,
                        userPic: res.userInfo.avatarUrl
                        // hasUserInfo: true
                    })
                }
            })
        }
    },

    getUserInfo: function(e) {
        if (e.detail.userInfo){
            console.log(e)
            
            app.globalData.userInfo = e.detail.userInfo
            this.setData({
                userInfo: e.detail.userInfo,
                userName: e.detail.userInfo.nickName,
                userPic: e.detail.userInfo.avatarUrl
                // hasUserInfo: true
            })
            // this.showSign();
        }else{
            console.log('用户不允许授权')
            wx.showToast({
                title: '该操作需登录',
                icon: 'none',
                duration: 1500
            })
        }
    },

    showSign: function() {
        var that = this;

        // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.userInfo" 这个 scope
        wx.getSetting({
            success(res) {
                console.log(res.authSetting['scope.userInfo'])
                if (!res.authSetting['scope.userInfo']) {
                    wx.authorize({
                        scope: 'scope.userInfo',
                        success() {
                            // 用户已经同意小程序获取用户信息
                            wx.getUserInfo();
                            that.getUserInfo();
                            res.authSetting = {
                                "scope.userInfo": true,
                                "scope.userLocation": true
                            }
                        },
                        fail() {
                            wx.showModal({
                                title: '请授权',
                                content: '需要用户授权才能登录',
                                success: function (res) {
                                    if (res.confirm) {
                                        console.log('用户点击确定');
                                        wx.openSetting({
                                            success: function(res){
                                                res.authSetting = {
                                                    "scope.userInfo": true,
                                                    "scope.userLocation": true
                                                }
                                            },
                                            fail() {
                                                wx.showModal({
                                                    title: '请设置',
                                                    content: '请设置',
                                                })
                                                
                                            }
                                        });
                                    } else if (res.cancel) {
                                        
                                    }
                                }
                            })
                        }
                    })
                }
            }  
        // this.setData({
        //     signToggle: (!this.data.signToggle)
        // })

    })
    }


})