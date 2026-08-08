import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import AuthDrawer from '../Components/Auth/AuthDrawer'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  const[authOpen, setAuthOpen] = useState(false)
  return (
    <>
    <Navbar setAuthOpen={setAuthOpen} />
    <AuthDrawer authOpen={authOpen} setAuthOpen={setAuthOpen} />
    <Outlet />
    </>
  )
}

export default MainLayout