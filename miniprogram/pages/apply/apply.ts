import FormData from '../../wx-formdata/formData'
import { url } from '../../utils/util'

const app = getApp()

Page({
  data: {
    loading: true,
    campusPicker: false,
    staffPicker: false,
    username: '',
    mobile: '',
    identityCard: '',
    visitTime: '',
    licensePlate: '',
    healthCode: [],
    tripCode: [],
    campusId: 0,
    campus: '',
    campuses: [],
    staffId: '',
    staff: '',
    staffMap: new Map(),
    departments: [{
      values: [],
      className: 'column1',
    },
    {
      values: [],
      className: 'column2',
    },
    {
      values: [],
      className: 'column3',
    }],
    remark: ''
  },

  onReady: function () {
    let that = this
    this.showLoading()
    wx.request({
      url: url + '/v1/campuses',
      method: 'GET',
      header: {
        'token': app.token
      },
      success: (res: any) => {
        that.data.staffMap = new Map()
        if (res.statusCode == 200) {
          const campuses = res.data.data.campuses
          const departments = res.data.data.departments
          if (campuses != null) {
            for (const campus of campuses) {
              const staffs = campus.staffs;
              if (staffs != null) {
                for (const staff of staffs) {
                  const key = campus.id + "_" + staff.department_code
                  if (!that.data.staffMap.has(key)) {
                    const array = new Array()
                    array.push(staff)
                    that.data.staffMap.set(key, array);
                  } else {
                    that.data.staffMap.get(key).push(staff)
                  }
                }
              }
            }
            that.setData({
              campuses: campuses,
              departments: [{
                values: departments,
                className: 'column1',
              },
              {
                values: departments[0].children || [],
                className: 'column2',
              },
              {
                values: that.data.staffMap.get(campuses[0].id + '_' + departments[0].children[0].code) || [],
                className: 'column3',
              }]
            })
          }
        }
        that.setData({ loading: false })
        that.hideLoading()
      },
      fail: (res: any) => {
        that.hideLoading()
        wx.navigateBack()
      }
    })
  },

  showLoading() {
    wx.showLoading({
      title: '加载资源中...',
    })
  },

  hideLoading() {
    wx.hideLoading()
  },

  formatDate(date: number | string | Date) {
    date = new Date(date)
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  },

  onCampusConfirm(event: any) {
    console.log(event)
    let name = event.detail.value.name
    if (name != null && name != this.data.campus) {
      this.setData({
        campusId: event.detail.value.id,
        campus: event.detail.value.name,
        staff: '',
        staffId: '',
      })
    }

    this.onClose()
  },

  onStaffChange(event: any) {
    const { picker, value, index } = event.detail;
    if (index == 0) {
      const children = value[0].children || []
      picker.setColumnValues(1, children);
      if (children.length > 0) {
        picker.setColumnValues(2, this.data.staffMap.get(this.data.campusId + '_' + children[0].code) || [])
      }
    } else if (index == 1) {
      const key = this.data.campusId + '_' + value[1].code
      picker.setColumnValues(2, this.data.staffMap.get(key) || [])
    }
  },

  onStaffConfirm(event: any) {
    const value = event.detail.value[2]
    if (value != null) {
      this.setData({
        staffId: value.id,
        staff: value.name
      })
    }
    this.onClose()
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

  showCampus() {
    this.setData({ campusPicker: true })
  },

  showStaff() {
    if (this.data.campusId == 0) {
      wx.showToast({
        title: '请先选择校区',
        icon: 'error',
        duration: 2000
      })

      return
    }
    this.setData({ staffPicker: true })
  },

  onClose() {
    this.setData({
      showVisitPicker: false,
      campusPicker: false,
      staffPicker: false
    })
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
      formData.append('staff_id', this.data.staffId)
      formData.append('license_plate', this.data.licensePlate)
      formData.append('remark', this.data.remark)
      // @ts-ignore
      formData.appendFile('health_code', this.data.healthCode[0].url)
      // @ts-ignore
      formData.appendFile('trip_code', this.data.tripCode[0].url)
      let data = formData.getData()
      wx.request({
        url: url + '/v1/registry',
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
