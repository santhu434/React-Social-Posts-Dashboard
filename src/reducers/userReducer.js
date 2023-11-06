import { REGISTER_USER_SUCCESS ,LOGIN_USER_SUCCESS,UPDATE_PROFILE_SUCCESS,LOGOUT_USER_SUCCESS,UPDATE_POST_REQUEST,
FETCH_POSTS_SUCCESS,DISPLAY_POST_SUCCESS,DELETE_POST_SUCCESS,SEARCH_POST_SUCCESS, PUBLISH_DATA_SUCCESS,VIEW_BLOG_SUCCESS,
PREVIEW_BLOG_SUCCESS} from "../actions/userAction";

const initialState = {
    users: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("token"),
    post:null, 
    publishedData: [],
    error: null,
    data: [],
    meta: {},
    blog:[],
    comments:[],
    previewBlog:[]
  };
  
const rootReducer =(state=initialState,action)=>{
    switch(action.type){

        case FETCH_POSTS_SUCCESS:
            return { 
                ...state, 
                loading: false,
                publishedData: [...action.payload] 
            };

        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                users:action.payload,
                isAuthenticated:true,
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                users:action.payload,
                isAuthenticated:true,
            }
        case UPDATE_PROFILE_SUCCESS:
                return {
                    ...state,
                    users:action.payload
                }
        case UPDATE_POST_REQUEST:
                return {
                    ...state,
                    data: action.payload
                }
        case DISPLAY_POST_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                meta: action.payload.meta
               };

        case LOGOUT_USER_SUCCESS:
                return {
                    ...state,
                    isAuthenticated:false,
                };

        case DELETE_POST_SUCCESS:
                return {
                    ...state,
                    data: action.payload
                };

        case SEARCH_POST_SUCCESS:
                return {
                    ...state,
                    data: action.payload
                };
        case PUBLISH_DATA_SUCCESS:
                return {
                    ...state,
                    data: action.payload
                }    
        case VIEW_BLOG_SUCCESS:
                return {
                     ...state,
                    blog:[action.payload.blog],
                    comments:action.payload.comments
                } 
        case PREVIEW_BLOG_SUCCESS:
               return {
                ...state,
                previewBlog:[action.payload]
               }    
        default:
            return state
    }
}
 export default rootReducer;