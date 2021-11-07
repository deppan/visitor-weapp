import { File } from 'taro-ui/types/image-picker'

export interface Registry {
  id: number
  username: string
  identityCard: string
  mobile: string
  visitTime: string
  campus: string
  healthCode?: [File]
  tripCode?: [File]
  state: number
  licensePlate: string
  remark: string
}
