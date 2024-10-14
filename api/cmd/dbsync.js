'use strict'

process.chdir(__dirname)

/**
 * 这是自动同步表结构的命令，只有当你更改了model中的表示表结构的object，才需要运行此命令
 */

const psqlorm = require('psqlorm')
let PostgreModel = psqlorm.PostgreModel

const pg = require('pg')
const dbconfig = require('./config/database.js')
const fs = require('fs')

let dbcfg = dbconfig.connect

let cfg = {
  user: dbcfg.username,
  password: dbcfg.password,
  host: dbcfg.host,
  port: dbcfg.port,
  database: dbcfg.database,
  max: 2
}

function fmtFileName (a) {

  if (a.indexOf('/') > 0) {
    let paths = a.split('/').filter(p => p.length > 0)
    if (paths.length > 1) {
      a = paths[ paths.length - 1 ]
    }
  }

  if (a.indexOf('.js') < 0) {
    return `${a}.js`
  }

  return a
}

let filelist = []

let dbdir = './model'

let schema = dbconfig.schema

if (process.argv.length > 2) {
  for (let i = 2; i < process.argv.length; i++) {

    if (process.argv[i].indexOf('--dir=') === 0) {
      dbdir = process.argv[i].substring(6)
      continue
    }

    if (process.argv[i].indexOf('--schema=') === 0) {
      schema = process.argv[i].substring(9)
      continue
    }

    if (process.argv[i].indexOf('--') === 0) {
      continue
    }

    filelist.push( fmtFileName(process.argv[i]) )
  }
}

let pdb = new pg.Pool(cfg)
let pqorm = new psqlorm(pdb)

pqorm.setSchema(schema)

PostgreModel.prototype.__pqorm__ = pqorm

function checkAllowSchema(schema, mobj) {
  if (mobj.denySchema) {
    if (typeof mobj.denySchema === 'string' && schema !== mobj.denySchema) {
      return false;
    }

    if (mobj.denySchema instanceof RegExp && !mobj.denySchema.test(schema)) {
      return false;
    }

    if (Array.isArray(mobj.denySchema) && mobj.denySchema.indexOf(schema) >= 0) {
      return false;
    }

    if (typeof mobj.denySchema === 'function' && mobj.denySchema(schema) === false) {
      return false;
    }
  }

  return true;
}

let end_code = 0

;(async () => {
  
  try {
    
    await pdb.query(`create schema if not exists ${schema}`)

    let m

    process.chdir(dbdir)

    let files = fs.readdirSync('./', {withFileTypes: true})

    let models = []

    for (let i = 0; i < files.length; i++) {
      if (!files[i].isFile()) {
        continue
      }
      
      if (files[i].name.indexOf('.js') < 0) {
        continue
      }

      if (files[i].name[0] === '!' || files[i].name[0] === '_') {
        continue
      }

      if (filelist.length > 0 && filelist.indexOf(files[i].name) < 0) {
        continue
      }

      //m = require(`${dbdir}/${files[i].name}`)

      m = require(`${process.cwd()}/${files[i].name}`)

      if (! ((m && m instanceof PostgreModel) 
          || (m && m.prototype && m.prototype instanceof PostgreModel) )
      ) {
        console.error(`${dbdir}/${files[i].name}`, '不是合法的Model导出模块。')
        continue
      }

      if (m.name === 'Model' && m.__proto__ && m.__proto__.name === 'PostgreModel') continue

      if (m instanceof PostgreModel) {
        models.push(m)
      } else {
        models.push(new m(pqorm))
      }
    }

    await new Promise((rv, rj) => {
      setTimeout(rv, 5)
    })

    for (let mobj of models) {
        if (!mobj.tableName 
          || !mobj.table
          || !mobj.table.column
          || mobj.syncLock)
        {
          continue
        }

        if (!checkAllowSchema(schema, mobj)) {
          continue
        }

        /* if (!mobj.modelPath) {
          mobj.modelPath = __dirname + (dbdir[0] === '/' ? '' : '/') + dbdir
        } */

        await mobj.sync(true, true, true)

        if (mobj.syncinit && typeof mobj.syncinit === 'function') {
          await mobj.syncinit();
        }
    }
  
  } catch (err) {
    console.error(err)
    end_code ++
  } finally {
    pdb.end()
  }

  process.exit(end_code)
})();
