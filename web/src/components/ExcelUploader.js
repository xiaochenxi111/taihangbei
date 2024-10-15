// import React from 'react';
// import { Upload, Button, message } from 'antd';
// import * as XLSX from 'xlsx';

// const ExcelUploader = ({ setData, columns, arrayFields = [] }) => {
//   const handleUpload = (file) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const binaryStr = e.target.result;
//       const workbook = XLSX.read(binaryStr, { type: 'binary' });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//       // 获取表头和数据
//       const headers = jsonData[0];
//       const rows = jsonData.slice(1);

//       // 从 columns 获取表格的标题数组
//       const columnTitles = columns.map(col => col.title);

//       // 检查是否所有 headers 在 columnTitles 中都有匹配（无序）
//       const isHeaderMatch = headers.every(header => columnTitles.includes(header));

//       if (!isHeaderMatch) {
//         message.error('Excel表格的表头与系统要求的不匹配，无法导入');
//         return;
//       }

//       // 根据表头的顺序动态生成 dataIndex 与 Excel 列的映射
//       const headerToDataIndex = {};
//       headers.forEach((header, index) => {
//         const matchedColumn = columns.find(col => col.title === header);
//         if (matchedColumn) {
//           headerToDataIndex[index] = matchedColumn.dataIndex;
//         }
//       });

//       // 根据表格的 columns 自动匹配数据
//       setData(prevData=>{
//         let currentKey=prevData.at(-1).key;
//         const parsedData = rows.map((row, index) => {
//           const rowData = {};
//           Object.keys(headerToDataIndex).forEach((colIndex) => {
//             const dataIndex = headerToDataIndex[colIndex];
//             rowData[dataIndex] = row[colIndex];
//             if (arrayFields.includes(dataIndex) && typeof row[colIndex] === 'string') {
//               rowData[dataIndex] = row[colIndex].split('，').map(type => type.trim());
//             }
//           });
//           // return rowData;
//           return {
//             key: `${++currentKey}`,
//             ...rowData,
//           };
//         });
//         return [...prevData, ...parsedData]
        
//       })
//     };
//     reader.readAsBinaryString(file);

//     // 返回 false 以防止自动上传
//     return false;
//   };

//   return (
//     <Upload beforeUpload={handleUpload} showUploadList={false}>
//       <Button type="primary">导入Excel</Button>
//     </Upload>
//   );
// };

// export default ExcelUploader;


import React from 'react';
import { Upload, Button, message } from 'antd';
import { excelUpload } from '../api/ExcelUpload-api';

const ExcelUploader = () => {
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('excelFile', file); // 添加文件到 FormData

    try {
      // 调用后端 API 上传文件
      const response = await excelUpload(formData);
      console.log('excel传结果:', response);
      const result = await response.json();
      if (response.ok) {
        message.success(result.message || '文件上传成功');
      } else {
        message.error(result.message || '文件上传失败，请重试');
      }
    } catch (error) {
      console.error('上传失败:', error);
      message.error('发生错误，请重试');
    }

    // 返回 false 以防止自动上传
    return false;
  };

  return (
    <Upload beforeUpload={handleUpload} showUploadList={false}>
      <Button type="primary">导入Excel</Button>
    </Upload>
  );
};

export default ExcelUploader;



