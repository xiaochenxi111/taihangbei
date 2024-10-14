'use strict'

const fs = require('fs')
const funcs = require('./funcs.js')

module.exports = (base_dir = '.', todir='../') => {

  let initdir = base_dir + '/init'

  let flist = fs.readdirSync(initdir, {withFileTypes: true})

  let curdir = ''

  for (let f of flist) {
    if (f.isDirectory()) {
      try {
        fs.accessSync(`${todir}/${f.name}`)
        continue
      } catch (err) {
        fs.mkdirSync(`${todir}/${f.name}`)
      }

      let sublist = fs.readdirSync(`${initdir}/${f.name}`, {withFileTypes: true})
      for (let s of sublist) {
        if (s.isDirectory()) {
          flist.push({name: `${f.name}/${s.name}`, isDirectory: () => true})
        } else if (s.isFile()) {
          try {
            fs.accessSync(`${todir}/${f.name}/${s.name}`)
          } catch (err) {
            fs.copyFileSync(initdir + '/' + f.name + '/' + s.name, todir + '/' + f.name + '/' + s.name)
          }
        }
      }

    } else if (f.isFile()) {
      try {
        fs.accessSync(`${todir}/${f.name}`)
      } catch (err) {
        fs.copyFileSync(initdir + '/' + f.name, todir + '/' + f.name)
      }
    }
  }

}
