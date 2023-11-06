import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

function RootLayOut() {
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
}

export default RootLayOut