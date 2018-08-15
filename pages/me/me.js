const app = getApp()

Page({
    data: {
        sign: [1, 0, 1, 1, 0, 0, 0],
        week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        signToggle: 0,

        userName: '点击登录',
        userPic: '../../img/wps_icon.png'
    },
    //事件处理函数
    onLoad: function() {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
            success: res => {
                app.globalData.userInfo = res.userInfo
                // console.log(app.globalData.userInfo)
                this.setData({
                    userName: res.userInfo.nickName,
                    userPic: res.userInfo.avatarUrl
                    // hasUserInfo: true
                })
            }
        })
    },

    showSign: function() {
        var that = this;
        // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.userInfo" 这个 scope
        // wx.getSetting({
        //     success(res) {
        //         console.log(res.authSetting['scope.userInfo'])
        //         if (!res.authSetting['scope.userInfo']) {
        //             wx.showModal({
        //                 title: '请授权',
        //                 content: '需授权后才能签到领取奖品',
        //                 success: function(res) {
        //                     if (res.confirm) {
        //                         console.log('用户点击确定');
        //                         wx.navigateTo({
        //                             url: '../login/login'
        //                         })
        //                     }
        //                 }
        //             })
        //         } else {
        //             // console.log('已经授权')
        //             that.setData({
        //                 signToggle: (!that.data.signToggle)
        //             })
        //         }
        //     }
        // })
        if(app.globalData.userInfo){
            // console.log(app.globalData.userInfo)
            that.setData({
                signToggle: (!that.data.signToggle)
            })
        }else{
            wx.showModal({
                title: '请授权',
                content: '需授权后才能签到领取奖品',
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击确定');
                        wx.navigateTo({
                            url: '../login/login'
                        })
                    }
                }
            })
            // console.log('没有授权')
        }
    }


})