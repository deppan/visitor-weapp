import { url } from '../../utils/util'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'

const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    registry: {},
    json: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options: any) {
    let json = options.json
    this.setData({
      registry: JSON.parse(json),
      json: json
    })
  },

  showLoading() {
    wx.showLoading({
      title: '',
    })
  },
  hideLoading() {
    wx.hideLoading()
  },

  onCancel() {
    const that = this
    Dialog.alert({
      message: '撤消本次申请?',
      showCancelButton: true,
    }).then(() => {
      that.handleCancel()
    }).catch(() => {
    })
  },

  handleCancel() {
    const that = this
    wx.request({
      //@ts-ignore
      url: url + '/v1/registry/' + this.data.registry.id,
      method: 'PUT',
      data: { state: 4 },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': app.token
      },
      success: (res: any) => {
        if (res.statusCode == 200) {
          const eventChannel = this.getOpenerEventChannel()
          eventChannel.emit('stateChange', { newState: 4 })
          wx.navigateBack()
        }
        that.hideLoading()
      },
      fail: () => {
        that.hideLoading()
        wx.navigateBack()
      }
    })
  },

  landing() {
    wx.navigateTo({
      url: '/pages/landing/landing?json=' + this.data.json
    })
  }
})