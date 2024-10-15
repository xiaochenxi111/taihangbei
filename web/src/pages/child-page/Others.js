
import React, { useState } from 'react';
import { Table } from 'antd';
import SearchStudent from '../../components/SearchStudent';

const Others = ({ students }) => {
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (criteria) => {
        const results = students.filter(student => {
            return Object.keys(criteria).every(key => 
                !criteria[key] || student[key].includes(criteria[key])
            );
        });
        setSearchResults(results);
    };

    const columns = [
        { title: '学号', dataIndex: 'studentId', key: 'studentId' },
        { title: '姓名', dataIndex: 'name', key: 'name' },
        // 其他列...
    ];

    return (
        <div>
            <SearchStudent
                additionalFields={[
                    { name: 'class', label: '班级' },
                    // 更多字段...
                ]}
                onSearch={handleSearch}
            />
            <h2>搜索结果</h2>
            <Table
                columns={columns}
                dataSource={searchResults}
                rowKey="studentId"
            />
        </div>
    );
};

export default Others;
