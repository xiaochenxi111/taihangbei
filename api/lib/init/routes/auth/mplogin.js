'use strict'

const mpkey = require('../../config/mpkey.js')
const {httpcli} = require('gohttp')
const User = require('../../model/user.js')

async function mplogin(ctx) {
    //获取小程序端wx.login获取的授权登录码
    let code = ctx.param.code

    let {appid, secret} = mpkey

    let url = `https://api.weixin.qq.com/sns/jscode2session`
              + `?js_code=${code}`
              + `&appid=${appid}&secret=${secret}`
              + `&grant_type=authorization_code`

    //发起请求获取用户信息。
    let ret = await httpcli.get(url)

    if (!ret.ok) {
      return ctx.status(500).send('request failed.')
    }

    let r = ret.json()

    //请求失败，返回错误信息
    if (r.errcode) {
      return ctx.status(400).send(r.errmsg)
    }

    //返回加密后的值
    let data = {
      rand: Math.random(),
      openid: r.openid,
      id: null,
    }

    //获取关联的用户信息，如果没有关联仍然可以登录。
    let u = await User.where('openid', r.openid)
                    .get([
                      'id', 'openid', 'role',
                      'nickname', 'username'
                    ])

    if (u) {
      data.id = u.id
      data.role = u.role
    } else {
      u = await User.mpcreate(r.openid)
      data.id = u.id
      data.role = 'user'
    }

    //签发token
    let token = ctx.service.userToken.makeAccessToken(data)

    ctx.send({
      userinfo: {
        nickname: u.nickname,
        role: u.role,
        id: u.id
      },
      token,
      expires: ctx.service.userToken.expires
    })
}

module.exports = mplogin
