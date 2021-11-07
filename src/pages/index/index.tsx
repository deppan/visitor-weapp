import { BaseEventOrig, Text, View } from '@tarojs/components'
import VirtualList from '@tarojs/components/virtual-list'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { Registry } from 'src/entity/registry'
import { AtFab } from 'taro-ui'
import './index.scss'

interface Item {
  index: number
  data: Registry[]
}

var data: Registry[] = [
  {
    id: 1,
    username: '张三',
    mobile: '111',
    campus: '天津科技大学',
    identityCard: '1234234',
    visitTime: '2021-11-07',
    state: 1,
    licensePlate: '',
    healthCode: [{ url: 'https://img.yzcdn.cn/vant/cat.jpeg' }],
    tripCode: [
      { url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg' }
    ],
    remark: '备注呀'
  },
  {
    id: 2,
    username: '李四',
    mobile: '111',
    campus: '天津科技大学',
    identityCard: '1234234',
    visitTime: '2021-11-07',
    licensePlate: '',
    state: 2,
    healthCode: [{ url: 'https://img.yzcdn.cn/vant/cat.jpeg' }],
    tripCode: [
      { url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg' }
    ],
    remark: '备注呀'
  },
  {
    id: 3,
    username: '王二',
    mobile: '111',
    campus: '天津科技大学',
    identityCard: '1234234',
    visitTime: '2021-11-07',
    licensePlate: '',
    state: 3,
    healthCode: [{ url: 'https://img.yzcdn.cn/vant/cat.jpeg' }],
    tripCode: [
      { url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg' }
    ],
    remark: '备注呀'
  },
  {
    id: 4,
    username: '麻子',
    mobile: '111',
    campus: '天津科技大学',
    identityCard: '1234234',
    visitTime: '2021-11-07',
    licensePlate: '',
    state: 4,
    healthCode: [{ url: 'https://img.yzcdn.cn/vant/cat.jpeg' }],
    tripCode: [
      { url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg' }
    ],
    remark: '备注呀'
  },
  {
    id: 5,
    username: 'abc',
    mobile: '111',
    campus: 'A',
    identityCard: '1234234',
    visitTime: '2021-11-07',
    licensePlate: '',
    state: 5,
    healthCode: [{ url: 'https://img.yzcdn.cn/vant/cat.jpeg' }],
    tripCode: [
      { url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg' }
    ],
    remark: '备注呀'
  },
  {
    id: 6,
    username: 'abc',
    mobile: '111',
    campus: '天津科技大学',
    identityCard: '1234234',
    visitTime: '2021-11-07',
    licensePlate: '',
    state: 6,
    healthCode: [{ url: 'https://img.yzcdn.cn/vant/cat.jpeg' }],
    tripCode: [
      { url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg' }
    ],
    remark: '备注呀'
  }
]

type StateType = {
  registries: Registry[]
}

export default class Index extends Component<any, StateType> {
  constructor(props: any) {
    super(props)
    this.state = {
      registries: data
    }
  }

  componentDidMount() {}

  // onLoad
  onLoad() {}

  // onReady
  onReady() {}

  // 对应 onShow
  componentDidShow() {}

  // 对应 onHide
  componentDidHide() {}

  // 对应 onPullDownRefresh，除了 componentDidShow/componentDidHide 之外，
  // 所有页面生命周期函数名都与小程序相对应
  // onPullDownRefresh() {}
  Row = React.memo<Item>(({ index, data }) => {
    return (
      <View className="card" id={'' + index} onClick={this.onClick}>
        <View className="flex flex-col">
          <View className="title">审核</View>
          <View className="label">{data[index].visitTime}</View>
          <View className="label">{data[index].remark}</View>
        </View>
      </View>
    )
  })

  onClick = (event: BaseEventOrig) => {
    let registry: Registry = this.state.registries[event.currentTarget.id]
    console.log(registry)

    if (registry.state == 1) {
      Taro.navigateTo({
        url: '/pages/landing/user/queue'
      })
    } else if (registry.state == 3) {
      Taro.navigateTo({
        url: '/pages/landing/user/wait'
      })
    } else if (registry.state == 4) {
      Taro.navigateTo({
        url: '/pages/landing/user/pass'
      })
    } else if (registry.state == 5) {
      Taro.navigateTo({
        url: '/pages/landing/user/expired'
      })
    } else {
      Taro.navigateTo({
        url: '/pages/apply/apply'
      })
    }
  }

  render() {
    return (
      <View>
        <VirtualList
          height={500}
          width="100%"
          itemData={this.state.registries}
          itemCount={this.state.registries.length}
          itemSize={110}
        >
          {this.Row}
        </VirtualList>

        <AtFab className="fixed bottom-0 right-0 m-32" onClick={this.onClick}>
          <Text id="action" className="at-fab__icon at-icon at-icon-add"></Text>
        </AtFab>
      </View>
    )
  }
}
