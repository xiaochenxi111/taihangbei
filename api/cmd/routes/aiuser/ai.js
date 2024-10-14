const axios = require('axios');

// 讯飞 API 的配置
const XF_API_URL = 'https://spark-api-open.xf-yun.com/v1/chat/completions';  // 讯飞文本理解API
const XF_APIPassword = 'xtcfjxphUMCeHIKBfVaR:hAghUTnIRywTIEIKBoCl';  // 替换为你的实际 APIPassword

// 调用讯飞AI对话接口
async function callXunfeiAI(text) {
  const data = {
    model: "4.0Ultra", // 指定请求的模型
    messages: [
      {
        role: "user",
        content: text,
      },
    ],
    stream: false, // 根据需要设置流式传输
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${XF_APIPassword}`, // 使用 Bearer Token
  };

  try {
    const response = await axios.post(XF_API_URL, data, { headers });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('讯飞AI请求错误:', error.response ? error.response.data : error.message);
    throw new Error('讯飞AI请求失败');
  }
}

async function aiResponse(ctx) {
  // 从 ctx.body 获取请求体
  const { messages } = ctx.body;  
  // console.log(ctx);
  

  // 校验 messages 是否存在，并且提取 user 的内容
  if (!messages || !messages.length || !messages[0].content) {
    return ctx.status(400).send({ error: '输入文本不能为空' });
  }

  const text = messages[0].content; // 获取用户输入的内容

  try {
    // 调用讯飞AI接口处理用户输入
    const aiResult = await callXunfeiAI(text);

    // 返回AI的处理结果
    ctx.status(200).send({
      status: 200,
      message: 'AI处理成功',
      data: aiResult
    });
  } catch (err) {
    console.error('AI处理出错:', err);
    ctx.status(500).send({ error: 'AI处理失败' });
  }
}

module.exports = {
  aiResponse
};
