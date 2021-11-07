import { View } from '@tarojs/components'
import { useState } from 'react'
import { Registry } from 'src/entity/registry'
import { Info } from '../info'

function Landing() {
  var [registry, setRegistry] = useState<Registry>()

  return (
    <View>
      <Info registry={registry}></Info>
    </View>
  )
}

export default Landing
