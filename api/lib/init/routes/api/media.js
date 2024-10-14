'use strict'

const Media = require('../../model/media.js')

let storageDir = process.env.STORAGE_DIR

let allowTypes = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/x-icon',
  'image/svg+xml', 'image/avif'
]

//文件类型对应的扩展名映射
let typeExtName = {}

for (let a of allowTypes) {
  if (a === 'image/x-icon') {
    typeExtName[a] = '.ico'
    continue
  }

  if (a === 'image/svg+xml') {
    typeExtName[a] = '.svg'
    continue
  }

  typeExtName[a] = '.' + a.split('/')[1]
}

function checkImageType(img, type='') {
  if (!img['content-type']) img['content-type'] = type || 'image/webp'

  if (allowTypes.indexOf(img['content-type']) < 0) return false

  return true
}

async function getImage(ctx) {
  try {
    await ctx.ext.pipe(`${storageDir}/images/${ctx.param.name}`, ctx.reply)
  } catch (err) {
    return ctx.status(404)
  }
}

async function uploadImage(ctx) {
  let imgfile = ctx.getFile('image')

  if (!imgfile) {
    return ctx.status(400).send('没有图片文件')
  }

  if (!checkImageType(imgfile, ctx.body.type || '')) {
    return ctx.status(400).send('未知图片类型。')
  }

  let imagePath = storageDir + '/images'

  let imageName = ''

  let r = await Media.transaction(async (db, ret) => {
    let img_filename = imgfile.filename
    
    if (ctx.body.type) {
      img_filename += (typeExtName[ctx.body.type] || '')
    }

    let extName = ctx.ext.extName(img_filename)
    imageName = ctx.ext.makeName(img_filename)
    let tm = Date.now()

    let img = await db.returning('id')
                      .insert({
                        user_id: ctx.user.id,
                        name: imageName,
                        mime_type: imgfile['content-type'],
                        create_time: tm,
                        update_time: tm,
                        size: imgfile.length,
                        is_thumb: ctx.body.is_thumb ? 1 : 0,
                        filename: ctx.body.filename || img_filename
                      })
  
    await imgfile.toFile(imagePath, imageName)

    //此结果将会传递给返回值r
    ret.result = {
      id: img.id,
      name: imageName
    }
    
  })

  if (!r.ok) {
    return ctx.status(400).send(r.message)
  }

  ctx.send(r.result)
}

async function imageList(ctx) {
  let cond = {
    is_delete: 0,
    mtype: this.image_type,
  }

  if (ctx.query.kwd) {
    let ilike_kwd = `%${ctx.query.kwd.join('%')}%`

    cond['[(tags ilike ? or filename ilike ?)]'] = [
      ilike_kwd, ilike_kwd
    ]
  }

  if (ctx.query.deleted) {
    cond.is_delete = 1
  }

  if (ctx.query.thumb !== 2) {
    cond.is_thumb = ctx.query.thumb == 1 ? 1 : 0
  }

  let pagesize = 12
  let offset = 0
  if (ctx.query.offset && !isNaN(ctx.query.offset)) {
    offset = parseInt(ctx.query.offset)
    if (offset < 0) offset = 0
  }

  let images = await Media.where(cond)
                        .order('create_time', 'desc')
                        .limit(pagesize, offset)
                        .select()

  let total = await Media.where(cond).count()

  ctx.send({
    total,
    list: images
  })
}

module.exports = {
  getImage,
  uploadImage,
  imageList
}