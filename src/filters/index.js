import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn') // 把默认语言调整为中文
dayjs.extend(relativeTime)
export const dataformat = (time) => {
  return dayjs(time).fromNow()
}
