'use strict'

const path = require('path')

module.exports = {
  port: 9991,

  host: '0.0.0.0',

  https: false,

  http2: false,

  allowHTTP1: false,

  //用于https的密钥和证书文件路径
  key: '',
  cert: '',

  debug: true,

  //日志配置
  logType: 'stdio',
  logFile: 'access.log',
  errorLogFile: 'error.log',

  worker: 23,

  /**
   * 密钥可以自行修改，保证16个字符长度即可
   */
  //管理员登录验证的加解密密钥
  adminKey: process.env.ADMIN_KEY || 'wertyujmnbvcxzas',
  //管理员token的有效期
  adminTokenExpires: 3600_000_0,

  //用户登录验证的加解密密钥：用于普通用户和小程序用户
  userKey: process.env.USER_KEY || 'zxasqwerdfcvtygh',
  userTokenExpires: 3600_000_0,

  //开发期间自动加载的配置项，用于告知哪些文件的改变会触发自动重启
  autoreload: {
    appdir: __dirname + '/..',
    appfile: 'start.js',
    fileType: ['js', 'mjs', 'json'],
    ignore: [
      'lib/autoreload.js', 'lib/initconfig.js'
    ],
    watchList: [
      'routes', 'model', 'middleware', 'controller',
      'lib', 'config', 'app.js', 'route.js', 'start.js'
    ]
  },

  /**
   * 跨域设置
   */
  cors: {
    /**
     * 允许跨域的域名，如果需要配置确定的域名，使用以下数组格式：
     * [
     *   'https://xxx.com',
     *   'https://zz.cn'
     * ]
     */
    allow: '*',
    
    //允许的跨域
    allowHeaders: '*',

    optionsCache: 600,
  
    allowEmptyReferer: true,
  
    exposeHeaders: '*'
  },

  /**
   * 在动态加载.env环境变量的Node.js接口没有正式发布之前，
   * 使用配置文件的方式，不再引入新的库或扩展来解决这个问题。
   * 这些变量的配置将会在app.js中添加到进程的环境变量。
   */
  env: {
    //上传文件的存储路径，就是 项目根路径的storage
    STORAGE_DIR: path.resolve(__dirname, '../storage'),
  }
}