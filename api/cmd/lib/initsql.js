'use strict'

let dbconfig = require('../config/database.js')

const postgres = require('postgres')

let sql = postgres(dbconfig.connect)

;(async () => {
  await sql`set search_path to ${sql(`${dbconfig.schema}`)}`
})();

module.exports = sql
