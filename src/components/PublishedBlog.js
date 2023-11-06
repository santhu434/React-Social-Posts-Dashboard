import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './dashboard.css';
import { fetchPostsRequest } from '../actions/userAction';
import { Button, List, Avatar } from 'antd';

function PublishedBlog({ handleBlogView, clickedIndex }) {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(1);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    dispatch(fetchPostsRequest(load));
    console.log(load);
  }, [load]);

  const handleLoadMore = (e) => {
    e.preventDefault(); // Prevent the default behavior of the button
    setLoad((prev) => prev + 1);
  };

  const publishedData = useSelector((state) => state.publishedData);

  useEffect(() => {
    if (publishedData && publishedData.length > 0) {
      setFetchedData((prevData) => [...prevData, ...publishedData]);
    }
  }, [publishedData]);

  return (
    <div className='blog_box'>
      <List
        itemLayout='horizontal'
        dataSource={fetchedData}
        renderItem={(item, index) => (
          <List.Item
            key={index}
            className={`flex_box ${item.id === clickedIndex ? 'clicked' : ''}`}
            onClick={() => handleBlogView(item.id)}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.image_url} />}
              title={<a href={item.href}>{item.name}</a>}
              description={new Date(item.user.created_at).toLocaleString()}
            />
          </List.Item>
        )}
      />
      {publishedData.length ==10? (
        <Button className='load_btn' onClick={handleLoadMore}>
          Load More
        </Button>
      ) : null}
    </div>
  );
}

export default PublishedBlog;
