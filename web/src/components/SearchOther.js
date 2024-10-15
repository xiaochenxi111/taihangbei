import React from 'react';
import { Input, Button, Space, Select } from 'antd';
import Search from 'antd/es/transfer/search';

const { Option } = Select;

const SearchOther = ({ fields, searchCriteria, setSearchCriteria, handleSearch, handleResetSearch }) => {
  const onSearch = () => {
    handleSearch(searchCriteria); // 将当前的搜索条件传递给父组件的 handleSearch 函数
  };

  return (
    <Space style={{ marginBottom: 16 }} wrap>
      {fields.map(field => {
        if (field.type === 'select') {
          return (
            <Select
              key={field.name}
              mode="multiple"
              placeholder={field.placeholder}
              value={searchCriteria[field.name]}
              onChange={value => {
                setSearchCriteria({ ...searchCriteria, [field.name]: value });
              }}
              style={{ width: 220 }}
            >
              {field.options.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          );
        }
        return (
          <Input
            key={field.name}
            placeholder={field.placeholder}
            type={field.type || 'text'}
            value={searchCriteria[field.name]}
            onChange={(e) => {
              setSearchCriteria({ ...searchCriteria, [field.name]: e.target.value });
            }}
          />
        );
      })}
      <Button type="primary" onClick={onSearch}>搜索</Button>
      <Button onClick={handleResetSearch}>重置</Button>
    </Space>
  );
};

export default SearchOther;