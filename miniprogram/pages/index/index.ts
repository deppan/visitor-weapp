// index.ts
// 获取应用实例
import createRecycleContext from 'miniprogram-recycle-view';

Page({
  data: {
    activeNames: ['1'],
    userInfo: {},
    newList: [{ id: 1, title: "1", image_url: "https://img.yzcdn.cn/vant/cat.jpeg" }, { id: 2, title: "2", image_url: "https://img.yzcdn.cn/vant/cat.jpeg" }, { id: 3, title: "3", image_url: "https://img.yzcdn.cn/vant/cat.jpeg" }, { id: 4, title: "4", image_url: "https://img.yzcdn.cn/vant/cat.jpeg" }, { id: 5, title: "5", image_url: "https://img.yzcdn.cn/vant/cat.jpeg" }],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
  },
  onChange(event: any) {
    console.log(event.detail)
    this.setData({
      activeNames: event.detail,
    });
  },
  onReady: function () {
    var ctx = createRecycleContext({
      id: 'recycleId',
      dataKey: 'recycleList',
      page: this,
      itemSize: {
        width: 162,
        height: 182
      },
      useInPage: true,
      root: getCurrentPages()
    })
    ctx.append(this.data.newList)
  },

  onPageScroll: function () {
  },

  onPullDownRefresh: function () {
  },

  onReachBottom: function () {
  },

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  bindX(event: any) {
    console.log(event)
  },
  bindA() {
    wx.navigateTo({
      url: '../apply/apply',
    })
  },
  bindB() {
    wx.navigateTo({
      url: '../landing/admin/landing',
    })
  },
  bindCreate() {
    wx.navigateTo({
      url: '../apply/apply',
    })
  },
  bindUserLanding() {
    wx.navigateTo({
      url: '../landing/user/landing',
    })
  },
  bindReject() {
    wx.navigateTo({
      url: '../reject/reject',
    })
  },
  bindPass() {
    wx.navigateTo({
      url: '../pass/pass',
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
