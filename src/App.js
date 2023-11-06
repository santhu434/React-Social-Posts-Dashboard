import React from 'react'
import Sign_Up from './components/Sign_Up'
import Sign_In from './components/Sign_In'
import { BrowserRouter, Routes,Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import RootLayOut from './layout/RootLayOut'
import Post from './components/Post'
import { useSelector, useDispatch } from 'react-redux';
import PreviewBlog from './components/PreviewBlog'




function App() {
  const user = useSelector(state => state.isAuthenticated);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/RootLayOut" /> : <Sign_In />} />
        <Route path="/Sign_Up" element={<Sign_Up />} />
        
        <Route
          path="/RootLayOut" element={user? <RootLayOut /> : <Navigate to="/"/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='Dashboard' element={<Dashboard/>}/>
          <Route path="Post" element={<Post />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;