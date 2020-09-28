import { Avatar, Button, Card, Popover } from 'antd';
import React, { Fragment } from 'react';
import { GoogleLoginResponse, useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { Secrets } from '../../environments/environment';
import { RootState } from '../../store';
import { login, logout } from '../redux/core.reducer';
import './Login.scss';
import { GoogleOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';

const Login = () => {
  const dispatch = useDispatch();
  const googleAuth = useSelector((state: RootState) => state.core.google);

  const handleSuccess = (response: GoogleLoginResponse) => {
    dispatch(login(response));
  };

  const handleFailure = () => {
    console.log('Google login failed!');
  };

  const { signIn } = useGoogleLogin({
    onSuccess: handleSuccess,
    onFailure: handleFailure,
    clientId: Secrets.GOOGLE_CLIENT_ID,
    isSignedIn: true,
    cookiePolicy: 'single_host_origin',
  });

  const signOutSuccess = () => {
    dispatch(logout());
  };

  const { signOut } = useGoogleLogout({
    clientId: Secrets.GOOGLE_CLIENT_ID,
    onLogoutSuccess: signOutSuccess,
  });

  const popoverContent = (
    <div>
      <Card
        style={{ width: 300 }}
        actions={[
          <Button type="primary" ghost icon={<GoogleOutlined />} onClick={signOut}>
            Logout
          </Button>,
        ]}
      >
        <Meta avatar={<Avatar src={googleAuth?.profileObj.imageUrl} />} title="Card title" description="This is the description" />
      </Card>
    </div>
  );

  return (
    <Fragment>
      {googleAuth ? (
        <Popover placement="bottom" content={popoverContent} trigger="click">
          <div className="status">
            <Avatar src={googleAuth?.profileObj.imageUrl} />
            <span className="name">{googleAuth?.profileObj.name}</span>
          </div>
        </Popover>
      ) : (
        <Button type="primary" icon={<GoogleOutlined />} onClick={signIn}>
          Login
        </Button>
      )}
    </Fragment>
  );
};

export default Login;
