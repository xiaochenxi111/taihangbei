'use strict'

const Model = require('./Model.js')
const sm4pass = require('sm4-password')

let types = Model.dataTypes

let table = {
  column: {
    /**
     * @type {column}
     * id默认是主键，不需要再加入到unique索引。
     * */
    id: {
      type : dataTypes.UID
    },

    /**
     * @type {column}
     * */
    username: {
      type : dataTypes.STRING(50),
      default: ''
    },

    realname: {
      type: dataTypes.STRING(50),
      default: ''
    },

    //其他信息，以JSON格式存储
    info: {
      type: dataTypes.TEXT,
      default: ''
    },

    /**
     * @type {column}
     */
    passwd: {
      type: dataTypes.STRING(240)
    },

    /**
     * @type {column}
     * */
    create_time: {
      type : dataTypes.BIGINT,
      default: 0,
      //执行insert时自动生成时间戳
      timestamp: 'insert'
    },
    
    /**
     * @type {column}
     * */
    update_time: {
      type : dataTypes.BIGINT,
      default: 0,
      //执行update时自动生成时间戳
      timestamp: 'update'
    },

    level: {
      type: dataTypes.SMALLINT
    },

    forbid: {
      type: 'smallint',
      default: 0
    },

    is_root: {
      type: dataTypes.SMALLINT,
      default: 0
    },

    failed_count: {
      type: dataTypes.INT,
      default: 0
    },

    failed_time: {
      type: dataTypes.BIGINT,
      default: 0
    },
  },

  //索引
  index: [
    'create_time',
    'update_time',
    'is_root'
  ],

  //唯一索引，注意：主键本身就是唯一索引，不必在此重复。
  unique: [
    'username'
  ],

  primaryKey: 'id'
}

//生成hash密码以及验证密码的扩展
const upass = new sm4pass()

class Admin extends Model {
  constructor() {
    super()

    this.tableName = 'admin'
    this.table = table

    this.upass = upass

    this.failedTimeout = 180_000

    this.columns = Object.keys(this.table.column)
    this.selectField = []

    this.columns.forEach(x => {
      x !== 'passwd' && this.selectField.push(x)
    })
  }

  async loginVerify(username, passwd) {
    let fields = [
      'id', 'username', 'passwd', 'level', 'forbid', 'realname',
      'failed_count', 'failed_time', 'is_root'
    ]

    let u = await this.where('username', username).get(fields)

    if (!u) {
      return {
        ok: false,
        errmsg: '用户名或密码错误'
      }
    }

    if (u.forbid) {
      return {
        ok: false,
        errmsg: '此用户已被冻结'
      }
    }

    let tm = Date.now()
    if (u.failed_count > 9 && parseInt(u.failed_time) + this.failedTimeout > tm) {
      return {
        ok: false,
        errmsg: '登录失败次数过多，请3分钟以后再试。'
      }
    }

    let v = upass.verify(passwd, u.passwd)
    if (!v.ok) {
      this.where('id', u.id).update({
        failed_count: u.failed_count < 100 ? u.failed_count + 1 : u.failed_count,
        failed_time: tm
      })

      return {
        ok: false,
        errmsg: '用户名或密码错误'
      }
    }

    this.where('id', u.id).update({
      failed_count: 0,
      failed_time: 0
    })

    return {
      ok: true,
      data: {
        id: u.id,
        username: u.username,
        level: u.level,
        realname: u.realname,
        is_root: u.is_root
      }
    }

  }

  /**
   * 
   * @param {object} data
   *  - role
   *  - passwd
   *  - username 
   * @returns {object}
   */
  async create(data) {
    data.create_time = Date.now()

    if (!data.username) {
      data.username = 'a' + Math.random().toString(16).substring(2)
    }

    let u = await this.where('username', data.username).get()
    if (u) {
      throw new Error('用户已存在：'+data.username)
    }

    if (!data.passwd) {
      data.passwd = '1234567.'
    }

    data.passwd = upass.make(data.passwd)

    return this.returning(['id', 'username', 'level']).insert(data)
  }

  async verifyPasswd(id, pass) {
    let u = await this.where('id', id).get()
    if (!u) return false

    let v = upass.verify(pass, u.passwd)

    if (!v.ok) return false

    return true
  }

  async updatePasswd(id, data) {
    data.passwd = upass.make(data.passwd)
    return this.where('id', id).update(data)
  }
}

module.exports = new Admin()
