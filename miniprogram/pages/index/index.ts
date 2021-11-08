// index.ts
// 获取应用实例
import createRecycleContext from 'miniprogram-recycle-view'

Page({
  data: {
    userInfo: {},
    newList: [
      {
        id: 1,
        username: '张三',
        mobile: '111',
        campus: '天津科技大学',
        identityCard: '1234234',
        department: '保卫处',
        manager: '刘主任',
        visitDate: '2021-11-07',
        state: 1,
        licensePlate: '',
        healthCode: 'https://img.yzcdn.cn/vant/cat.jpeg',
        tripCode: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
        remark: '备注呀'
      },
      {
        id: 2,
        username: '李四',
        mobile: '111',
        campus: '天津科技大学',
        identityCard: '1234234',
        department: '保卫处',
        manager: '刘主任',
        visitDate: '2021-11-07',
        licensePlate: '',
        state: 21,
        healthCode: 'https://img.yzcdn.cn/vant/cat.jpeg',
        tripCode: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
        remark: '备注呀'
      },
      {
        id: 3,
        username: '王二',
        mobile: '111',
        campus: '天津科技大学',
        identityCard: '1234234',
        department: '保卫处',
        manager: '刘主任',
        visitDate: '2021-11-07',
        licensePlate: '',
        state: 22,
        healthCode: 'https://img.yzcdn.cn/vant/cat.jpeg',
        tripCode: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
        remark: '备注呀'
      },
      {
        id: 4,
        username: '麻子',
        mobile: '111',
        campus: '天津科技大学',
        identityCard: '1234234',
        department: '保卫处',
        manager: '刘主任',
        visitDate: '2021-11-07',
        licensePlate: '',
        state: 23,
        healthCode: 'https://img.yzcdn.cn/vant/cat.jpeg',
        tripCode: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
        remark: '备注呀'
      },
      {
        id: 5,
        username: 'abc',
        mobile: '111',
        campus: 'A',
        identityCard: '1234234',
        department: '保卫处',
        manager: '刘主任',
        visitDate: '2021-11-07',
        licensePlate: '',
        state: 3,
        healthCode: 'https://img.yzcdn.cn/vant/cat.jpeg',
        tripCode: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
        remark: '备注呀备注呀备注呀备注呀备注呀备注呀备注呀备注呀备注呀备注呀备注呀备注呀备注呀备注呀'
      },
      {
        id: 6,
        username: 'abc',
        mobile: '111',
        campus: '天津科技大学',
        identityCard: '1234234',
        department: '保卫处',
        manager: '刘主任',
        visitDate: '2021-11-07',
        licensePlate: '',
        state: 4,
        healthCode: 'https://img.yzcdn.cn/vant/cat.jpeg',
        tripCode: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
        remark: '备注呀'
      }
    ],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData:
      wx.canIUse('open-data.type.userAvatarUrl') &&
      wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  onReady: function () {
    let ctx = createRecycleContext({
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
    ctx.append(this.data.newList)
  },

  onPageScroll: function () { },

  onPullDownRefresh: function () { },

  onReachBottom: function () { },

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  bindItemClick(event: any) {
    let index = event.currentTarget.id
    let registry = this.data.newList[index]
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
        url: '../wait/wait?json=' + json,
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
