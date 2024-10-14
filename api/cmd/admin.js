'use strict'

process.chdir(__dirname)

process.env.RESET_DB_MAX = 1

const fs = require('fs')

const fsp = fs.promises

const chp = require('child_process')

// const parsedoc = require('../lib/helpdoc.js')

const sm4pass = require('sm4-password')

let pass = new sm4pass()

const db = require('../lib/initdb.js')
const admin = require('../model/admin.js')
admin.orm = db

const argv = {

  '@autoDefault': true,

  '@command': [
    'create', 'delete', 'password', 'show', 'help'
  ],

  '@defaultCommand': 'help',

  '-n': {
    alias: '--name',
    name: 'name',
    type: 'string',
    default: ''
  },

  '--super': {
    alias: '-s',
    name: 'super',
    type: 'boolean'
  },

  '-p' : {
    alias: '--password',
    name: 'password',
    type: 'string'
  },

  '--level': {
    alias: '-l',
    name: 'level',
    type: 'number',
    default: 1
  },

}

const parseArgv = require('npargv')

let arg = parseArgv(argv)

;(async () => {

  let args = arg.args

  if (['show', 'help'].indexOf(arg.command) < 0 && !args.name) {
    console.error('缺少用户名，请使用 -n [用户名] 进行操作。')
    console.log('示例：node cmd/admin.js create -n albert -p 12345670')
    console.log('示例：node cmd/admin.js delete -n albert')
    db.end()
    process.exit(1)
  }

  if (arg.command === 'help') {
    try {
      let doc = await fsp.readFile('./doc/admin.md', {encoding: 'utf8'})
      try {
        await fsp.access('./doc/admin.html')
      } catch (err) {
        let cdata = await fsp.readFile('./style/container.html', {encoding: 'utf8'})
        // await fsp.writeFile('./doc/admin.html', cdata.replace('__DOC__', parsedoc(doc)), {encoding: 'utf8'})
        await fsp.writeFile('./doc/admin.html', cdata, {encoding: 'utf8'})
      }

      let cmdname = process.platform.indexOf('win')>=0 ? 'explorer' : 'xdg-open'
      let ch = chp.exec(cmdname + ` file://${__dirname}/doc/admin.html`)
      ch.unref()
    } catch (err) {
      console.log('管理员用户的命令')
      console.log('支持子命令：', argv['@command'].join(' | '))
    }
    return
  }

  if (['create', 'password'].indexOf(arg.command) >= 0 && !args.password) {
    console.error('缺少密码，请指定密码。')
    db.end()
    process.exit(1)
  }

  try {
    let r = await admin.where('username', args.name).get();
    if (r && arg.command === 'create') {
      console.error('用户已经存在。')
      db.end()
      process.exit(1)
    }

    switch (arg.command) {
      case 'create':
        r = await admin.create({
          username: args.name,
          passwd: args.password,
          is_root: args.super ? 1 : 0
        })

        console.log('用户已创建：', args.name, args.password)
        break

      case 'password':
        await admin.where({'username': args.name}).update({
          passwd: pass.make(args.password)
        })
        console.log('密码已更新。')
        break

      case 'delete':
        r = await admin.where({'username': args.name}).delete()
        console.log('用户已删除。')
        break

      case 'show':
        if (args.name) {
          r = await admin.where({'username': args.name}).get()
          console.log(r.id, r.username, r.role)
        } else {
          let ulist = await admin.order('create_time', 'desc').limit(100).select()

          for (let u of ulist) {
            console.log(u.id, u.username, u.role)
          }
        }
      
        break
    }
    
  } catch (err) {
    console.error(err)
    console.error('操作失败：')
    console.error(err.message)
  } finally {
    db.end()
  }
  
})();
