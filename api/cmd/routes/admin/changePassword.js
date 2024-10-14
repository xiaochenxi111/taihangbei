const db = require('../../lib/initdb')

// 修改密码逻辑
async function changePd(ctx) {
  let { username, oldPassword, newPassword } = ctx.body;
  console.log(ctx.body);

  try {
    // 查找用户
    let admin = await db.model('admin').where({ username }).select();

    if (admin.length === 0) {
      return ctx.status(404).send({ error: '用户不存在' });
    }

    // 检查旧密码是否正确
    if (admin[0].password !== oldPassword) {
      return ctx.status(401).send({ error: '旧密码错误' });
    }

    // 更新密码
    let result = await db.model('admin').update({ password: newPassword });

    console.log('Update result:', result); // 打印更新结果
    
    if (result) {
      return ctx.status(200).send({ message: '密码修改成功' });
    } else {
      return ctx.status(500).send({ error: '密码修改失败' });
    }
  } catch (err) {
    console.error('数据库错误:', err);
    return ctx.status(500).send({ error: '数据库操作失败' });
  }
}

module.exports = {
  changePd
}