import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../actions/userAction';
import { Form, Input, Button } from 'antd';
import Content from './Content';
import './signup.css';
import { Link } from 'react-router-dom';

function App() {
  const [form] = Form.useForm(); 

  const dispatch = useDispatch();

  const handleSubmit = async (formData) => {
    try {
      await dispatch(registerUser(formData));
      
    } catch (error) {
      
    }
  };

  const onFinish = (values) => {
    handleSubmit(values); 
  };

  return (
    <div className='sign-upcontainer'>
      <div className="form">
        <div className='fields'>
          <h1 className='heading'>Sign up for an account</h1>
          <Form
            form={form}
            name="registration"
            onFinish={onFinish}
            initialValues={{
              first_name: '',
              last_name: '',
              email: '',
              password: '',
              password_confirmation: '',
            }}
          >
            <div className='namefield'>
              <Form.Item
                name="first_name"
                rules={[
                  { required: true, message: 'Please enter your First Name' },
                ]}
              >
                <Input placeholder='First Name' />
              </Form.Item>
              <Form.Item
                name="last_name"
                rules={[
                  { required: true, message: 'Please enter your Last Name' },
                ]}
              >
                <Input placeholder='Last Name' />
              </Form.Item>
            </div>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter your Email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input placeholder='Email' />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please enter your Password' },
              ]}
            >
              <Input.Password placeholder='Password' />
            </Form.Item>
            <Form.Item
              name="password_confirmation"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('The two passwords do not match');
                  },
                }),
              ]}
            >
              <Input.Password placeholder='Confirm Password' />
            </Form.Item>
            <Form.Item>
              <Button id='Btn-Reg' block type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
          <h1 className='account'>
            Already have an account <span><Link to={'/'}>Sign In</Link></span>
          </h1>
        </div>
      </div>
      <div className='content'>
        <Content/>
      </div>
    </div>
  );
}

export default App;
