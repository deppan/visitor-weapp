import { StandardProps, View } from '@tarojs/components'
import { Registry } from 'src/entity/registry'
import { AtImagePicker, AtInput, AtTextarea } from 'taro-ui'
import './info.scss'

interface InfoProps extends StandardProps {
  registry?: Registry | null
}

export function Info(props: InfoProps) {
  var registry = props.registry || {
    id: 1,
    username: 'abc',
    mobile: '111',
    campus: 'A',
    identityCard: '1234234',
    healthCode: [{ url: '' }],
    tripCode: [{ url: '' }],
    visitTime: '',
    licensePlate: '',
    remark: 'abcd'
  }
  return (
    <>
      <AtInput
        title="姓名"
        name="username"
        value={registry.username}
        editable={false}
        onChange={() => {}}
      />
      <AtInput
        name="mobile"
        title="手机号码"
        editable={false}
        value={registry.mobile}
        onChange={() => {}}
      />

      <AtInput
        name="identity_card"
        title="身份证号"
        editable={false}
        value={registry.identityCard}
        onChange={() => {}}
      />

      <AtInput
        name="campus"
        title="学校"
        editable={false}
        value={registry.campus}
        onChange={() => {}}
      />

      <AtInput
        name="visit_name"
        title="访问日期"
        editable={false}
        value={registry.visitTime}
        onChange={() => {}}
      />

      <View className="at-input at-input--without-border">
        <label className="at-input__title" style={{ color: '#333' }}>
          健康码
        </label>
      </View>
      <AtImagePicker
        className="ml-32"
        count={1}
        length={1}
        multiple={false}
        showAddBtn={false}
        files={registry.healthCode}
        onChange={() => {}}
      />
      <View
        className="mt-16"
        style="width:100%;height:1px;background-color:#f0f0f0;margin-left:32rpx"
      />

      <View className="at-input at-input--without-border">
        <label className="at-input__title" style={{ color: '#333' }}>
          行程码
        </label>
      </View>
      <AtImagePicker
        className="ml-32"
        length={1}
        count={1}
        multiple={false}
        showAddBtn={false}
        files={registry.tripCode}
        onChange={() => {}}
      />
      <View
        className="mt-16"
        style="width:100%;height:1px;background-color:#f0f0f0;margin-left:32rpx"
      />

      <View className="at-input at-input--without-border">
        <label className="at-input__title" style={{ color: '#333' }}>
          备注
        </label>
      </View>
      <View className="ml-32 mr-32">
        <AtTextarea
          disabled
          count={false}
          value={registry.remark}
          onChange={() => {}}
        />
      </View>
    </>
  )
}
