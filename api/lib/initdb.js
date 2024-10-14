'use strict'

let dbconfig = require('../config/database.js')
const {initORM} = require('psqlorm')

//此连接用于pg扩展，用于psqlorm类进行自动化同步和ORM
let cfg = dbconfig.connect

let pdb_cfg = {
  user: cfg.username,
  password: cfg.password,
  host: cfg.host,
  port: cfg.port,
  database: cfg.database,
  max: cfg.max < 50 ? cfg.max : 50,
  idleTimeoutMillis: 3600_000,
  connectionTimeoutMillis: 60000,
}

const db = initORM(pdb_cfg)
db.setSchema(dbconfig.schema)

;(async () => {
  await db.query(`set search_path to ${dbconfig.schema}`)
})();

module.exports = db
