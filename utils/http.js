const app = getApp()
const globalData = app.globalData

export const wxRequest = ({ url, data, method, dataType, header }) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            data,
            method,
            dataType,
            header,
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
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            },
        })
    })
}

export const httpGet = (url, data = {}) => {
    return wxRequest({
        url: globalData.requestUrl + url,
        data,
        method: 'GET',
    })
}

export const httpPost = (url, data = {}) => {
    return wxRequest({
        url: globalData.requestUrl + url,
        data,
        method: 'POST',
        header: {
            'content-type': 'application/json',
        },
    })
}

export const httpUploadFile = (url, file) => {
    const token = getToken()
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: globalData.requestUrl + url,
            filePath: file.url,
            name: 'file',
            header: {
                authorization: token,
            },
            success(res) {
                if (typeof res.data === 'string') {
                    try {
                        res.data = JSON.parse(res.data)
                    } catch (e) {
                        console.log(e)
                    }
                }
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            },
        })
    })
}