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
    this.data.json = json
    this.data.registry = JSON.parse(json)
  },

  landing() {
    wx.navigateTo({
      url: '/pages/landing/landing?json=' + this.data.json
    })
  }
})