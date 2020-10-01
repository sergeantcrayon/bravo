import { Col, Layout, Row } from 'antd';
import React, { Fragment, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from '../../features/dashboard/components/Dashboard';
import LfgRoom from '../../features/lfg-room/components/LfgRoom';
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
        <Content style={{ padding: '100px 0 0 0' }}>
          <Row>
            <Col lg={12} md={16} xs={22}>
              <Switch>
                <Route path="/dashboard" component={Dashboard}></Route>
                <Route path="/lfg/:id" component={LfgRoom}></Route>
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Col>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
    </Fragment>
  );
};

export default Core;
