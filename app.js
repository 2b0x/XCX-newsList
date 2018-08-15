App({
    /**
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     */
    onLaunch: function () {
        var that = this;
        wx.login({
            success: res => {
                // console.log(res)
                // wx.request({
                //     url: that.globalData.wx_url_1 + res.code + that.globalData.wx_url_2,
                //     success: res => {
                //         that.globalData.openid = res.data.openid;
                //     }
                // })
            }
        });
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },

    getUserInfo: function(){
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: this.globalData.userInfo,
                // hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            this.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    // hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    this.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        // hasUserInfo: true
                    })
                }
            })
        }
    },

    /**
     * 设置全局变量
     */
    globalData: {
        userInfo: null,
        openid: 0,
        wx_url_1: '',
        wx_url_2: ''
    }
})
