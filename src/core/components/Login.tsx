import { Avatar, Button, Card, Popover, Tooltip } from 'antd';
import React from 'react';
import { GoogleLoginResponse, useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { Secrets } from '../../environments/environment';
import { RootState } from '../../store';
import './Login.scss';
import { GoogleOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { googleLogin, logout } from '../redux/core.reducer';
import Signup from './Signup';

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.core.user);

  const handleSuccess = (response: GoogleLoginResponse) => {
    dispatch(googleLogin(response));
  };

  const handleFailure = () => {
    console.log('Google login failed!');
  };

  const { signIn } = useGoogleLogin({
    onSuccess: handleSuccess,
    onFailure: handleFailure,
    clientId: Secrets.GOOGLE_CLIENT_ID,
    // isSignedIn: true,
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
    <div className="login-popover">
      <Card
        style={{ width: 300 }}
        actions={[
          <Tooltip title="logout">
            <Button icon={<FontAwesomeIcon icon={faSignOutAlt} />} onClick={signOut} key="logout" shape="round"></Button>
          </Tooltip>,
        ]}
      >
        <Meta title={user?.name} description={'No idea what to put here'} avatar={<Avatar src={user?.image} />} />
      </Card>
    </div>
  );

  return (
    <div>
      {user ? (
        <Popover placement="bottom" content={popoverContent} trigger="click">
          <div className="status">
            <Avatar src={user?.image} />
            <span className="name">{user?.name}</span>
          </div>
        </Popover>
      ) : (
        <Button type="link" icon={<GoogleOutlined />} onClick={signIn}>
          Login
        </Button>
      )}
      <Signup signOut={signOut} />
    </div>
  );
};

export default Login;
