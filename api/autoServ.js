'use strict'

process.chdir(__dirname)

const initconfig = require('./lib/initconfig.js')

const cluster = require('cluster')

if (cluster.isMaster) {
  initconfig(__dirname)
}

const AutoReload = require('./lib/autoreload.js')
const config = require('./config/config.js')

let ar = new AutoReload(config.autoreload)

ar.run()
