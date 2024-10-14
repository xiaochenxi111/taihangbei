'use strict'

const fs = require('fs')

let fsp = fs.promises

const funcs = require('./funcs.js')

function makeModName(name) {
  let eind = name.length - 1
  while (eind > 0) {
    if (name[eind] === '.') return name.substring(0, eind)
    eind--
  }

  return name
}

/**
 * 
 * @param {object} app - app实例 
 * @param {string} path - 路径
 */
function loadRoute(path) {
  let routeTable = {}

  let flist = fs.readdirSync(path, {withFileTypes: true})
  let rt = null

  for (let f of flist) {
    if (f.isDirectory()) {
      let sublist = fs.readdirSync(path + '/' + f.name, {withFileTypes: true})
      let obj = routeTable[f.name.trim()] = {}

      for (let s of sublist) {
        let extname = funcs.extName(s.name)
        if (s.isFile() && ['.js', '.mjs'].indexOf(extname) >= 0) {
          let r
          let modname
          try {
            modname = makeModName(s.name)
            r = require(`${path}/${f.name}/${s.name}`)
          } catch (err) {
            console.error(err)
            console.error(`加载路由文件错误：${f.name}/${s.name}`)
            console.error(`为避免后续错误，将会使用空函数代替，请尽快检查错误并修改`)
            r = async (ctx) => {}
          }

          if (obj[modname]) {
            console.error(`${f.name}: ${modname} 已经存在，后续加载的模块会覆盖，请修改冲突文件。`)
          }
          obj[modname] = r
        }
      }
    } else if (f.isFile() && ['.js', '.mjs'].indexOf(f.name) >= 0) {
      let obj = routeTable
      let modname
      let r
      try {
        modname = makeModName(f.name)
        r = require(`${path}/${f.name}`)
      } catch (err) {
        console.error(err)
        console.error(`加载路由文件错误：${f.name}/${s.name}`)
        console.error(`为避免后续错误，将会使用空函数代替，请尽快检查错误并修改`)
        r = async (ctx) => {}
      }

      if (obj[modname]) {
        console.error(`${f.name}: ${modname} 已经存在，后续加载的模块会覆盖，请修改冲突文件。`)
      }
      obj[modname] = r
    }
  }

  return routeTable
}

module.exports = loadRoute
