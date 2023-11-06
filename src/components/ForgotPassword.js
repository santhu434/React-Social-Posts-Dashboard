import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import Content from './Content';
import { Link } from 'react-router-dom';
import './signup.css'
import { useDispatch } from 'react-redux';
import { fogotpasswordrequest} from '../actions/userAction';


function ForgotPassword() {

    const [formData, setFormData] = useState({ email: '', password: '',password_confirmation: ''});
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
   
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = (e) => {
        console.log(formData)
      dispatch(fogotpasswordrequest(formData));
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    };
    return (
     <>
       <div className='sign-upcontainer'>
      <div className="form">
        <div className='fields'>
        <h1 className='heading'>Conform Password</h1>
        <Form name="registration" onFinish={handleSubmit} >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your Email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='Email'
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please enter your Password' },
            ]}
          >
            <Input.Password
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Password'
            />
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
          <Input.Password
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            placeholder='Conform Password'
          />
        </Form.Item>
          <Form.Item>
          <Button id='Btn-Reg' block type="primary" htmlType="submit" loading={isLoading}> Submit</Button>
          </Form.Item>
        </Form>
        </div>
      </div>
      <div className='content'>
        <Content/>
      </div>
      </div>
     </>
    )
    }
    

export default ForgotPassword