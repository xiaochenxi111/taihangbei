'use strict'

// config/database.js
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();


module.exports = {
  //postgres支持每个数据库都具备分组的功能，类似于子目录，每个组可以有多个表
  //默认的是public，postgres扩展不支持传递schema设置选项，需要连接后执行set search_path to xxx
  schema: 'public',

  connect: {
    host: '127.0.0.1',

    port: 5432,

    username: 'hserver',

    //本地连接可以不填写，需要postgres配置信任本地连接
    password: '',

    database: 'school_project',

    //最大连接数
    max: 30
  }
}

/**
数据库连接选项，完整的参考如下：
{
  host                 : '',            // Postgres ip address[es] or domain name[s]
  port                 : 5432,          // Postgres server port[s]
  path                 : '',            // unix socket path (usually '/tmp')
  database             : '',            // Name of database to connect to
  username             : '',            // Username of database user
  password             : '',            // Password of database user
  ssl                  : false,         // true, prefer, require, tls.connect options
  max                  : 10,            // Max number of connections
  max_lifetime         : null,          // Max lifetime in seconds (more info below)
  idle_timeout         : 0,             // Idle connection timeout in seconds
  connect_timeout      : 30,            // Connect timeout in seconds
  prepare              : true,          // Automatic creation of prepared statements
  types                : [],            // Array of custom types, see more below
  onnotice             : fn,            // Default console.log, set false to silence NOTICE
  onparameter          : fn,            // (key, value) when server param change
  debug                : fn,            // Is called with (connection, query, params, types)
  socket               : fn,            // fn returning custom socket to use
  transform            : {
    undefined          : undefined,     // Transforms undefined values (eg. to null)
    column             : fn,            // Transforms incoming column names
    value              : fn,            // Transforms incoming row values
    row                : fn             // Transforms entire rows
  },
  connection           : {
    application_name   : 'postgres.js', // Default application_name
    ...                                 // Other connection parameters, see https://www.postgresql.org/docs/current/runtime-config-client.html
  },
  target_session_attrs : null,          // Use 'read-write' with multiple hosts to
                                        // ensure only connecting to primary
  fetch_types          : true,          // Automatically fetches types on connect
                                        // on initial connection.
}
*/