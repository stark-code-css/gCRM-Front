import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {

  let auth = {'token':localStorage.getItem('token')}
  return (
    auth.token ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoute