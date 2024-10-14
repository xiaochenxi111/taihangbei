'use strict'

process.chdir(__dirname)

const fs = require('fs')
const funcs = require('./lib/funcs.js')

const Titbit = require('titbit')
const npargv = require('npargv')
const {Cors, ToFile} = require('titbit-toolkit')
const TitbitToken = require('titbit-token')
const {initORM, PostgreModel} = require('psqlorm')
const config = require('./config/config.js')
const dbconfig = require('./config/database.js')

//使用npargv解析process.argv参数
let {args} = npargv({
  '@autoDefault': true,

  '--debug': {
    name: 'debug',
    type: 'boolean',
    default: false,
  },

  '--test': {
    name: 'test',
    type: 'boolean',
    default: false,
  },

  '--port': {
    name: 'port',
    type: 'boolean',
    default: 0
  },

})

const app = new Titbit({
  debug: args.debug && config.debug,
  http2: config.http2,
  https: config.https,
  globalLog: true,
  logType: config.logType,
  logFile: './tmp/' + config.logFile,
  errorLogFile: './tmp/' + config.errorLogFile,
  loadInfoType: 'json',
  loadInfoFile: '--mem',
})

if (app.isWorker) {
  if (config.env && typeof config.env === 'object') {
    for (let k in config.env) {
      process.env[k] = config.env[k]
    }
  }
}

if (app.isMaster) {
  ;[
    'storage', 'storage/images', 'storage/audios', 'storage/videos',
    'tmp', 'tmp/events'
  ].forEach(x => {
    funcs.try_mkdir_sync(x)
  })
}

if (app.isWorker) {
  app.addService('TEST', args.test)
  
  //此数据库用于postgres连接，用于快速在控制器使用模板字符串执行sql
  const sql = require('./lib/initsql.js')
  app.addService('sql', sql)

  let db = require('./lib/initdb.js')
  app.addService('db', db)

  //数据库连接保持在原型上，后续model初始化，不必传递参数，会自动获取连接
  PostgreModel.prototype.__pqorm__ = db

  app.addService('storageDir', __dirname + '/storage')

  //全局跨域支持
  app.pre(new Cors({
    methods : [
      'GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'
    ],
    
    allow: config.cors.allow || '*',
    
    allowHeaders : config.cors.allowHeaders || '*',
  
    optionsCache: config.cors.optionsCache || 600,
  
    allowEmptyReferer: !!config.cors.allowEmptyReferer,
  
    exposeHeaders: config.cors.exposeHeaders || '*'
  }))

  //全局启用ToFile扩展
  app.use(new ToFile(), {method: ['POST', 'PUT', 'PATCH']})
}

if (app.isWorker) {
  app.addService('userToken', new TitbitToken({
    key: config.userKey,
    expires: config.userTokenExpires
  }))

  app.addService('adminToken', new TitbitToken({
    key: config.adminKey,
    expires: config.adminTokenExpires
  }))
}

module.exports = app
