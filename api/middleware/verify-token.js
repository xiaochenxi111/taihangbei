'use strict'

module.exports = async (ctx, next) => {
  let token = ctx.headers.authorization || ctx.query.token

  if (!token) {
    return ctx.status(401).send('!token')
  }

  let u = ctx.service.userToken.verifyAccessToken(token)

  if (!u.ok) {
    return ctx.status(401).send(`!token ${u.errcode}`)
  }

  ctx.box.user = u.data
  ctx.user = u.data

  await next()
}
