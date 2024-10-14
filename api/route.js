'use strict'

const config = require('./config/config.js')
const loadRoute = require('./lib/loadRoute.js')
const app = require('./app.js')
let routes = loadRoute(__dirname + '/routes')

// /********************* 以上是初始化操作 ********************/

// /**
//  * 根据路由模块的配置进行修改，每个目录被映射为一个模块，
//  * 每个文件的名字去掉.js即为子模块的名字
//  */
let {
  admin,
  company,
  highschool,
  student,
  excel,
  auth,
  aiuser
} = routes

// //根据需要导入自己扩展的中间件
// const verifyToken = require('./middleware/verify-token.js')
const adminToken = require('./middleware/admin-token.js')
const placeChange = require('./middleware/place-change.js')

// app.get('/', async ctx => {
//   try {
//     await ctx.ext.pipe(__dirname + '/webapp/index.html', ctx.reply)
//   } catch (err) {
//     ctx.status(404).send('page not found')
//   }
// })

//静态资源处理
// let {Resource} = require('titbit-toolkit')

// let rse = new Resource({
//   staticPath: __dirname + '/webapp',
//   routePath: '/webapp/*',
//   decodePath: true,
//   //最大缓存文件大小
//   maxFileSize: 12_000_000,

//设置消息头cache-control的值，默认为null表示不发送消息头cache-control
//   cacheControl: 'max-age=600'
// })

// rse.init(app);

// //让此路由所属分组和静态资源处理扩展在同一个分组，只要把文件favicon.ico放到webapp目录下即可。
// app.get('/favicon.ico', async ctx => {}, {group: rse.routeGroup})

// /*
//   token验证在处理请求体数据之前执行，所以pre为true，
//   注意：目前middleware返回值只有group方法可以调用。
// */

// /** ---------------routes/api目录-------------------- */

// app.middleware([verifyToken], {pre: true})
//   .group('/api', rt => {
//       //在此处展开路由配置
// rt.post('/image', api.media.uploadImage)
//       rt.get('/image/:name', api.media.getImage)
//       rt.get('/image', api.media.imageList)
//   })


/** ---------------routes/admin目录-------------------- */

app.middleware([adminToken], { pre: true })
  .group('/admin', rt => {
    rt.put('/changePd', admin.changePassword.changePd)

  })


// /** ---------------routes/public目录-------------------- */

// app.group('/public', rt => {
//     //此目录下的路由为公开访问的API
//     rt.get('/image/:name', api.media.getImage)
//     rt.get('/student', routes.public.test.stulist)
//     rt.get('/xyz/test', routes.public.xyz.testRoute)
// })

// /** ---------------routes/auth目录-------------------- */

//此目录下的API用于登录验证
app.group('/auth', rt => {
  rt.post('/admin-login', auth.adminLogin)
})



// /** ---------------routes/admin目录-------------------- */

// app.group('/admin', rt => {
//   rt.post('/login', admin.login.Login)
// })

// /** ---------------routes/company目录-------------------- */

app.middleware([adminToken], { pre: true })
  .group('/company', rt => {
    rt.post('/insert', company.insert.insertCompanyData);
    rt.get('/search', company.search.searchCompanyData);
    rt.put('/update', company.update.updateCompanyData);
    rt.delete('/delete', company.delete.deleteCompanyData);
  })

// /** ---------------routes/highschool目录-------------------- */

app.middleware([adminToken], { pre: true })
  .group('/highschool', rt => {
    rt.post('/insert', highschool.insert.insertHighSchoolData);
    rt.get('/search', highschool.search.getHighSchoolData);
    rt.put('/update', highschool.update.updateHighSchoolData);
    rt.delete('/delete', highschool.delete.deleteHighSchoolData);
  });

// /** ---------------routes/student目录-------------------- */

app.middleware([adminToken], { pre: true })
  .group('/student', rt => {
    rt.post('/insert', student.insert.insertStudentData);
    rt.delete('/delete', student.delete.deleteStudentData);
    rt.put('/update', student.update.updateStudentData);
    rt.get('/search', student.search.getStudentData);
  })

// /** ---------------routes/excel目录-------------------- */

app.middleware([placeChange])
  .group('/excel', rt => {
    rt.post('/insert', excel.insert.uploadExcelData);
  })


// /** ---------------routes/auth目录-------------------- */

app.group('/aiuser', rt => {
  rt.post('/ai', aiuser.ai.aiResponse)
})

module.exports = app
