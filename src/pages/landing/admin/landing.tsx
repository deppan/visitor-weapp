import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { Info } from '../info'
import './landing.scss'

function Landing() {
  return (
    <View>
      <Info></Info>
      <View className="at-row mt-32 mb-48">
        <AtButton className="at-col at-col-4 at-col__offset-1" type="primary">
          通过
        </AtButton>
        <AtButton
          className="at-col at-col-4 at-col__offset-2 error"
          type="primary"
        >
          拒绝
        </AtButton>
      </View>
    </View>
  )
}

export default Landing
