import React, { useEffect, useState } from 'react';
import { Modal,Button, Form, Input} from 'antd';
import { SearchOutlined } from '@ant-design/icons'; 
import './post.css';
import { useDispatch,useSelector} from 'react-redux';
import { createPostRequest,displayPost,deletePost,searchPost,publishData,previewViewBlog} from '../actions/userAction';
import BlogTable from './BlogTable';
import PreviewBlog from './PreviewBlog';
import { useNavigate } from 'react-router-dom';


function Post() {
 
 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchItem,setSearchItem]=useState('')
    const [loading, setLoading] = useState(true);
    const posts= useSelector(state => state.data); 
    const[page,setPage]=useState(1)
    const getPageNumber=(pageNumber)=>{
       setPage(pageNumber)
    }
    const dispatch = useDispatch();
  
    const [formData, setFormData] = useState({
      name:'',
      content:'',
      image: null,
    });
    
    useEffect(() => {
        dispatch(displayPost(page));
    }, [page]);

  
    
    const handleUpdatePost = (e) => {
      e.preventDefault()
      dispatch(createPostRequest({ formData,page}));
      setIsModalOpen(false)
    
    };
    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => { 
        setIsModalOpen(false);
      };
    
      function handleDelete(Id){
        dispatch(deletePost(Id,page))
       
      }

      const handleSearch = (e) => {
        const newValue = e.target.value;
        setSearchItem(newValue)
        dispatch(searchPost(newValue,page))
       
      }
   
      const handlePublishBlog = (postId,isPublised) => {
          dispatch(publishData({postId,isPublised,page}))

      };
////////////////////////////////////
const[preview,setPreview]=useState(false)



const handlePreview=(id)=>{
  console.log(id)
  dispatch(previewViewBlog(id))
  setPreview(true)

}


function handlePreviewBack() {

  setPreview(false)


}

  return (
<>
{preview?<PreviewBlog handlePreviewBack={handlePreviewBack}/>:
  <>
    <div className='navbar'>
        <span id='heading'>Posts</span>
        <Input
          placeholder='Search'
          addonBefore={<SearchOutlined className='icon-search'/>}
          className='search'
          value={searchItem}
          onChange={handleSearch}
        />
        <Button id='btn-create' onClick={showModal}>Create</Button>
      <div className='modal'>
        <Modal title="Title" width={400} open={isModalOpen} onCancel={handleCancel} 
          footer={
           <>
             <Button key="back" onClick={handleCancel}>
              Cancel
             </Button>
             <Button key="submit" type="primary" onClick={handleUpdatePost}>
              Submit
            </Button>
           </>
         }>
          <Form layout='vertical'>
            <Form.Item
              label="Blog Title"
              name="name"
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
                  setFormData({ ...formData, name: e.target.value })
                }/>
            </Form.Item>
            <Form.Item
              label="Content"
              name="content"
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
                  setFormData({ ...formData, content: e.target.value })
              }/>
            </Form.Item>
            <Form.Item>
              <Input type='file' onChange={(e) => {
                const file = e.target.files[0];
                setFormData({ ...formData, image: file });
              }}/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
     <BlogTable
      posts={posts}
      loading={loading}
      handleDelete={handleDelete}
      handlePublishBlog={handlePublishBlog}
      getPageNumber={getPageNumber}
      handlePreview={handlePreview}
      preview={preview}
      />
 </>
} 
</>
  
  );

            }
export default Post;
