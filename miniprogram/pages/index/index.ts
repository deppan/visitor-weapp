// index.ts
import { url } from '../../utils/util'
import { Registry } from '../../entity/registry'

const app = getApp()
interface Props {
  userInfo: any,
  width: number,
  registries: Registry[],
  hasUserInfo: boolean,
  canIUse: boolean,
  canIUseGetUserProfile: boolean,
  canIUseOpenData: boolean,
  hasMore: boolean,
  page: number,
};

Component<Props, any, any>({
  data: {
    userInfo: {},
    width: wx.getSystemInfoSync().windowWidth,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    page: 1,
    registries: [],
    hasMore: false,
    canIUseOpenData:
      wx.canIUse('open-data.type.userAvatarUrl') &&
      wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  methods: {
    onReady: function () {
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

    onReachBottom: function () {
      if (this.data.hasMore) {
        this.list(false)
      }
    },

    bindItemClick(event: any) {
      let index = event.currentTarget.id
      let registry = this.data.registries[index]
      const events = {
        stateChange: function (res: any) {
          registry.state = res.newState
          ctx.update(index, 1, registry)
        }
      }
      console.log(registry)
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
          url: '../cancelled/cancelled?json=' + json,
          events: events
        })
      } else {
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
        url: url() + '/v1/authorize?code=' + code,
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
        url: url() + '/v1/registries?page=' + (refresh ? 1 : this.data.page),
        header: {
          'token': app.token
        },
        success: (res: any) => {
          if (res.statusCode == 200) {
            if (refresh) {
              if (res.data.data.length == 10) {
                that.setData({
                  registries: res.data.data,
                  hasMore: true,
                  page: 2,
                })
              } else {
                that.setData({
                  registries: res.data.data,
                  hasMore: false,
                  page: 2,
                })
              }
            } else {
              if (res.data.data.length == 10) {
                that.setData({
                  registries: that.data.registries.concat(res.data.data),
                  hasMore: true,
                  page: that.data.page + 1
                })
              } else {
                that.setData({
                  registries: that.data.registries.concat(res.data.data),
                  hasMore: false,
                  page: that.data.page + 1
                })
              }
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
    },
  },
})
