import { httpGet, httpPost } from '@/utils/http'
import { getTodayCheckInTimeConfig } from '@/api/check-in/config'
import momentUtil from '@/utils/moment-util'
import { getOfflineCheckInRecord, setOfflineCheckInRecord } from '@/utils/wechat-storage-util'
import { WorkInState, WorkOutState } from '@/constant/check-in/check-in-record-const'

const app = getApp()
const baseUrl = '/check-in/check-in-record'

export const getPage = async (current, size, param) => {
  if (!app.globalData.serviceOnline) {
    return getPageOffline(param.date)
  }
  return await httpGet(baseUrl + '/page', { current, size, ...param })
}

const getPageOffline = (date) => {
  const record = getOfflineCheckInRecord()
  const records = []
  if (record && record[date]) {
    records[0] = record[date]
  }
  return {
    data: {
      data: {
        records,
      },
    },
  }
}

export const checkIn = async () => {
  if (!app.globalData.serviceOnline) {
    return await checkInOffline()
  }
  return await httpPost('/check-in/check-in-record/check-in')
}

const checkInOffline = async () => {
  const res = await getTodayCheckInTimeConfig()
  const checkInTimeConfig = res.data.data
  if (!checkInTimeConfig) {
    throw new Error('今天无需打卡哦')
  }
  const now = momentUtil.createMoment()
  const today = momentUtil.formatDate(now)
  let record = null
  let recordObj = getOfflineCheckInRecord()
  if (recordObj) {
    record = recordObj[today]
  } else {
    recordObj = {}
  }
  if (!record) {
    record = {
      date: today,
      workInState: WorkInState.NOT_CHECK_IN.state,
      workOutState: WorkOutState.NOT_CHECK_IN.state,
    }
  }
  let workInState = record.workInState
  let workInTime = momentUtil.createMoment(today + ' ' + checkInTimeConfig.workInTime),
    workOutTime = momentUtil.createMoment(today + ' ' + checkInTimeConfig.workOutTime)
  if (now.isBefore(workInTime)) {
    // 早于上班打卡时间
    if (WorkInState.NOT_CHECK_IN.state === workInState) {
      record.workInState = WorkInState.NORMAL.state
      record.workInTime = momentUtil.formatDateTime(now)
    } else {
      throw new Error('请勿重复打卡')
    }
  } else if (now.isBefore(workOutTime)) {
    // 早于下班打卡时间
    if (WorkInState.NOT_CHECK_IN.state === workInState) {
      record.workInState = WorkInState.LATE.state
      record.workInTime = momentUtil.formatDateTime(now)
    } else {
      throw new Error('还未到下班时间，无法打下班卡')
    }
  } else {
    record.workOutState = WorkOutState.NORMAL.state
    record.workOutTime = momentUtil.formatDateTime(now)
  }
  recordObj[record.date] = record
  setOfflineCheckInRecord(recordObj)
  return {
    data: {
      msg: '打卡成功',
    },
  }
}

export const uploadRecord = async (checkInRecordList) => {
  if (!app.globalData.serviceOnline) {
    throw new Error('服务器不在线')
  }
  return await httpPost(baseUrl + '/upload-record', checkInRecordList)
}
