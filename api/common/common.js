const app = getApp()
const globalData = app.globalData

const baseUrl = '/common'

export const serviceOnlineCheck = async () => {
  return new Promise((resolve, reject) => {
    globalData.serviceOnline = false
    const requestTask = wx.request({
      url: globalData.requestUrl + baseUrl + '/service-online-check',
      method: 'get',
      success: (res) => {
        if (res.statusCode !== 200) {
          reject(res)
          return
        }
        const code = res.data.code
        if (code === 401) {
          console.log('登录已过期')
          return
        } else if (code !== 200) {
          reject(res)
          return
        }
        globalData.serviceOnline = true
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
    setTimeout(() => {
      requestTask.abort()
      reject(new Error('请求超时'))
    }, 5000)
  })
}
