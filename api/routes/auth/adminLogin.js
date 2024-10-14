'use strict'

const Admin = require('../../model/admin.js')

async function login(ctx) {
    let {username, passwd} = ctx.body
    console.log(ctx.body)
    if (!username || !passwd) return ctx.status(400).send('缺少参数')

    let u = await Admin.loginVerify(username, passwd)
    console.log(u)
    if (!u.ok) {
        return ctx.status(403).send(u.errmsg)
    }

    let data = {
        id: u.data.id,
        is_root: u.data.is_root,
        username: u.data.username,
    }

    ctx.send({
        token: ctx.service.adminToken.makeAccessToken(data),
        username: u.data.username,
        is_root: u.data.is_root,
        expires: ctx.service.adminToken.expires,
    })
}

module.exports = login
