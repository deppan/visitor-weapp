import { Icon, View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'

function Expired() {
  function toLanding() {
    Taro.navigateTo({
      url: '/pages/landing/user/landing'
    })
  }

  return (
    <View className="flex flex-col items-center mt-64">
      <Icon size="60" type="warn" />
      <View className="at-article__h1 mt-32">申请已过期</View>

      <View className="at-article__p mt-8">您的申请已经过期, 请重新申请</View>

      <AtButton className="mt-48" type="secondary" onClick={toLanding}>
        查看详情
      </AtButton>
    </View>
  )
}

export default Expired
