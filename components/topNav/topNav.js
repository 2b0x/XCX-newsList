Component({
  properties: {
    navData: Array,
    navCur: Number
  },
  data: {
    currentTab: 0,
    navScrollLeft: 0
  },
  attached: function () {
    console.log(this.data.navCur)
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
  },
  methods: {
    switchNav(event) {
      var cur = event.currentTarget.dataset.current;
      //每个tab选项宽度占1/5
      var singleNavWidth = this.data.windowWidth / 5;
      //tab选项居中                            
      this.setData({
        navScrollLeft: (cur - 2) * singleNavWidth
      })
      if (this.data.currentTab == cur) {
        return false;
      } else {
        this.setData({
          currentTab: cur
        })
      }
      //向父组件传值
      this.triggerEvent('myevent',{cur: cur})
    },
    showDemo() {
        console.log('im topNav components');
        var singleNavWidth = this.data.windowWidth / 5;
        this.setData({
            navScrollLeft: (3 - 2) * singleNavWidth,
            currentTab: 3
        })
    }
  }
 
})