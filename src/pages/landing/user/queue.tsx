import { Icon, View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'

function Queue() {
  function toLanding() {
    Taro.navigateTo({
      url: '/pages/landing/user/landing'
    })
  }

  return (
    <View className="flex flex-col items-center mt-64">
      <Icon size="60" type="waiting" />
      <View className="at-article__h1 mt-32">审核中</View>

      <View className="at-article__p mt-8">
        您的申请已经提交, 审核结果会通过微信及时通知您
      </View>

      <View className="at-row mt-48">
        <AtButton
          className="at-col at-col-4 at-col__offset-4"
          type="secondary"
          onClick={toLanding}
        >
          查看详情
        </AtButton>
        <AtButton
          className="at-col at-col-4 at-col__offset-1 warning"
          type="primary"
        >
          撤消申请
        </AtButton>
      </View>
    </View>
  )
}

export default Queue
