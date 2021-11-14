import FormData from '../../wx-formdata/formData'
const app = getApp()

Page({
  data: {
    username: '',
    mobile: '',
    identityCard: '',
    visitTime: '',
    campusId: '1',
    departmentId: '1',
    staffId: '1',
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
      formData.append('username', this.data.username)
      formData.append('mobile', this.data.mobile)
      formData.append('identity_card', this.data.identityCard)
      formData.append('visit_time', this.data.visitTime)
      formData.append('campus_id', this.data.campusId)
      formData.append('department_id', this.data.departmentId)
      formData.append('staff_id', this.data.staffId)
      formData.append('license_plate', this.data.licensePlate)
      formData.append('remark', this.data.remark)
      // @ts-ignore
      formData.appendFile('health_code', this.data.healthCode[0].url)
      // @ts-ignore
      formData.appendFile('trip_code', this.data.tripCode[0].url)
      let data = formData.getData()
      wx.request({
        url: 'http://192.168.0.100:8888/v1/registry',
        data: data.buffer,
        method: 'POST',
        header: {
          'content-type': data.contentType,
          'token': app.token
        },
        success: (res: any) => {
          if (res.statusCode == 200) {
            let json = JSON.stringify(res.data)
            wx.redirectTo({
              url: '../queue/queue?json=' + json
            })
          }

          console.log(res)
        },
        fail: (res: any) => {
          console.log(res)
        }
      })
    } catch (e: any) {
      console.log(e)
    }
  }
})
