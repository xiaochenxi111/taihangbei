'use strict'

const cdpc = require('cdpc')
const fs = require('fs')

const fsp = fs.promises

async function delay(tm=100) {
  return new Promise((rv, rj) => {
    setTimeout(rv, tm);
  })
}

async function showReload(n=9) {
  //console.clear()
  let text = 'reloading ... ...'
  console.log(`\x1b[2;7;34m${text}\x1b[0m`)
  /* for (let i = 0; i < n; i++) {
    if (text.length < 100) text += '...'
    console.log(`\x1b[2;7;35m${text}\x1b[0m`)
    await delay(101)
    //console.clear()
  } */

  //console.log(`\x1b[2;7;35m${text}\x1b[0m`)
}

class AutoReload {

  constructor(options=null) {
    if (!options || typeof options !== 'object') {
      options = {}
    }

    this.reloadTimer = null

    this.watchTable = {}

    this.appfile = 'start.js'

    this.appdir = __dirname + '/..'

    this.watchList = [
      'controller', 'model', 'middleware', 'routes',
      'lib', 'config', 'config', 'app.js', 'init.js', 'start.js'
    ]

    this.fileType = [
      'js', 'mjs', 'json'
    ]

    this.ignore = []

    for (let k in options) {
      if (!options[k]) continue;

      switch (k) {
        case 'appdir':
          typeof options[k] === 'string' && (this[k] = options[k])
          break

        case 'watchList':
          Array.isArray(options[k]) && (this[k] = options[k])
          break
        
        case 'appfile':
          if (typeof options[k] === 'string') {
            this[k] = options[k]
          }
          break

        case 'fileType':
          if (Array.isArray(options[k])) {
            this[k] = options[k]
          }
          break

        case 'ignore':
          if (Array.isArray(options[k])) {
            this[k] = options[k]
          }
          break
      }
    }

    this.watchLock = {}

    this.cm = new cdpc({
      notExit: false,
      notWatch: true
    })

    this.init()
  }

  run(args = '') {
    return this.cm.runChilds({
      name: 'api',
      restart: 'count',
      restartDelay: 2000,
      restartLimit: 1,
      file: this.appdir + '/' + this.appfile,
      args: ['--debug', '--test'],
      options: {
        stdio: ['ignore', 1, 2]
      },

      callback: (ch, cm) => {
        ch.on('spawn', () => {
          //console.clear()
        })
      }
    })
  }

  lastName(name) {
    let arr = name.split('.')
    return arr.length > 1 ? arr[arr.length-1] : ''
  }

  isWatchFile(name) {
    return this.fileType.indexOf(this.lastName(name)) >= 0
  }

  restartApp() {
    if (!this.reloadTimer) {
      showReload()
      this.reloadTimer = setTimeout(() => {
        this.reloadTimer = null
        this.cm.restart('api')
      }, 200)
    }

  }

  init() {
      let make_watch_dir = (dname, pathname) => {
        return async (evt, fname) => {

          //delete file
          /* if (evt === 'rename') {

          } */

          let real_file = `${this.appdir}/${pathname}/${fname}`
          try {
            await fsp.access(real_file)
          } catch (err) {
            return this.restartApp()
          }
          
          let fst
          try {
            fst = await fsp.stat(real_file)
            
            if (fst.isFile()) {
              if (!this.isWatchFile(fname)) return false
            }
          } catch (err) {
            return false
          }

          let evt_file = `${pathname}/${fname}`
          if (!this.watchLock[evt_file]) {
            this.watchLock[evt_file] = {
              time: Date.now()
            }
          } else if (Date.now() - this.watchLock[evt_file].time < 100) {
            return false
          }

          this.watchLock[evt_file].time = Date.now()

          if (this.ignore && this.ignore.indexOf(evt_file) >= 0) {
            return false
          }

          this.restartApp()
        }
      }

      let watch_file = (curr, prev) => {
        this.restartApp()
      }

      this.watchList.forEach(async x => {
          let pathfile = `${this.appdir}/${x}`

          try {
            await fsp.access(pathfile)
          } catch (err) {
            return false
          }

          let fst
          try {
            fst = await fsp.stat(pathfile)
          } catch (err) {
            return false
          }

          if (fst.isFile()) {
            if (!this.watchTable[pathfile]) {
              fs.watchFile(pathfile, watch_file)
            } else {
              this.watchTable[pathfile] = pathfile
            }
          } else if (fst.isDirectory()) {
            if (!this.watchTable[pathfile]) {
              fs.watch(pathfile, make_watch_dir(x, x))
            } else {
              this.watchTable[pathfile] = pathfile
            }

            let flist = await fsp.readdir(pathfile, {withFileTypes: true})
            flist.forEach(f => {
                if (!f.isDirectory()) {
                  return false
                }

                if (this.ignore && this.ignore.indexOf(`${x}/${f.name}`) >= 0) {
                  return false
                }

                let sub_pathfile = `${pathfile}/${f.name}`

                if (!this.watchTable[sub_pathfile]) {
                  fs.watch(sub_pathfile, make_watch_dir(x, `${x}/${f.name}`))
                } else {
                  this.watchTable[sub_pathfile] = sub_pathfile
                }
            })
          }

      })
  }

}

module.exports = AutoReload
