'use strict'

process.chdir(__dirname)

const cdpc = require('cdpc')
const npargv = require('npargv')

let {args} = npargv({
  '@autoDefault': true,

  '--port': {
    name: 'port',
    default: 5432,
    type: 'int',
    min: 1000,
    max: 65535
  }
});
((async () => {
    console.log('正在初始化数据库服务···')

    const cm = new cdpc()

    await new Promise((rv, rj) => {
      //启动数据库服务。
      cm.runChilds([ {
        name: 'postgres',
        command: `pgsql-16.x\\bin\\postgres.exe`,
        cwd: __dirname,
        args: [
          '-D', `${__dirname}\\pgdata`, '-p', args.port
        ],
        restart: 'fail-count',
        restartLimit: 10,
        //重启延迟为1000毫秒
        restartDelay: 1000,
        onError: err => {
          console.error(err)
          rj(err)
        },
      
        callback: (ch, cm) => {
          ch.on('spawn', code => {
            rv(code)
          })

          ch.on('error', err => {
            console.error(err)
          })
      
          ch.on('exit', code => {
            if (!code && code !== null) console.error('Exit with code', code)
            else if (code === 0 || code === null) {
              console.log('数据库服务已停止!')
            }
          })
        }
      
      } ])

    })

    return cm
  
  })()).then(async (cm) => {
    console.log('服务已运行')
    console.log('请使用客户端连接，主机(host) 127.0.0.1; 端口(port) ' + args.port)
  })



  // ------上面是启动 PostgreSQL 数据库服务
 