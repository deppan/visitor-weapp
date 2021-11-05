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
    remark: '',
  },
  formatDate(date: number | string | Date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
  onTextChange(event: any) {
    var text = event.detail
    if (event.target.id === "username") {
      this.setData({ username: text })
    } else if (event.target.id === "mobile") {
      this.setData({ mobile: text })
    } else if (event.target.id === "identity_card") {
      this.setData({ identityCard: text })
    }
  },
  showPopup() {
    this.setData({ showVisitPicker: true });
  },
  onClose() {
    this.setData({ showVisitPicker: false });
  },
  onConfirm(event: any) {
    this.setData({
      showVisitPicker: false,
      visitTime: this.formatDate(event.detail),
    });
  },
  onSubmit() {
    wx.redirectTo({
      url: '../landing/user/landing',
    })
  }
})