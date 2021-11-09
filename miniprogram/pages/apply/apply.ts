import FormData from '../../wx-formdata/formData'

Page({
  data: {
    username: '',
    mobile: '',
    identityCard: '',
    visitTime: '',
    campus: '',
    licensePlate: '',
    healthCode: [],
    tripCode: [],
    remark: ''
  },

  formatDate(date: number | string | Date) {
    date = new Date(date)
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  },

  onTextChange(event: any) {
    var text = event.detail
    if (event.target.id === 'username') {
      this.setData({ username: text })
    } else if (event.target.id === 'mobile') {
      this.setData({ mobile: text })
    } else if (event.target.id === 'identity_card') {
      this.setData({ identityCard: text })
    }
  },

  showPopup() {
    this.setData({ showVisitPicker: true })
  },

  onClose() {
    this.setData({ showVisitPicker: false })
  },

  onConfirm(event: any) {
    this.setData({
      showVisitPicker: false,
      visitTime: this.formatDate(event.detail)
    })
  },

  delete(event: any) {
    const { index, name } = event.detail;
    if (name == 'healthCode') {
      var fileList = this.data.healthCode
      fileList.splice(index, 1);
      this.setData({ healthCode: fileList });
    } else if (name == "tripCode") {
      var fileList = this.data.tripCode
      fileList.splice(index, 1);
      this.setData({ tripCode: fileList });
    }
  },

  afterRead(event: any) {
    const { file, name } = event.detail
    console.log(file)
    if (name == "healthCode") {
      this.setData({ healthCode: this.data.healthCode.concat(file) })
    } else if (name == "tripCode") {
      this.setData({ tripCode: this.data.tripCode.concat(file) })
    }
  },

  oversize() {
    wx.showToast({ title: '图片大小不能超过 2M', icon: 'none' });
  },

  onSubmit() {
    try {
      let formData = new FormData();
      // @ts-ignore
      formData.appendFile('health_code', this.data.healthCode[0].url)
      let data = formData.getData()
      wx.request({
        url: 'http://192.168.2.217:9999/v1/registry',
        data: data.buffer,
        method: 'POST',
        header: {
          'content-type': data.contentType
        },
        success: (res: any) => {
          console.log(res)
        },
        fail: (res: any) => {
          console.log(res)
        }
      })
    } catch (e: any) {
      console.log(e)
    }
    wx.redirectTo({
      url: '../queue/queue'
    })
  }
})
