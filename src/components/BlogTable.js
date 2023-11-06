import React, {useEffect,useState} from 'react';
import { LeftOutlined} from '@ant-design/icons';
import { Table, Button, Spin } from 'antd';
import './post.css';
import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

const BlogTable = ({ posts, handlePublishBlog, handleDelete,getPageNumber,handlePreview}) => {
  const totalPage= useSelector((state)=> state.meta.total); 
  const[pageNumber,setPageNumber]=useState(1)
  useEffect(()=>{
  getPageNumber(pageNumber)
  },[pageNumber])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render:(_,post)=>(
     <div onClick={()=>handlePreview(post.id)}><LeftOutlined /><span className='blog_name'>{post.name}</span></div>
      )
      
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_,post) => (
        <div>
          <Button 
            className={post.is_published ? 'unpublish' : 'publish'}
            onClick={() => handlePublishBlog(post.id, post.is_published)}
          >
            {post.is_published ? 'Unpublish' : 'Publish'}
          </Button>
          <Button className="delete" onClick={() => handleDelete(post.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Spin spinning={posts.length?false:true} tip="Loading....">
        <Table
          className="table"
          columns={columns}
          dataSource={posts}
          rowKey="id"
          pagination={{
            pageSize:7,
            total:totalPage,
            onChange:(page)=>{
            setPageNumber(page)
            }
          }}
        />
      </Spin>
    </div>
  );
};

export default BlogTable;
