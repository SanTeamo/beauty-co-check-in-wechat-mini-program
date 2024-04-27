export const setStorageSync = (key, data) => {
  wx.setStorageSync(key, data)
}

export const getStorageSync = (key) => {
  return wx.getStorageSync(key)
}

export const removeStorageSync = (key) => {
  return wx.removeStorageSync(key)
}

const offlineCheckInRecordKey = 'offlineCheckInRecord'

export const setOfflineCheckInRecord = (offlineCheckInRecord) => {
  setStorageSync(offlineCheckInRecordKey, offlineCheckInRecord)
}

export const getOfflineCheckInRecord = () => {
  return getStorageSync(offlineCheckInRecordKey)
}

export const removeOfflineCheckInRecord = () => {
  return removeStorageSync(offlineCheckInRecordKey)
}
