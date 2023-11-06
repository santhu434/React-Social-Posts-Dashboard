
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const CREATE_POST_REQUEST='CREATE_POST_REQUES';
export const UPDATE_POST_REQUEST='UPDATE_POST_REQUEST';
export const LOGOUT_USER_REQUEST='LOGOUT_USER_REQUEST'
export const LOGOUT_USER_SUCCESS='LOGOUT_USER_SUCCESS'
export const GET_PUBLIC_POST = 'GET_PUBLIC_POST';
export const SET_PUBLIC_POST = 'SET_PUBLIC_POST';
export const FETCH_POSTS_REQUEST=' FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS='FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE='FETCH_POSTS_FAILURE';
export const DISPLAY_POST_REQUEST='DISPLAY_POST_REQUEST'
export const DISPLAY_POST_SUCCESS='DISPLAY_POST_SUCCESS'
export const DELETE_POST_REQUEST='DELETE_POST_REQUEST'
export const DELETE_POST_SUCCESS='DELETE_POST_SUCCESS'
export const SEARCH_POST_REQUEST='SEARCH_POST_REQUEST'
export const SEARCH_POST_SUCCESS='SEARCH_POST_SUCCESS'
export const PUBLISH_DATA_REQUEST='PUBLISH_DATA_REQUEST'
export const PUBLISH_DATA_SUCCESS='PUBLISH_DATA_SUCCESS'
export const VIEW_BLOG_REQUEST='VIEW_BLOG_REQUEST'
export const VIEW_BLOG_SUCCESS='VIEW_BLOG_SUCCESS'
export const PREVIEW_BLOG_REQUEST='PREVIEW_BLOG_REQUEST'
export const PREVIEW_BLOG_SUCCESS='PREVIEW_BLOG_SUCCESS'

export const fetchPostsRequest = (load) => ({
  type: FETCH_POSTS_REQUEST,
  payload:load
});

export const registerUser = (formData) => ({
  type: REGISTER_USER_REQUEST,
  payload: formData,
});

export const loginUser = (formData,isChecked) => ({
  type: LOGIN_USER_REQUEST,
  payload: formData,isChecked
});

export const updateProfileRequest = (payload) => ({
  type: UPDATE_PROFILE_REQUEST,
  payload
});

export const fogotpasswordrequest = (formData) => ({
  type: FORGOT_PASSWORD_REQUEST,
  payload: formData,
});

export const createPostRequest = (formData,page) =>({
  type: CREATE_POST_REQUEST,
  payload:formData,page
})

export const logOutRequest = () =>({
  type: LOGOUT_USER_REQUEST,
})

export const displayPost = (page) =>({
  type: DISPLAY_POST_REQUEST,
  payload:page
})

export const deletePost = (Id,page) =>({
  type: DELETE_POST_REQUEST,
  payload:Id,page
})

export const searchPost = (value,page) =>({
  type: SEARCH_POST_REQUEST,
  payload:value,page
})

export const publishData = ({postId,isPublised,page}) =>({
  type: PUBLISH_DATA_REQUEST,
  payload:{postId,isPublised,page}
})

export const handleViewBlog= (id) =>({
  type: VIEW_BLOG_REQUEST,
  payload:id
})
export const previewViewBlog= (id) =>({
  type: PREVIEW_BLOG_REQUEST,
  payload:id
})