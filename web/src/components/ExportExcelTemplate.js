import React from 'react';
import { Button } from 'antd';
import * as XLSX from 'xlsx';

const ExportExcelTemplate = ({ columns }) => {
  // 生成并导出Excel文件
  const handleExport = () => {
    // 从 columns 中提取表头
    const headers = columns.map((col) => {
        if(col.title!=='操作'){
            return col.title;
        }
    });

    // 创建一个工作表，包含表头数据
    const worksheet = XLSX.utils.aoa_to_sheet([headers]);

    // 创建一个新的工作簿
    const workbook = XLSX.utils.book_new();

    // 将工作表添加到工作簿中
    XLSX.utils.book_append_sheet(workbook, worksheet, '模板');

    // 导出 Excel 文件
    XLSX.writeFile(workbook, 'Excel模板.xlsx');
  };

  return (
    <Button type="primary" onClick={handleExport}>
      导出 Excel 模板
    </Button>
  );
};

export default ExportExcelTemplate;