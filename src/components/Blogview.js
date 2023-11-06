import React from 'react'
import { useSelector} from 'react-redux';
import { Table, Button, Spin } from 'antd';

function Blogview() {
    const  BlogData= useSelector((state) => state.blog);
   
    const comments= useSelector((state) => state.comments);
    console.log("blog comments")
   
  
  return (
    <div className='view_blog'>
        {BlogData?.map((data,index)=>(
            <div className='flex_box2' key={index}>
             <img src={data.image_url} alt="user" className='publish_img' />
             <p>{data.content}</p>
            </div>
        ))}
    </div>
  )
}

export default Blogview