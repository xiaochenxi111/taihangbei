'use strict'

const Model = require('./Model.js')

const funcs = require('../lib/funcs.js')

let types = Model.dataTypes

class User extends Model {

  constructor() {
    super()

    this.tableName = 'user'

    this.table = {
      column: {
        id: types.UID,
    
        username: types.STRING(50),
    
        nickname: types.STRING(60),
    
        passwd: types.STRING(200),
    
        is_active: {
          type: types.SMALLINT,
          default: 0
        },
    
        sex: {
          type: types.SMALLINT,
          default: 0
        },
    
        realname: types.STRING(50),
    
        create_time: {
          type : types.BIGINT,
          default: 0,
          timestamp: 'insert'
        },
    
        login_time: types.BIGINT,
    
        login_ip: types.STRING(100),
    
        openid: types.STRING(40),
    
        //admin | user
        role: {
          type: types.STRING(12),
          default: 'user'
        },
    
        headimg: types.STRING(100),
      },

      primaryKey: 'id',


      index: [
        'role',
        'create_time',
      ],

      unique: [
        'username',
        'openid'
      ]
    }

    this.primaryKey = 'id'
  }

  async init() {

  }

  async mpcreate(openid) {
    let str = funcs.randstr(10)

    return this.returning(['id', 'role', 'nickname', 'realname', 'openid', 'create_time'])
                .insert({
                  username: 'u_' + str,
                  openid: openid,
                  is_active: 1
                })
  }
}

module.exports = new User()
