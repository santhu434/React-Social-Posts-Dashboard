import { call, put, takeEvery,takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import { REGISTER_USER_REQUEST,REGISTER_USER_SUCCESS,
LOGIN_USER_REQUEST,LOGIN_USER_SUCCESS,UPDATE_PROFILE_REQUEST,
UPDATE_PROFILE_SUCCESS,CREATE_POST_REQUEST, UPDATE_POST_REQUEST,
LOGOUT_USER_REQUEST,LOGOUT_USER_SUCCESS,FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS,
DISPLAY_POST_REQUEST,DISPLAY_POST_SUCCESS, DELETE_POST_REQUEST,
DELETE_POST_SUCCESS,SEARCH_POST_REQUEST,SEARCH_POST_SUCCESS,PUBLISH_DATA_REQUEST,PUBLISH_DATA_SUCCESS,
VIEW_BLOG_REQUEST,VIEW_BLOG_SUCCESS,PREVIEW_BLOG_REQUEST,PREVIEW_BLOG_SUCCESS} from '../actions/userAction';




/////////////////////////////REGISTER
const API_URL = 'https://react-assignment-api.mallow-tech.com/api/register'

function* fetchUserRequestSaga (action){
    try {
        const response = yield call(axios.post,API_URL,action.payload);
        yield put({type:REGISTER_USER_SUCCESS,payload:response.data})
        alert('You Are Done')
    }catch(error){
        console.error(error); 
  
    }
}
///////////////////////////LOGIN
function* loginUserRequestSaga(action){

    try {
     
        const response = yield call(axios.post,'https://react-assignment-api.mallow-tech.com/api/login',action.payload);
        if(action.isChecked){
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem('token', response?.headers?.authorization)
        }
          
          
      yield put({type:LOGIN_USER_SUCCESS,payload:response.data})
    }catch(error){
        console.error(error.response); 
       
    }
}
///////////////////////////UPDATE PROFILE
function* updateProfilesaga(action) {
  try {
    const { formData } = action.payload;
    const token = localStorage.getItem("token")
    const dataItem = new FormData();

    dataItem.append('first_name', formData.firstName);
    dataItem.append('last_name', formData.lastName);
    dataItem.append('image', formData.profileImage);
    dataItem.append('_method', 'patch');

    const response = yield call(axios.post, 'https://react-assignment-api.mallow-tech.com/api/update/profile', dataItem, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/form-data',
        'X-Requested-With': 'XMLHttpRequest'
      },
    });
    try{
      const response1 = yield call(axios.get, 'https://react-assignment-api.mallow-tech.com/api/validate-user', {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/form-data',
          'X-Requested-With': 'XMLHttpRequest'
        },
      });

      localStorage.removeItem("user")
      localStorage.setItem("user", JSON.stringify(response1.data));
      yield put({type: UPDATE_PROFILE_SUCCESS, payload: response1.data})
    }catch(err){
      console.log(err);
    }
  } catch (error) {
    console.log(error);
  }
}


/////////////////////////CREATE POST
function* updatePostSaga(action) {
  try {
    const { formData } = action.payload;
    const token = localStorage.getItem("token");

    const dataItem = new FormData();
    dataItem.append('name', formData.name);
    dataItem.append('content', formData.content);
    dataItem.append('image', formData.image);
    dataItem.append('_method', 'post');
    

    const response = yield call(axios.post, 'https://react-assignment-api.mallow-tech.com/api/posts', dataItem, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/form-data',
        'X-Requested-With': 'XMLHttpRequest'
      },
    });

    const response1 = yield call(axios.get, `https://react-assignment-api.mallow-tech.com/api/posts?limit=7&page=${action.payload.page}&sort=created_at&order=desc&search=`, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/form-data',
        'X-Requested-With': 'XMLHttpRequest'
      },
    });
    yield put({type:UPDATE_POST_REQUEST, payload: response1.data.data}) 
  } catch (error) {
    console.error('An error occurred:', error);
  }
}


///////////////////////DISPLAY POST
function* displayPostSaga(action){
  try{
    const token = localStorage.getItem("token");
    const response = yield call(axios.get, `https://react-assignment-api.mallow-tech.com/api/posts?limit=7&page=${action.payload}&sort=created_at&order=desc&search=`,{
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/form-data',
        'X-Requested-With': 'XMLHttpRequest'
      },
    });

    yield put({type:DISPLAY_POST_SUCCESS, payload: { data: response.data.data, meta: response.data.meta }})
  }catch(err){
    console.log(err);
  }
}




////////////////////////////LOGOUT
function* logOutRequestsaga(action) {
  localStorage.removeItem("user")
  localStorage.removeItem("token")
  yield put({type:LOGOUT_USER_SUCCESS})
}


