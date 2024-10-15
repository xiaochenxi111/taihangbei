import React, { useState, useEffect } from 'react';
import { Table, Tabs, Modal, Input, Popover } from 'antd';
import SearchForm from '../../components/SearchForm';
import CrudTable from '../../components/CrudTable';
import SemesterInternship from './SemesterInternship';
import ProjectTraining from './ProjectTraining';
import GraduationInternship from './GraduationInternship';
const { TabPane } = Tabs;
const { TextArea } = Input;

const InternshipManagement = () => {
  const [selectedTab, setSelectedTab] = useState('internship');
  const handleTabChange = (key) => {
    setSelectedTab(key);
  };
  
  return (
    <div>
      <Tabs activeKey={selectedTab} onChange={handleTabChange}>
        <TabPane tab="第六学期外出实习情况" key="internship">
          <SemesterInternship/>
        </TabPane>
        <TabPane tab="项目实训情况 " key="project">
          <ProjectTraining/>
        </TabPane>
        <TabPane tab="毕业实习情况" key="graduation">
          <GraduationInternship/>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default InternshipManagement;