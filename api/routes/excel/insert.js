const path = require('path');
const fs = require('fs'); // 添加 fs 模块以删除上传的文件
const xlsx = require('node-xlsx');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'hserver',
  host: 'localhost',
  database: 'school_project',
  port: 5432,
});

// 获取列名的函数
async function getTableColumnsWithTypes(tableName) {
  let query = `
  SELECT column_name, data_type 
  FROM information_schema.columns 
  WHERE table_name = $1`;
  let result = await pool.query(query, [tableName]);

  return result.rows
}

// 格式化行数据的函数
async function formatRowData(types, rowData) {
  return rowData.map((value, index) => {
    let type = types[index];

    // 处理整数类型
    if (type === 'integer' || type === 'bigint') {
      if (typeof value === 'string') {
        return parseInt(value, 10);
      }
    }

    // 处理浮点数类型
    if (type === 'numeric' || type === 'real' || type === 'double precision') {
      if (typeof value === 'string') {
        return parseFloat(value);
      }
    }

    // 处理布尔值类型
    if (type === 'boolean') {
      if (typeof value === 'string') {
        return value.toLowerCase() === 'true';
      }
    }

    // 处理日期类型
    if (type === 'date' || type === 'timestamp' || type === 'timestamp with time zone') {
      if (typeof value === 'string') {
        return new Date(value);
      }
    }

    // 处理文本类型（不转换）
    if (type === 'text' || type === 'character varying') {
      return String(value); // 确保为字符串
    }

    // 其他类型返回原始值
    return value;
  });
}





// 插入Excel数据到数据库的函数
async function uploadExcelData(ctx) {
  // 检查文件是否存在
  if (!ctx.box) {
    ctx.status = 400; // 设置 HTTP 状态码为 400（错误请求）
    return { success: false, message: '没有文件被上传' };
  }

  let filePath = ctx.box.excelFile;


  try {
    // 解析上传的 Excel 文件
    let workbook = xlsx.parse(filePath); // 使用 parse 读取文件，确保兼容性
    let isFirstRow = true; // 添加一个标志来判断是否为第一行

    // 遍历所有工作表
    for (let sheet of workbook) {
      let data = sheet.data;
      // console.log(data);


      for (let row of data) {
        if (isFirstRow) {
          isFirstRow = false; // 跳过第一行后，将标志设为 false
          continue; // 跳过这一行
        }
        if (row.length === 0) continue; // 跳过空行

        // 假设第一列是 table_name
        let tableName = row[0];

        let rowData = row.slice(1); // 获取除表名外的其他数据
        console.log(rowData);


        // 检查表名是否有效（例如：防止 SQL 注入）
        if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableName)) {
          throw new Error(`无效的表名: ${tableName}`);
        }

        // 获取列名和数据类型
        let columnsWithTypes = await getTableColumnsWithTypes(tableName);

        // console.log(columnsWithTypes);



        let columns = columnsWithTypes.map(col => col.column_name);
        console.log(columns);


        let types = columnsWithTypes.map(col => col.data_type);
        // console.log(types);

        if (columns.length === 0) {
          throw new Error(`没有找到表 ${tableName} 的列名`);
        }


        // 格式化数据
        let formattedRowData = await formatRowData(types, rowData);
        console.log(formattedRowData);



        // 构建 SQL 插入语句
        let placeholders = formattedRowData.map((_, index) => `$${index + 1}`).join(', ');
        let sql = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;

        console.log(sql);

        try {
          // 插入每一行的数据到数据库
          await pool.query(sql, formattedRowData);
        } catch (error) {
          console.error(`插入数据失败，表: ${tableName}`, error);
          throw new Error(`插入数据失败，表: ${tableName}`);
        }
      }
    }

    // 删除上传的文件
    // fs.unlinkSync(filePath); // 确保文件被删除以节省空间
    return ctx.status(404).send({ success: true, message: 'EXCEL成功插入' });

  } catch (error) {
    console.error('文件处理失败:', error);
    ctx.status = 500; // 设置 HTTP 状态码为 500（内部服务器错误）
    return { success: false, message: '文件处理失败', error: error.message };
  }
}

module.exports = {
  uploadExcelData
};