//////////////////////FETCH PUBLIC POST
function* fetchData(action) {
  try {
    const token = localStorage.getItem('token');

    const response = yield call(axios.get, `https://react-assignment-api.mallow-tech.com/api/public/posts?offset=${action.payload}&search=`,{
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/form-data',
        'X-Requested-With': 'XMLHttpRequest'
      },
    });
    console.log(response)

  yield put({type:FETCH_POSTS_SUCCESS,payload:response.data})
  } catch (error) {
    console.log(error.message);
  }
}

//////////////////////////////////////DELETE POST

function* deletePostSaga(action) {

 try{
  const token = localStorage.getItem("token");

    const response = yield call(axios.delete, `https://react-assignment-api.mallow-tech.com/api/posts/${action.payload}`,{
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/form-data',
        'X-Requested-With': 'XMLHttpRequest'
      },
    });

    const response1 = yield call(axios.get, `https://react-assignment-api.mallow-tech.com/api/posts?limit=7&page=${action.payload.page}&sort=created_at&order=desc&search=`, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/form-data',
        'X-Requested-With': 'XMLHttpRequest'
      },
    });
    yield put({type:DELETE_POST_SUCCESS, payload: response1.data.data})
  } catch (error) {
    console.error('An error occurred:', error);
  }

}

////////////////////////////////SEARCH POST

function* searchPostSaga(action){
  try{
  const token = localStorage.getItem("token");
  const response =yield call(axios.get,`https://react-assignment-api.mallow-tech.com/api/posts?limit=7&page=${action.payload.page}&sort=name&order=asc&search=${action.payload}`,
  {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/form-data',
      'X-Requested-With': 'XMLHttpRequest'
    },
  })
  yield put({type:SEARCH_POST_SUCCESS,payload:response.data.data})
  }catch (error){
  console.error('An error occurred:', error);
  }
}
//////////////////////////////////PUBLISH DATA

function* publishDataSaga(action){
  try{
    const token = localStorage.getItem("token");
    const response =yield call(axios.post,`https://react-assignment-api.mallow-tech.com/api/posts/${action.payload.postId}/publish/${!action.payload.isPublised}`,null,
    {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/form-data',
        'X-Requested-With': 'XMLHttpRequest'
      },
    });
    const response1 = yield call(axios.get, `https://react-assignment-api.mallow-tech.com/api/posts?limit=7&page=${action.payload.page}&sort=created_at&order=desc&search=`, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/form-data',
        'X-Requested-With': 'XMLHttpRequest'
      },
    });
    yield put({type:PUBLISH_DATA_SUCCESS,payload:response1.data.data})
  }catch (error){
    console.error('An error occurred:', error);
  }
}

///////////////////////////////////////VIEW BLOG
function* viewBlogSaga(action){
  try{
    const token = localStorage.getItem("token");
    const response =yield call(axios.get,`https://react-assignment-api.mallow-tech.com/api/public/posts/${action.payload}`,
    {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/form-data',
        'X-Requested-With': 'XMLHttpRequest'
      },
    });
    yield put({type:VIEW_BLOG_SUCCESS,payload:{blog:response.data,comments:response.data.comments}})
  }catch(error){
    console.error('An error occurred:', error);
  }
}
//////////////////////////////////////////PREVIEWBLOG
function* previewBlogSaga(action){
  try{
    const token = localStorage.getItem("token");
    const response =yield call(axios.get,`https://react-assignment-api.mallow-tech.com/api/posts/${action.payload}`,
    {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/form-data',
        'X-Requested-With': 'XMLHttpRequest'
      },
    }); console.log(response.data)
  yield put({type:PREVIEW_BLOG_SUCCESS,payload:response.data})
  }catch(error){
    console.error('An error occurred:', error);
  }
}


function* rootSaga(){
    yield takeLatest(FETCH_POSTS_REQUEST,fetchData);
    yield takeEvery(REGISTER_USER_REQUEST,fetchUserRequestSaga)
    yield takeEvery(LOGIN_USER_REQUEST,loginUserRequestSaga)
    yield takeEvery(UPDATE_PROFILE_REQUEST,updateProfilesaga)
    yield takeEvery(CREATE_POST_REQUEST,updatePostSaga)
    yield takeEvery(LOGOUT_USER_REQUEST,logOutRequestsaga)
    yield takeEvery(DISPLAY_POST_REQUEST,displayPostSaga)
    yield takeEvery(DELETE_POST_REQUEST,deletePostSaga)
    yield takeEvery(SEARCH_POST_REQUEST,searchPostSaga)
    yield takeEvery(PUBLISH_DATA_REQUEST,publishDataSaga)
    yield takeEvery(VIEW_BLOG_REQUEST,viewBlogSaga)
    yield takeEvery(PREVIEW_BLOG_REQUEST,previewBlogSaga)
}


export default rootSaga;