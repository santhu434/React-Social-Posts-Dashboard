
import React, { useState,useEffect } from 'react';
import { Button, Form, Input,Checkbox} from 'antd';
import Content from './Content';
import { Link } from 'react-router-dom';
import './signup.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions/userAction';

function Sign_In() {
  
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  ////////////////////////////////////////////
  const [form]=Form.useForm()
  const dispatch = useDispatch();

  const handleSubmit = async (formData) => {
    try {
      await dispatch(loginUser(formData,isChecked));
      
    } catch (error) {
      
    }
  };
  const onFinish = (values) => {
    handleSubmit(values); 
    setIsLoading(true); 
  };



  return (
    <>

      <div className='sign-upcontainer'>
      <div className="form">
        <div className='fields'>
            <h1 className='heading'>Sign up for an account</h1>
                <Form
                 form={form}
                 name="registration"
                 onFinish={onFinish}
                 initialValues={{
                  email: '',
                  password: '',
                }}>
                  <Form.Item name="email"
                   rules={[
                    { required: true, message: 'Please enter your Email' },
                    { type: 'email', message: 'Please enter a valid email' },
                  ]}>
                    <Input placeholder='Email'/>
                  </Form.Item>
                  <Form.Item name="password" 
                    rules={[
                   { required: true, message: 'Please enter your Password' },
                  ]}>
                    <Input.Password placeholder='Password'/>
                  </Form.Item>
              <div>
                  <Checkbox  
                  checked={isChecked}
                  onChange={handleCheckboxChange}>
                    Remember me
                  </Checkbox>
              </div>
                  <Form.Item>
                    {isLoading ? (
                      <Button block type="primary" loading>
                        Please Wait...
                      </Button>
                    ) : (
                      <Button block type="primary" htmlType="submit">
                        Submit
                      </Button>
                    )}
                  </Form.Item>
            </Form>
            <h1 className='account'> Don't have an account <span><Link to={'/Sign_Up'}>Sign Up</Link></span></h1>
        </div>
      </div>
      <div className='content'>
          <Content />
        </div>
    </div>
    </>
  );
}

export default Sign_In;
