Page({

  /**
   * Page initial data
   */
  data: {
    registry: {},
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options: any) {
    let json = options.json
    this.setData({
      registry: JSON.parse(json)
    })
  },
})