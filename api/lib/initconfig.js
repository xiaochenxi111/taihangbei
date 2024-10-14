'use strict'

const fs = require('fs')
const funcs = require('./funcs.js')

module.exports = (base_dir = '.') => {
  try {
    fs.accessSync(base_dir + '/config')
  } catch (err) {
    funcs.try_mkdir_sync(base_dir + '/config')
  }

  ;['config.js', 'database.js', 'mpkey.js'].forEach(x => {
    try {
      fs.accessSync(base_dir + '/config/' + x)
    } catch (err) {
      fs.copyFileSync(base_dir + '/config-example/' + x, base_dir + '/config/' + x)
    }
  })
}
