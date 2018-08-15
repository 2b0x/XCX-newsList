Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad: function () {
        // var that = this;
        // // 查看是否授权
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (res) {
                            console.log(res)
                            //从数据库获取用户信息
                            // that.queryUsreInfo();
                            //用户已经授权过
                            // wx.switchTab({
                            //     url: ''
                            // })
                        }
                    });
                }
            }
        })
    },
    bindGetUserInfo: function (e) {
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            var that = this;
            console.log('确认授权')
            //插入登录的用户的相关信息到数据库
            // wx.request({
            //     url: getApp().globalData.urlPath + 'hstc_interface/insert_user',
            //     data: {
            //         openid: getApp().globalData.openid,
            //         nickName: e.detail.userInfo.nickName,
            //         avatarUrl: e.detail.userInfo.avatarUrl,
            //         province: e.detail.userInfo.province,
            //         city: e.detail.userInfo.city
            //     },
            //     header: {
            //         'content-type': 'application/json'
            //     },
            //     success: function (res) {
            //         //从数据库获取用户信息
            //         that.queryUsreInfo();
            //         console.log("插入小程序登录用户信息成功！");
            //     }
            // });
            //授权成功后，跳转进入小程序我的主页
            wx.reLaunch({
                url: '../me/me'
            })
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title: '提醒',
                content: '取消授权将影响更多功能使用，是否确定取消授权？',
                confirmText: '重新授权',
                cancelText: '确定取消',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击了确定')
                    }else if (res.cancel){
                        console.log('用户点击了返回')
                        wx.switchTab({
                            url: '../me/me'
                        })
                    }
                }
            })
        }
    },
    //获取用户信息接口
    queryUsreInfo: function () {
        // wx.request({
        //     url: getApp().globalData.urlPath + 'hstc_interface/queryByOpenid',
        //     data: {
        //         openid: getApp().globalData.openid
        //     },
        //     header: {
        //         'content-type': 'application/json'
        //     },
        //     success: function (res) {
        //         console.log(res.data);
        //         getApp().globalData.userInfo = res.data;
        //     }
        // })
    },

})
