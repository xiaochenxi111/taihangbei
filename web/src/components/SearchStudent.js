
import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';

const SearchStudent = ({ additionalFields = [], onSearch }) => {
    const [searchCriteria, setSearchCriteria] = useState(
        additionalFields.reduce((acc, field) => ({
            ...acc,
            [field.name]: ''
        }), {})
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria({ ...searchCriteria, [name]: value });
    };

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchCriteria); // 将搜寻条件传递给父组件
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>学生信息搜索</h2>
            <Form layout="inline">
                {additionalFields.map(field => (
                    <Form.Item label={field.label} key={field.name}>
                        <Input
                            name={field.name}
                            value={searchCriteria[field.name]}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                ))}
                <Form.Item>
                    <Button type="primary" onClick={handleSearch}>搜索</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SearchStudent;
