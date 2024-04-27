import Toast from '@vant/weapp/toast/toast'
import { uploadRecord } from '@/api/check-in/record'
import { getOfflineCheckInRecord } from '@/utils/wechat-storage-util'
import { handleErrMsg } from '@/utils/wechat-util'

Page({
  data: {},
  onLoad: function () {},
  async uploadCheckInRecord() {
    const checkInRecordList = getOfflineCheckInRecord()
    if (!checkInRecordList || checkInRecordList.length <= 0) {
      Toast.fail('没有可上传的打卡记录')
      return
    }
    try {
      await uploadRecord(checkInRecordList)
      Toast.success('上传成功')
    } catch (e) {
      const errMsg = handleErrMsg(e)
      Toast.fail(errMsg)
    }
  },
})
