'use strict'

/**
 * 数据库模型的基类，其他模型继承自此类。
 * 注意：此类不直接使用。
 */

const { PostgreModel, dataTypes } = require('psqlorm')


class Model extends PostgreModel {

  constructor(orm = null) {
    super(orm)

    this.tableName = ''

    this.primaryKey = 'id'
  }

}

Model.dataTypes = dataTypes

module.exports = Model
