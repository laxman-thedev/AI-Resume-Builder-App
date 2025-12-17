import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'

import api from './configs/api.js'
import { login, setLoading } from './features/authSlice.js'

/**
 * Root application component
 * - Handles routing
 * - Fetches logged-in user data on refresh
 */
const App = () => {

  const dispatch = useDispatch()

  /**
   * Fetch user data if token exists
   * Keeps user logged in on page reload
   */
  const getUserData = async () => {
    const token = localStorage.getItem('token')
    try {
      if (token) {
        const { data } = await api.get(
          '/api/users/data',
          { headers: { Authorization: token } }
        )

        if (data.user) {
          dispatch(login({ token, user: data.user }))
        }
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
      {/* Global toast notifications */}
      <Toaster />

      {/* App routes */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>

        <Route path="view/:resumeId" element={<Preview />} />
      </Routes>
    </>
  )
}

export default App
