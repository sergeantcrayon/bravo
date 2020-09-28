import React from 'react';
import LfgList from './LfgList';
import './Dashboard.scss';
import CreateLfg from './CreateLfg';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-item">
        <CreateLfg />
      </div>
      <div className="dashboard-item">
        <LfgList />
      </div>
    </div>
  );
};

export default Dashboard;
