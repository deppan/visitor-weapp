import { Icon, View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'

function Pass() {
  function toLanding() {
    Taro.navigateTo({
      url: '/pages/landing/user/landing'
    })
  }

  return (
    <View className="flex flex-col items-center mt-64">
      <Icon size="60" type="success" />
      <View className="at-article__h1 mt-32">准予进入学校</View>

      <View className="at-article__p mt-8">
        请您及时进入学校, 过期后请重新申请
      </View>

      <AtButton className="mt-48" type="secondary" onClick={toLanding}>
        查看详情
      </AtButton>
    </View>
  )
}

export default Pass
