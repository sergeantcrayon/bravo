import './Signup.scss';

import React from 'react';
import { Input, Form, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setSignupModal, signup } from '../redux/core.reducer';
import { useForm } from 'antd/lib/form/Form';

interface SignupProps {
  signOut: () => void;
}

const Signup = ({ signOut }: SignupProps) => {
  const dispatch = useDispatch();
  const [form] = useForm();
  const modal = useSelector((state: RootState) => state.core.signupModal);
  const signupOk = () => {
    form.submit();
  };

  const onFormFinish = (values) => {
    dispatch(signup(values));
  };
  const onCancel = () => {
    signOut();
    dispatch(setSignupModal(false));
  };

  return (
    <div>
      <Modal title="Create a display name" visible={modal} onOk={signupOk} onCancel={onCancel} closable={false} closeIcon={false}>
        <Form form={form} onFinish={onFormFinish}>
          <Form.Item name="name" rules={[{ required: true, message: 'Please add a display name!' }]}>
            <Input placeholder="Display Name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Signup;
