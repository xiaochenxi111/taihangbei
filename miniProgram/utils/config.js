'use strict'

let config = {
  version: '1.0.0',
  test: true,
  testPort: ':9991',
  testHost: 'http://127.0.0.1',
  // testPort: '',
  //testHost: 'https://w3xm.cn',
  apiUrl: 'https://fenyu.zhnzhy.top:1239',
  testApiUrl: '',
  loginPath: '/auth/mp-login',
}

if (config.test) {
  config.testApiUrl = `${config.testHost}${config.testPort}`
  config.host = config.testApiUrl
} else {
  config.host = config.apiUrl
}

module.exports = config
