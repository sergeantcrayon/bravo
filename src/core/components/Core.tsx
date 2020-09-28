import { Layout } from 'antd';
import React, { Fragment, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Dashboard from '../../features/dashboard/components/Dashboard';
import { getGames } from '../redux/core.reducer';
import './Core.scss';
import Navbar from './Navbar';

const { Header, Footer, Content } = Layout;

const Core = () => {
  const stableDispatch = useCallback(useDispatch(), []);
  useEffect(() => {
    stableDispatch(getGames());
  }, [stableDispatch]);

  return (
    <Fragment>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Navbar />
        </Header>
        <Content style={{ padding: '50px 0 0 0' }}>
          <Dashboard />
        </Content>
        <Footer></Footer>
      </Layout>
    </Fragment>
  );
};

export default Core;
