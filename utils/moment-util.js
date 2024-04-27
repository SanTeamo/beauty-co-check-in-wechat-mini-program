import moment from 'moment'
import { DATE, DATE_TIME, TIME } from '@/constant/moment-const'
// moment 语言环境
moment.locale('zh-CN')

const momentUtil = {
  format: function (time, format = DATE_TIME) {
    return moment(time).format(format)
  },
  formatDate: function (time) {
    return momentUtil.format(time, DATE)
  },
  formatDateTime: function (time) {
    return momentUtil.format(time, DATE_TIME)
  },
  formatTime: function (time) {
    return momentUtil.format(time, TIME)
  },
  duration: function (d, unit) {
    // 默认毫秒
    return moment.duration(d, unit)
  },
  durationHumanize: function (d, unit) {
    const duration = momentUtil.duration(d, unit)
    const iso = duration.toISOString().replace('P', '')
    const split = iso.split('T')
    const date = split[0]
    const time = split[1]
    return (
      date.replace('Y', '年').replace('M', '月').replace('D', '天') +
      time.replace('H', '小时').replace('M', '分钟').replace('S', '秒')
    )
  },
  getDuration: function (start, end) {
    let diff = moment(start).diff(end)
    if (Number.isNaN(diff)) {
      return null
    }
    if (diff < 0) {
      diff = -diff
    }
    return moment.duration(diff)
  },
  createMoment: function (time) {
    return moment(time)
  },
  startOf: function (time, unitOfTime) {
    return moment(time).startOf(unitOfTime)
  },
  startOfFormat: function (time, unitOfTime, format) {
    return momentUtil.startOf(time, unitOfTime).format(format)
  },
  startOfDay: function (time, format = DATE_TIME) {
    return momentUtil.startOfFormat(time, 'day', format)
  },
  startOfMonth: function (time, format = DATE_TIME) {
    return momentUtil.startOfFormat(time, 'month', format)
  },
  startOfMonthDay: function (time, format = DATE) {
    return momentUtil.startOfFormat(time, 'month', format)
  },
  startOfYear: function (time, format = DATE_TIME) {
    return momentUtil.startOfFormat(time, 'year', format)
  },
  endOf: function (time, unitOfTime) {
    return moment(time).endOf(unitOfTime)
  },
  endOfFormat: function (time, unitOfTime, format) {
    return momentUtil.endOf(time, unitOfTime).format(format)
  },
  endOfDay: function (time, format = DATE_TIME) {
    return momentUtil.endOfFormat(time, 'day', format)
  },
  endOfMonth: function (time, format = DATE_TIME) {
    return momentUtil.endOfFormat(time, 'month', format)
  },
  endOfMonthDay: function (time, format = DATE) {
    return momentUtil.endOfFormat(time, 'month', format)
  },
  unixFormat: function (time, format = DATE_TIME) {
    return moment.unix(time).format(format)
  },
}

module.exports = momentUtil
