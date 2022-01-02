import FormData from '../../wx-formdata/formData'
import { url } from '../../utils/util'

const app = getApp()

Page({
  data: {
    loading: true,
    campusPicker: false,
    staffPicker: false,
    username: '',
    hint_username: '请输入姓名',
    err_username: '',
    mobile: '',
    hint_mobile: '请输入手机号',
    err_mobile: '',
    identityCard: '',
    hint_identityCard: '请输入身份证号',
    err_identityCard: '',
    visitTime: '',
    hint_visitTime: '选择到访时间',
    err_visitTime: '',
    licensePlate: '',
    healthCode: [],
    hint_healthCode: '上传健康码',
    err_healthCode: '',
    tripCode: [],
    hint_tripCode: '上传行程码',
    err_tripCode: '',
    campusId: 0,
    campus: '',
    hint_campus: '选择校区',
    err_campus: '',
    campuses: [],
    staffId: '',
    staff: '',
    hint_staff: '选择教工',
    err_staff: '',
    staffMap: new Map(),
    cacheDepartments: [],
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
      url: url() + '/v1/campuses',
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
              cacheDepartments: departments,
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
      fail: () => {
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
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
  },

  onCampusConfirm(event: any) {
    let name = event.detail.value.name
    if (name != null && name != this.data.campus) {
      this.setData({
        campusId: event.detail.value.id,
        campus: event.detail.value.name,
        staff: '',
        staffId: '',
      })
    }
    const picker = this.selectComponent('#picker')
    const children = picker.getColumnValues(1)
    picker.setColumnValues(2, this.data.staffMap.get(this.data.campusId + '_' + children[picker.getIndexes()[1]].code) || [])
    this.onClose()
  },

  onStaffChange(event: any) {
    const { picker, value, index } = event.detail;
    if (index == 0) {
      const children = value[0].children || []
      picker.setColumnValues(1, children);
      if (children.length > 0) {
        picker.setColumnValues(2, this.data.staffMap.get(this.data.campusId + '_' + children[0].code) || [])
      } else {
        picker.setColumnValues(2, [])
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
    } else if (event.target.id === 'remark') {
      this.setData({ remark: text })
    }
  },

  onInputBlur(event: any) {
    const value = event.detail.value
    const id = event.target.id
    if (id == 'username') {
      if (value.length == 0) {
        this.setData({ err_username: this.data.hint_username })
      } else {
        this.setData({ err_username: '' })
      }
    } else if (id == 'mobile') {
      if (value.length == 0) {
        this.setData({ err_mobile: this.data.hint_mobile })
      } else {
        this.setData({ err_mobile: '' })
      }
    } else if (id == 'identity_card') {
      if (!/(?:^\d{15}$)|(?:^\d{18}$)|^\d{17}[\dXx]$/.test(value)) {
        this.setData({ err_identityCard: this.data.hint_identityCard })
      } else {
        this.setData({ err_identityCard: '' })
      }
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
      this.setData({
        healthCode: this.data.healthCode.concat(file),
        err_healthCode: ''
      })
    } else if (name == "tripCode") {
      this.setData({
        tripCode: this.data.tripCode.concat(file),
        err_tripCode: ''
      })
    }
  },

  oversize() {
    wx.showToast({ title: '图片大小不能超过 2M', icon: 'none' });
  },

  a() {
    wx.showToast({
      title: '还有内容未录入',
      icon: 'error',
      duration: 2000
    })
  },
  onSubmit() {
    if (this.data.username.length == 0) {
      this.setData({ err_username: this.data.hint_username })
      this.a()
      return
    }
    if (this.data.mobile.length == 0) {
      this.setData({ err_mobile: this.data.hint_mobile })
      return
    }
    if (this.data.identityCard.length == 0) {
      this.setData({ err_identityCard: this.data.hint_identityCard })
      return
    }
    if (this.data.visitTime.length == 0) {
      this.setData({ err_visitTime: this.data.hint_visitTime })
      return
    }
    if (this.data.campus.length == 0) {
      this.setData({ err_campus: this.data.hint_campus })
      return
    }
    if (this.data.staff.length == 0) {
      this.setData({ err_staff: this.data.hint_staff })
      return
    }
    if (this.data.healthCode.length == 0) {
      this.setData({ err_healthCode: this.data.hint_healthCode })
      return
    }
    if (this.data.tripCode.length == 0) {
      this.setData({ err_tripCode: this.data.hint_tripCode })
      return
    }

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
        url: url() + '/v1/registry',
        data: data.buffer,
        method: 'POST',
        header: {
          'content-type': data.contentType,
          'token': app.token
        },
        success: (res: any) => {
          if (res.statusCode == 200) {
            let json = JSON.stringify(res.data.data)
            wx.redirectTo({
              url: '../queue/queue?json=' + json
            })
          }

          console.log(res.data.data)
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
