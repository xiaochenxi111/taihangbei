'use strict'

const Model = require('./Model.js')

let types = Model.dataTypes

let mediaType = {
  IMAGE: 'i',
  AUDIO: 'a',
  VEDIO: 'v',
  FILE: 'f'
}

let table = {
  column: {
    id: {
      type : types.ID
    },

    name: {
      type : types.STRING(100),
      default: ''
    },

    size: types.INT,

    filename: {
      type: types.STRING(300)
    },

    tags: {
      type: types.STRING(300)
    },

    mime_type: {
      type: types.STRING(32)
    },

    mtype: {
      type: types.CHAR(1),
      default: mediaType.IMAGE
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
    },

    is_delete: {
      type: types.SMALLINT,
      default: 0
    },

    deleted_time: {
      type: types.BIGINT,
      default: 0
    },

    is_thumb: {
      type: types.SMALLINT,
      default: 0
    },

    user_id: {
      type: types.UID,
      default: ''
    }
  },

  primaryKey: 'id',

  //索引
  index: [
    'create_time',
    'mime_type',
    'mtype',
    'size',
  ],

  //唯一索引
  unique: [
    'name'
  ]
}

class Media extends Model {
  constructor() {
    super()
    this.table = table
    this.tableName = 'media'
  }
}

module.exports = new Media()
