import React from 'react';
import LfgList from './LfgList';
import './Dashboard.scss';
import CreateLfg from './CreateLfg';
import LfgSearchForm from './LfgSearchForm';
import { Col, Row } from 'antd';

const Dashboard = () => {
  return (
    <Row className="dashboard">
      <Col span={24}>
        <LfgSearchForm />
        <CreateLfg />
        <LfgList />
      </Col>
    </Row>
  );
};

export default Dashboard;
