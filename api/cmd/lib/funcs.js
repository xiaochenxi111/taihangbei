'use strict'

const crypto = require('crypto')
const fs = require('fs')

let saltArr = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g',
  'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u',
  'v', 'w', 'x', 'y', 'z', '1', '2',
  '3', '4', '5', '6', '7', '8', '9'
]

let _totalLength = saltArr.length

exports.randstr = function (length = 8) {

  let saltstr = ''

  for (let i = 0; i < length; i++) {
    saltstr += saltArr[ parseInt(Math.random() * _totalLength) ]
  }

  return saltstr
}

exports.randstr2 = function randstr() {
  return Math.random().toString(16).substring(2) + Date.now().toString(16)
}

exports.hashPasswd = (pass, cstr = '') => {
  let h = crypto.createHash('sm3')
  
  h.update(`${pass}${cstr}`)

  return h.digest('base64url')
}

exports.sha1 = (str, encoding = 'hex') => {
  let h = crypto.createHash('sha1')
  h.update(str)
  return h.digest(encoding)
}

exports.md5 = (str, encoding = 'hex') => {
  let h = crypto.createHash('md5')
  h.update(str)
  return h.digest(encoding)
}

exports.sha256 = (str, encoding = 'hex') => {
  let h = crypto.createHash('sha256')
  h.update(str)
  return h.digest(encoding)
}

exports.sha512 = (str, encoding = 'hex') => {
  let h = crypto.createHash('sha512')
  h.update(str)
  return h.digest(encoding)
}

exports.genUsername = () => {

  let tm = Date.now().toString()

  let n = parseInt(Math.random() * 900) + 101

  return `u${tm.substring(tm.length - 4)}${n}`

}

exports.try_mkdir_sync = (dname) => {
  try {
    fs.accessSync(dname)
    return true
  } catch (err) {
    
  }

  try {
    fs.mkdirSync(dname)
    return true
  } catch(err) {
    console.error(err)
    return false
  }
}

exports.try_mkdir = async (dname) => {
  let st = await new Promise((rv, rj) => {
    fs.access(dname, err => {
      if (err) {
        rv(false)
      } else {
        rv(true)
      }
    })
  })

  if (st) {
    return true
  }

  return await new Promise((rv, rj) => {
    fs.mkdir(dname, err => {
      if (err) {
        rj(err)
      }
      rv(true)
    })
  })
  
}

exports.fmtTime = function (m = 'long', mstr = ':') {
  let t = new Date()
  let year = t.getFullYear()
  let month = t.getMonth()+1
  let day = t.getDate()
  let hour = t.getHours()
  let min = t.getMinutes()
  let sec = t.getSeconds()

  let mt = `${year}-${month > 9 ? '' : '0'}${month}-${day > 9 ? '' : '0'}${day}`

  if (m === 'short') {
    return mt
  }

  let md = `${mt}_${hour > 9 ? '' : '0'}${hour}`

  if (m === 'middle') {
    return md
  }

  return `${md}${mstr}${min > 9 ? '' : '0'}${min}${mstr}${sec > 9 ? '' : '0'}${sec}`
}

exports.extName = function (fname) {
  let ind = fname.length - 2

  while (ind > 0 && fname[ind] !== '.') {
    ind -= 1
  }

  if (ind <= 0) return ''

  return fname.substring(ind)
}
