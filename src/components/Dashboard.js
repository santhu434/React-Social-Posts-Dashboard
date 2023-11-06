// Dashboard.js
import React, { useState } from 'react';
import PublishedBlog from './PublishedBlog';
import Blogview from './Blogview';
import { useDispatch} from 'react-redux';
import { handleViewBlog } from '../actions/userAction';

function Dashboard() {
const [toggle,setToggle]=useState(false)
const [clickedIndex, setClickedIndex] = useState(null);
const dispatch = useDispatch();

const handleBlogView=(id)=>{
 setClickedIndex(id === clickedIndex ? null :id);
 setToggle(true)
 dispatch(handleViewBlog(id))
}



  return (
  <div className='blog_flex'>
   <PublishedBlog handleBlogView={handleBlogView} clickedIndex={clickedIndex}/>
  {toggle?<Blogview/>:<div className='open_blog'>Click Blog To Open!</div>}
  </div>

  );
}

export default Dashboard;
