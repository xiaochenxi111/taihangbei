'use strict'

const Model = require('./Model.js')

let types = Model.dataTypes

/**
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
      type: types.ID,
      primary: true,
      default: '',
      ref: 'students:id'
    },
    name: {
      type: types.STRING(100),
      default: ''
    },
    type: {
      type: types.STRING(100),
      default: '',
      values: ['实习', '实训']
    },
    start_time: {
      type: types.STRING(100),
      default: ''
    },
    end_time: {
      type: types.STRING(100),
      default: ''
    },
    organization: {
      type: types.STRING(100),
      default: ''
    },
    position: {
      type: types.STRING(100),
      default: ''
    },
    changes_remarks: {
      type: types.TEXT,
      default: ''
    },
    main_tasks: {
      type: types.TEXT,
      default: ''
    },
    award: {
      type: types.TEXT,
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

class SixthTermExperience extends Model {

  constructor () {
    //必须存在并且写在最前面。
    super()

    this.table = table

    //数据表真正的名称，注意：postgresql不支持表名大写，更改名称请使用小写字母。
    this.tableName = 'sixth_term_experience'

    //主键id前缀，不要超过2字符，请确保前缀 + this.idLen的长度 <= 数据库主键字段的最大长度。
    this.idPre = ''

    this.columns = Object.keys(this.table.column)
  }

  //一些在构造函数执行后才可以初始化的操作，写在init函数中。
  async init() {

  }
}

module.exports = new SixthTermExperience()