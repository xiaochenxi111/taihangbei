#!/usr/bin/env node

'use strict'

const fs = require('fs')

function fmt_table_name(name) {
  let arr = name.split('')
  let narr = []

  arr.forEach((x, index) => {
    if (/[A-Z]/.test(x) && index > 1 && /[a-z]/.test(arr[index-1])) {
       narr.push('_')
    }

    narr.push(x.toLowerCase())
  })

  return narr.join('')
}

function makeTable(name) {

return `/**
 * column中每个属性都表示一个数据库字段，相关属性和描述如下： 
 * @typedef {object} column
 * @property {string} type - 类型，此属性是必须的，表示数据的类型。
 * @property {string} ref
 *  - 外键引用，格式 ModelName:COLUMN，示例：'user:id'
 *  - 这种方式会直接与user.js模型文件的id字段关联。
 *
 * @property {string|number} default - 默认值。
 *
 * 注意：如果指定ref，type会保持和外键引用的字段一致。
 * ！！尽可能避免使用外键，强烈建议不要大量使用外键。
 */

let table = {
  column: {
    id: {
      type: types.ID
    },

    name: {
      type : types.STRING(100),
      default: ''
    },

    size: types.INT,

    tags: {
      type: types.STRING(300)
    },

    create_time: {
      type : types.BIGINT,
      default: 0,
      timestamp: 'insert'
    },
    
    update_time: {
      type : types.BIGINT,
      default: 0,
      timestamp: 'update'
    }
  },

  //主键id会自动生成，并确保是增长序列，字符串类型的自增长算法可以保证性能，并避免一些安全问题。
  primaryKey: 'id',

  //索引
  index: [
    'create_time'
  ],

  //唯一索引
  unique: [

  ]
}
`
}

function makeModel (name, orgname) {

  let tableCode = makeTable(name)

let mstr = `'use strict'

const Model = require('./Model.js')

let types = Model.dataTypes

${tableCode}
class ${name} extends Model {

  constructor () {
    //必须存在并且写在最前面。
    super()

    this.table = table

    //数据表真正的名称，注意：postgresql不支持表名大写，更改名称请使用小写字母。
    this.tableName = '${fmt_table_name(name)}'

    //主键id前缀，不要超过2字符，请确保前缀 + this.idLen的长度 <= 数据库主键字段的最大长度。
    this.idPre = ''

    this.columns = Object.keys(this.table.column)
  }

  //一些在构造函数执行后才可以初始化的操作，写在init函数中。
  async init() {

  }
}

module.exports = new ${name}()
`
  return mstr

}

let name_preg = /^[a-z][a-z0-9_]{1,60}$/i

function checkName (name) {
  return name_preg.test(name)
}

let mdir = __dirname + '/../model'
let mlist = []


for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i].indexOf('--mdir=') === 0) {

    let t = process.argv[i].substring( '--mdir='.length )

    if (t.length > 0) {
      mdir = t
    }

    continue
  }

  mlist.push(process.argv[i])
}


try {
  fs.accessSync(mdir) 
} catch (err) {
  fs.mkdirSync(mdir)
}

let cpath
let table_dir
for (let c of mlist) {
  if (c.indexOf('/') >= 0) {
    let arr = c.split('/').filter(p => p.length > 0)
    c = arr[arr.length - 1]
  }
  
  if (!checkName(c)) {
    console.error(`${c} 不符合命名要求。(the name is illegal.)\n`
      + `要求至少2个字符，最多60字符，字母开头，支持：字母 数字 和 _`)

    continue
  }

  cpath = `${mdir}/${c}.js`

  try {
    fs.accessSync(cpath)
    console.error(`${c}.js已经存在(${c}.js already exist).`)
    continue
  } catch (err) {}

  try {
    fs.writeFileSync(cpath, makeModel(`${c[0].toUpperCase()}${c.substring(1)}`, c), {encoding: 'utf8'})
  } catch (err) {
    console.error(err)
  }

}
