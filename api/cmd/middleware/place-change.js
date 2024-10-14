'use strict';

module.exports = async (ctx, next) => {
  
  let file = ctx.getFile('file')
  if (!file) {
    return ctx.status(400).send('没有上传文件')
  }

  let path = ctx.service.storageDir + '/uploads'

  let fname = await file.toFile(path)

  let excel_file = `${path}/${fname}`

  ctx.box.excelFile = excel_file
  ctx.box.excelName = fname

  
  await next()
}