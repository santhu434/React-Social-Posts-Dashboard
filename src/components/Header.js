import React, { useState,useEffect } from 'react';
import { Modal, Dropdown, Menu, Button, Form, Input,Avatar} from 'antd';
import { SyncOutlined, VerticalAlignBottomOutlined} from '@ant-design/icons';
import { useDispatch,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import logo from "../images/Logo-1.svg";
import './header.css';
import { updateProfileRequest,logOutRequest,} from '../actions/userAction';

const Header = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
 

  const items = [
    {
      label: 'Profile',
      icon: <SyncOutlined />,
      key: '0',
    },
    {
      label: 'Logout',
      icon: <VerticalAlignBottomOutlined />,
      key: '1',
    },
  ];

  const handleMenuItemClick = (key) => {
    if (key == '0') {
      showModal();
    } else if (key =='1') {
      handleLogOut();
    }
  };

  const menu = (
    <Menu>
      {items.map((item) => (
        <Menu.Item key={item.key}>
          <Button onClick={() => handleMenuItemClick(item.key)}>
            {item.icon}
            {item.label}
          </Button>
        </Menu.Item>
      ))}
    </Menu>
  );

 ////////////////////////////////////////////////////
 const user = useSelector((state) => state.users);

 const placeholderImageUrl = 'https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-286x300.jpg';
 
 const [formData, setFormData] = useState({

  firstName: user.first_name,

  lastName: user.last_name,

  profileImage: null,

});



const handleUpdateProfile = () => {

  dispatch(updateProfileRequest({ formData }));

  setIsModalOpen(false)

};
///////////////////////////////////////////////////////
const navigate=useNavigate()

const handleLogOut = () => {
dispatch(logOutRequest())
navigate('/')
}


  return (
    <>
      <div className='header'>
        <img className='logo' src={logo} alt='logo' />
        <ul className='list'>
         <Link to={'Dashboard'}><li className='dashboard'>Dashboards</li></Link>
         <Link to={'Post'} ><li className='post'>Posts</li></Link>
        </ul>
        <div className='profile'>
          <Dropdown overlay={menu} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
                <Avatar src={user.profile_url || placeholderImageUrl} alt="profile" className='profile'/>
            </a>
          </Dropdown>
        </div>
      </div>


      {/* //////////////////////////////////////// */}
      <div className='modal'>
<Modal title="Profile" width={400} open={isModalOpen} onCancel={handleCancel} footer={
 
<>
  <Button key="back" onClick={handleCancel}>
    Cancel
  </Button>,
  <Button key="submit" type="primary" onClick={handleUpdateProfile}>
   Submit
  </Button>
</>

}>

<Form layout='vertical'>
<Form.Item
    label="First Name"
    name="firstname"
    rules={[
      {
        required: true,
        message: 'Please input your firstname!',
      },
    ]}
  >
    <Input  
      value={formData.firstName}
      onChange={(e) =>
      setFormData({ ...formData, firstName: e.target.value })
    }/>
  </Form.Item>
  <Form.Item
    label="Last Name"
    name="lastname"
    rules={[
      {
        required: true,
        message: 'Please input your lastname!',
      },
    ]}
  >
    <Input
     value={formData.lastName}
     onChange={(e) =>
     setFormData({ ...formData, lastName: e.target.value })
  }/>

  </Form.Item>
  <Form.Item>
    <Input type='file' onChange={(e) => {
      const file = e.target.files[0];
      setFormData({ ...formData, profileImage: file });
    }}/>
  </Form.Item>
</Form>  
</Modal>
      </div>
    </>
  );
};

export default Header;
