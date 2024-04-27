export const wxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        if (res.code) {
          resolve(res)
        } else {
          res.errMsg = res.errMsg || ''
          reject(res)
        }
      },
      fail: (e) => {
        reject(e)
      },
    })
  })
}

export const showToast = (option) => {
  wx.showToast(option)
}

export const showToastSuccess = (title, icon = 'success') => {
  showToast({
    title,
    icon,
  })
}

export const showToastError = (e, icon = 'error') => {
  showToast({
    title: handleErrMsg(e),
    icon,
  })
}

export const handleErrMsg = (e) => {
  let errMsg
  if (Object.prototype.toString.call(e) === '[object String]') {
    errMsg = e
  } else {
    errMsg = (e.data && e.data.msg) || e.errMsg || e.message
  }
  if (errMsg === 'request:fail timeout') {
    return '请求超时'
  }
  return errMsg
}
