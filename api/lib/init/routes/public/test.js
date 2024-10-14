'use strict'

let Student = require('../../model/student.js')

async function stulist (ctx) {
  ctx.send(
    await Student.select()
  )
}

module.exports = {
  stulist: stulist
}