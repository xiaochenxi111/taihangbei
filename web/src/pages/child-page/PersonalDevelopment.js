// src/pages/child-page/PersonalDevelopment.js
import React, { useState } from 'react';
import { Tabs } from 'antd';
import Postgraduate from './personal-children/Postgraduate';
import Exam from './personal-children/Exam';
import Employment from './personal-children/Employment';

const { TabPane } = Tabs;

const PersonalDevelopment = () => {
  const [selectedTab, setSelectedTab] = useState('postgraduate');

  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  return (
    <div>
      <Tabs activeKey={selectedTab} onChange={handleTabChange}>
        <TabPane tab="考研情况" key="postgraduate">
          <Postgraduate />
        </TabPane>
        <TabPane tab="考公情况" key="exam">
          <Exam />
        </TabPane>
        <TabPane tab="就业情况" key="employment">
          <Employment />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PersonalDevelopment;