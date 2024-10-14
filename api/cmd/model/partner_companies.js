'use strict'

const Model = require('./Model.js')

let types = Model.dataTypes

/**
 * column中每个属性都表示一个数据库字段，相关属性和描述如下： 
 * @typedef {object} column
 * @property {string} type - 类型，此属性是必须的，表示数据的类型。
 * @property {string|number} default - 默认值。
 */

let table = {
  column: {
    id: {
      type: types.ID,
      primary: true,
      default: ''
    },
    name: {
      type: types.STRING(100),
      default: ''
    },
    contact_person: {
      type: types.STRING(100),
      default: ''
    },
    contact_change: {
      type: types.STRING(100),
      default: ''
    },
    company_profile: {
      type: types.TEXT,
      default: ''
    },
    alumni_position: {
      type: types.STRING(100),
      default: ''
    },
    common_positions: {
      type: types.TEXT,
      default: ''
    },
    basic_treatment: {
      type: types.STRING(100),
      default: ''
    },
    recruitment_type: {
      type: types.STRING(100),
      default: ''
    }
  },

  //主键id会自动生成，并确保是增长序列，字符串类型的自增长算法可以保证性能，并避免一些安全问题。
  primaryKey: 'id',

  //索引
  index: [],

  //唯一索引
  unique: []
}

class PartnerCompanies extends Model {

  constructor () {
    //必须存在并且写在最前面。
    super()

    this.table = table

    //数据表真正的名称，注意：postgresql不支持表名大写，更改名称请使用小写字母。
    this.tableName = 'partner_companies'

    //主键id前缀，不要超过2字符，请确保前缀 + this.idLen的长度 <= 数据库主键字段的最大长度。
    this.idPre = ''

    this.columns = Object.keys(this.table.column)
  }

  //一些在构造函数执行后才可以初始化的操作，写在init函数中。
  async init() {

  }
}

module.exports = new PartnerCompanies()