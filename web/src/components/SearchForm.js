import React, { useState, useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';

const SearchForm = ({ data = [], setData, extraFields = [], style }) => {
  const [form] = Form.useForm();
  const originalDataRef = useRef(data);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    student_id: '',
    counselor: '',
    grade: '',
    class: '',
    majortype: '',
    ...extraFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  });

  useEffect(() => {
    if (!isFiltered) {
      originalDataRef.current = data;
    }
  }, [data, isFiltered]);

  const handleInputChange = (changedValues) => {
    setFilters({ ...filters, ...changedValues });
  };

  const handleSearch = () => {
    const filteredData = originalDataRef.current.filter(item => {
      return Object.keys(filters).every(key => {
        if (!filters[key]) return true;
        return item[key] && item[key].toString().includes(filters[key]);
      });
    });
    setData(filteredData);
    setIsFiltered(true);
  };

  const renderFormItems = () => {
    const fields = [
      { name: 'counselor', placeholder: '辅导员' },
      { name: 'grade', placeholder: '年级' },
      { name: 'class', placeholder: '班级' },
      { name: 'majortype', placeholder: '专业方向' },
      { name: 'name', placeholder: '姓名' },
      { name: 'student_id', placeholder: '学号' },
      ...extraFields
    ];

    return fields.map((field, index) => (
      <div key={index} style={{ width: 'calc(25% - 8px)', marginRight: '8px', marginBottom: '16px' }}>
        <Form.Item
          name={field.name}
          style={{ margin: 0 }}
        >
          <Input placeholder={field.placeholder} />
        </Form.Item>
      </div>
    ));
  };

  return (
    <div style={style}>
      <Form
        form={form}
        onValuesChange={handleInputChange}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {renderFormItems()}
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
            <Button type="primary" onClick={handleSearch}>
              搜索
            </Button>
            {isFiltered && (
              <Button onClick={() => {
                setIsFiltered(false);
                setData(originalDataRef.current);
              }}>
                返回完整数据
              </Button>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SearchForm;