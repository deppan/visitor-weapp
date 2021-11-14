// index.ts
import createRecycleContext from 'miniprogram-recycle-view'
const app = getApp()
var ctx: any = null

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData:
      wx.canIUse('open-data.type.userAvatarUrl') &&
      wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  onReady: function () {
    ctx = createRecycleContext({
      id: 'recycleId',
      dataKey: 'recycleList',
      page: this,
      itemSize: {
        width: 162,
        height: 132
      },
      useInPage: true,
      root: getCurrentPages()
    })

    wx.login({
      success: res => {
        this.register(res.code)
      },
    })
  },

  onPageScroll: function () { },

  onPullDownRefresh: function () {
    this.list(true)
  },

  onReachBottom: function () { },

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  bindItemClick(event: any) {
    let index = event.currentTarget.id
    let registry = ctx.getList()[index]
    const events = {
      stateChange: function (newState: number) {
        registry.state = newState
      }
    }
    let json = JSON.stringify(registry)
    if (registry.state == 1) {
      wx.navigateTo({
        url: '../queue/queue?json=' + json,
        events: events
      })
    } else if (registry.state == 21) {
      wx.navigateTo({
        url: '../await/await?json=' + json,
        events: events
      })
    } else if (registry.state == 22) {
      wx.navigateTo({
        url: '../ready/ready?json=' + json,
        events: events
      })
    } else if (registry.state == 23) {
      wx.navigateTo({
        url: '../pass/pass?json=' + json,
        events: events
      })
    } else if (registry.state == 3) {
      wx.navigateTo({
        url: '../reject/reject?json=' + json,
        events: events
      })
    } else if (registry.state == 4) {
      wx.navigateTo({
        url: '../expired/expired?json=' + json,
        events: events
      })
    }
  },

  showLoading() {
    wx.showLoading({
      title: '',
    })
  },
  hideLoading() {
    wx.hideLoading()
    wx.stopPullDownRefresh()
  },

  register(code: string) {
    const that = this
    this.showLoading()
    wx.request({
      url: 'http://192.168.0.100:8888/v1/authorize?code=' + code,
      success(res: any) {
        app.token = res.data.data
        that.list(true)
      },
      fail(err: any) {
        that.hideLoading()
        console.log(err)
      }
    })
  },

  list(refresh: boolean) {
    let that = this
    wx.request({
      url: 'http://192.168.0.100:8888/v1/registries',
      header: {
        'token': app.token
      },
      success: (res: any) => {
        if (res.statusCode == 200) {
          if (refresh) {
            ctx.splice(0, ctx.getList().length, res.data.data)
          } else {
            ctx.append(res.data.data)
          }
        }
        that.hideLoading()
      },
      fail: () => {
        that.hideLoading()
      }
    })
  },

  bindCreate() {
    wx.navigateTo({
      url: '../apply/apply'
    })
  },

  onLoad() {
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
