const config = require('./config.js')

const formatTime = (date, mode='long') => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  let arr = [hour, minute, second]

  if (mode === 'short') {
    return [year, month, day].map(formatNumber).join('-')
  }

  if (mode === 'middle') {
    arr = [hour, minute]
  }

  return `${[year, month, day].map(formatNumber).join('-')} ${arr.map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function checkToken() {
  let tk = wx.getStorageSync('token')
  let tktime = wx.getStorageSync('tokenTime')
  let tkexpires = wx.getStorageSync('tokenExpires')
  
  if (!tk || !tktime || !tkexpires) return false

  tktime = parseInt(tktime)
  tkexpires = parseInt(tkexpires)

  if ((tktime + tkexpires - 600000) < Date.now() ) {
    return false
  }

  return true
}

async function mplogin(options=null, loop = 0) {
  let failed = false;

  let code = await new Promise((rv, rj) => {
    wx.login({
      success: r => {
        rv(r.code)
      },

      fail: err => {
        rj(err)
      }
    })
  }).catch(err => {
    failed = true;
  })

  if (failed) {
    return {
      ok: false,
      status: 0,
      data: 'wx.login failed',
      header: {}
    }
  }

  failed = false;

  let ret = await new Promise((rv, rj) => {
    wx.request({
      url: `${config.host}${config.loginPath}/${code}`,
      enableHttp2: config.test ? false : true,
      success : res => {
        if (res.statusCode !== 200) {
          rv({
            ok: false,
            status : res.statusCode,
            header: res.header,
            data: res.data
          })
        } else {
          wx.setStorageSync('token', res.data.token)
          wx.setStorageSync('tokenTime', Date.now())
          wx.setStorageSync('tokenExpires', res.data.expires)
          wx.setStorageSync('userinfo', res.data.userinfo)
  
          rv({
            ok: true,
            status : res.statusCode,
            header: res.header,
            data: res.data
          })
        }
      },

      fail: err => {
        rj(err)
      }
    })
  }).catch(err => {
    failed = true;
  })

  if (failed) {
    return {
      ok: false,
      status: 0,
      data: 'get token failed',
      header: {}
    }
  }

  if (ret.ok && options && loop < 3) {
    return areq(options, loop + 1)
  }

  return ret
}

function qs(obj) {
  let strarr = []
  for (let k in obj) {
    strarr.push(`${k}=${encodeURIComponent(obj[k])}`)
  }

  return strarr.join('&')
}

function checkTokenFailed (d) {
  if (['TOKEN NULL', 'FAILED', 'ILLEGAL', 'TIMEOUT'].indexOf(d) >= 0) {
    return true;
  }

  return false;
}

async function areq(options, loop = 0) {
  if (typeof options === 'string') {
    options = {
      url: options
    }
  }

  let apiurl = options.url;

  if (!((/https?:\/\//).test(apiurl))) {
    apiurl = `${config.host}${apiurl[0] === '/' ? '' : '/'}${apiurl}`;
  }

  if (options.query && typeof options.query === 'object') {
    let q = '?'
    if (apiurl.indexOf('?') > 0) q = '&'

    let qstr = qs(options.query)
    if (qstr) apiurl += q+qstr
  }

  let obj = {
    enableHttp2: config.test ? false : true,
    url: apiurl,
    method: options.method || 'GET',
    header: {}
  }

  if (options.data) {
    obj.data = options.data;
  }

  if (!options.ignoreToken) {
    let token = wx.getStorageSync('token')
    if (token) obj.header.authorization = token
  }
  
  if (options.header) {
    for (let k in options.header) {
      obj.header[k] = options.header[k]
    }
  }

  obj.header['x-version'] = config.version || ''

  obj.timeout = 25000
  if (options.timeout) obj.timeout = options.timeout
  
  let ret = await new Promise((rv, rj) => {
      obj.success = res => {
        let r = {
          ok: true,
          data: res.data,
          status: res.statusCode,
          header: res.header
        }

        if (res.statusCode >= 400) {
          r.ok = false
          rv (r)
        } else {
          rv(r)
        }
      }

      obj.fail = err => {
        rv({
          ok: false,
          status: 0,
          header: {},
          data: (err && err.message) ? err.message : 'request failed',
          error:  err
        })
      }

      if (options.name && options.filePath) {
        obj.name = options.name
        obj.filePath = options.filePath
        wx.uploadFile(obj)
      } else {
        wx.request(obj)
      }

  });

  if (ret.status == 401 || checkTokenFailed(ret.data)) {
    try {
      wx.removeStorageSync('token')
      wx.removeStorageSync('tokenTime')
      wx.removeStorageSync('tokenExpires')
    } catch (err) {}
  
    if (loop < 2) {
      return mplogin(options, loop+1)
    } else {
      ret.data = '权限验证失败，并且遇到网络通信受阻，请稍后再试。'
    }
  }

  return ret;
}

;['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].forEach(m => {
  areq[m.toLowerCase()] = (options, loop=0) => {
    if (typeof options === 'string') options = {url: options}
    options.method = m
    if (m === 'POST' || m === 'PUT' || m === 'PATCH') {
      if (!options.data) {
        throw new Error('POST|PUT|PATCH 请求需要携带data数据')
      }
    }
    return areq(options, loop)
  }
})

let osi = wx.getSystemInfoSync()

function is_ios() {
  return (osi.system.toLowerCase().indexOf('ios') >= 0 
      || osi.model.toLowerCase().indexOf('iphone') >= 0);
}

function is_andorid() {
  return (osi.system.toLowerCase().indexOf('android') >= 0);
}

async function delay(tm=1000) {
  return new Promise(rv => {
    setTimeout(rv, tm)
  })
}

const findUserById=(userId)=>{
    const storedUsers=wx.getStorageSync('mock_userinfo');
    const user = storedUsers.find((user) => user.id === userId);
    return user; 
}
function formatTimestamp(timestamp) {
  const date = new Date(Number(timestamp));
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = {
  formatTime,
  formatTimestamp,
  areq,
  mplogin,
  isIOS: is_ios,
  isAndroid: is_andorid,
  checkToken,
  delay,
  findUserById,
  platform: (is_ios() ? 'ios' : (is_andorid() ? 'android': 'unknow'))
}

