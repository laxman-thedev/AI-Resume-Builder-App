import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Login from './Login'

/**
 * Layout component acts as a wrapper for authenticated and unauthenticated routes.
 * It checks the user's authentication status from the Redux store.
 * - If the user is loading, it displays a Loader.
 * - If the user is authenticated, it renders the Navbar and the child routes via Outlet.
 * - If the user is not authenticated, it renders the Login component.
 */
const Layout = () => {

    // Get user authentication status and loading state from Redux store
    const { user, loading } = useSelector(state => state.auth)

    // Display a loader while authentication status is being determined
    if (loading) {
        return <Loader />
    }

    return (
        <div>
            {
                user ? (
                    // If user is authenticated, show Navbar and render child routes
                    <div className='min-h-screen bg-gray-50'>
                        <Navbar />
                        <Outlet />
                    </div>
                ) : (
                    <Login />
                )
            }

        </div>
    )
}

export default Layout