import { BaseEventOrig, Picker, View } from '@tarojs/components'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import {
  AtInput,
  AtButton,
  AtImagePicker,
  AtTextarea,
  AtFloatLayout,
  AtCalendar
} from 'taro-ui'
import './apply.scss'

function Apply() {
  var [username, setUsername] = useState('')
  var [mobile, setMobile] = useState('')
  var [identityCard, setIdentityCard] = useState('')
  var [visitDate, setVisitDate] = useState('')
  var [open, setOpen] = useState(false)
  var [campus, setCampus] = useState('')
  var campusList = [{ name: 'A' }, { name: 'B' }]
  var [healthCode, setHealthCode] = useState([])
  var [tripCode, setTripCode] = useState([])
  var [licensePlate, setLicensePlate] = useState('')
  var [remark, setRemark] = useState('')

  function onClick(e: any) {
    Taro.redirectTo({
      url: '/pages/landing/user/queue'
    })
  }

  return (
    <view>
      <AtInput
        required
        name="username"
        title="姓名"
        type="text"
        placeholder="请输入姓名"
        value={username}
        onChange={(value: string) => {
          setUsername(value)
        }}
      />

      <AtInput
        required
        name="mobile"
        title="手机号码"
        type="phone"
        placeholder="请输入手机号码"
        value={mobile}
        onChange={(value: string) => {
          setMobile(value)
        }}
      />

      <AtInput
        required
        name="identity_card"
        title="身份证号"
        type="idcard"
        placeholder="请输入身份证号"
        value={identityCard}
        onChange={(value: string) => {
          setIdentityCard(value)
        }}
      />

      <AtInput
        required
        name="visit_name"
        title="访问日期"
        type="text"
        placeholder="请选择访问日期"
        value={visitDate}
        onChange={(value: string) => {
          setVisitDate(value)
        }}
        onFocus={() => {
          setOpen(true)
        }}
      />
      <AtFloatLayout
        title="选择日期"
        isOpened={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <AtCalendar
          minDate={Date.now()}
          currentDate={null}
          onDayClick={(value: any) => {
            setVisitDate(value.value)
          }}
        />
      </AtFloatLayout>

      <Picker
        mode="selector"
        range={campusList}
        rangeKey="name"
        onChange={(value: BaseEventOrig) => {
          console.log(value)
          setCampus(campusList[value.detail.value].name)
        }}
      >
        <AtInput
          required
          name="campus"
          title="学校"
          type="text"
          placeholder="请选择分校"
          value={campus}
          onChange={(value: string) => {
            // /etIdentityCard(value)
          }}
        />
      </Picker>

      <View className="at-input at-input--without-border">
        <label className="at-input__title at-input__title--required">
          健康码
        </label>
      </View>
      <AtImagePicker
        className="ml-32"
        count={1}
        multiple={false}
        showAddBtn={healthCode.length == 0}
        files={healthCode}
        onChange={(value: any) => {
          setHealthCode(value)
        }}
      />
      <View
        className="mt-16"
        style="width:100%;height:1px;background-color:#f0f0f0;margin-left:32rpx"
      />

      <View className="at-input at-input--without-border">
        <label className="at-input__title at-input__title--required">
          行程码
        </label>
      </View>
      <AtImagePicker
        className="ml-32"
        count={1}
        multiple={false}
        showAddBtn={tripCode.length == 0}
        files={tripCode}
        onChange={(value: any) => {
          setTripCode(value)
        }}
      />
      <View
        className="mt-16"
        style="width:100%;height:1px;background-color:#f0f0f0;margin-left:32rpx"
      />

      <AtInput
        name="license_plate"
        title="车牌号码"
        type="text"
        placeholder="请输入车牌号码"
        value={licensePlate}
        onChange={(value: string) => {
          setLicensePlate(value)
        }}
      />

      <View className="at-input at-input--without-border">
        <label className="at-input__title">备注</label>
      </View>
      <View className="ml-32 mr-32">
        <AtTextarea
          placeholder="请输入备注"
          maxLength={64}
          value={remark}
          onChange={(value: string) => {
            setRemark(value)
          }}
        />
      </View>

      <AtButton
        type="primary"
        className="mt-32 mb-48 ml-32 mr-32"
        onClick={onClick}
      >
        提交
      </AtButton>
    </view>
  )
}

export default Apply
