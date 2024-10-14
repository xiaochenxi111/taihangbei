'use strict'

process.chdir(__dirname)

const initconfig = require('./lib/initconfig.js')

const cluster = require('cluster')


if (cluster.isMaster) {
  initconfig(__dirname)
}

const config = require('./config/config.js')
const app = require('./app.js')

if (app.isWorker) {
  let _app = require('./route.js')
}

queueMicrotask(() => {
  app.daemon(config.port, config.host, config.worker)
})
