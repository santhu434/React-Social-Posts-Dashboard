import React from 'react';
import { useSelector } from 'react-redux';
import './preview.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function PreviewBlog({handlePreviewBack}) {
    const Data = useSelector((state) => state.previewBlog);
    console.log("render")

  

    return (
        <div className='view_blog1'>
            <div className='btn'>
                <Button >Publish</Button>
                <Button>Edit</Button>
                <Button>Delete</Button>
                <Button id='Back_btn' onClick={handlePreviewBack}>Back</Button>
            </div>
            {Data.map((post, index) => (
                <div key={index} className='flex_box2'>
                    <img src={post.image_url} alt="" className='publish_img' />
                    <p>{post.content}</p>
                    <p>{post.comments}</p>
                </div>
            ))}
        </div>
    );
}

export default PreviewBlog;
