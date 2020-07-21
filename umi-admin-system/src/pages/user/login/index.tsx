import React, { FC, useState } from 'react';
import { Dispatch, connect } from 'umi';
import { Card, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './style.less';
import { StateType } from './model';

interface LoginProps {
  userAndlogin: StateType;
  submitting: boolean;
  dispatch: Dispatch;
}

const Login: FC<LoginProps> = props => {
  const { userAndlogin, submitting, dispatch } = props;

  const [formLogin] = Form.useForm();
  const [captcha, setCaptcha] = useState('/api/captcha');

  const onFinish = (values: any) => {
    const { status } = userAndlogin;
    dispatch({
      type: 'userAndlogin/login',
      payload: {
        ...values,
      },
    });
    if (status !== 'ok') {
      formLogin.setFieldsValue({ captcha: '' });
      setCaptcha('/api/captcha?_t=' + new Date().getTime());
    }
  };

  return (
    <div className="login-wrapper">
      <img className="login-logo" src={require('@/assets/logo.png')} alt="" />
      <div className="form-wrapper">
        <Card>
          <Form size="middle" form={formLogin} onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input className="login-input" addonBefore={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password addonBefore={<LockOutlined />} />
            </Form.Item>
            <Form.Item
              name="captcha"
              rules={[{ required: true, message: 'Please input captcha!' }]}
            >
              <Input
                className="login-input captcha-input"
                addonBefore="验证码"
                addonAfter={
                  <img
                    className="captcha"
                    src={captcha}
                    onClick={() =>
                      setCaptcha('/api/captcha?_t=' + new Date().getTime())
                    }
                    alt=""
                  />
                }
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="login-btn"
                type="primary"
                htmlType="submit"
                loading={submitting}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default connect(
  ({
    userAndlogin,
    loading,
  }: {
    userAndlogin: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({ userAndlogin, submitting: loading.effects['userAndlogin/login'] }),
)(Login);
