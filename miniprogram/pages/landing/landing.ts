import { url } from '../../utils/util'

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
    let registry = JSON.parse(json)
    registry.health_code = this.assembleImage(registry.health_code)
    registry.trip_code = this.assembleImage(registry.trip_code)
    this.setData({
      registry: registry
    })
  },

  assembleImage(path: string) {
    return url() + path;
  }
})