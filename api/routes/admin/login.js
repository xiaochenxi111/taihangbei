const db = require('../../lib/initdb')

// 登录逻辑
async function Login(ctx) {
  let { username, password } = ctx.body;

  try {
    if (!username || !password) {
      return ctx.status(400).send({ error: '缺少必要的参数' });
    }

    // 查询管理员
    let admin = await db.model('admin').where('username = ?', [username]).select();

    // 检查 admin 是否存在并验证密码
    if (admin.length > 0 && admin[0].password === password) {
      return ctx.status(200).send({ id: admin[0].id, username: admin[0].username, password: admin[0].password });
    } else {
      return ctx.status(401).send({ error: '用户名或密码错误' });
    }
  } catch (err) {
    console.error('数据库错误:', err);
    return ctx.status(500).send({ error: '数据库查询失败' });
  }
}

module.exports = {
  Login
}
