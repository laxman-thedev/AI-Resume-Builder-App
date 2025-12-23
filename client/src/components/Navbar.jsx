import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../features/authSlice.js'

const Navbar = () => {
    // Get user data from Redux store
    const { user } = useSelector(state => state.auth)
    // Get dispatch function from Redux
    const dispatch = useDispatch()

    // Get navigate function from react-router-dom
    const navigate = useNavigate()

    // Function to handle user logout
    const LogoutUser = () => {
        navigate('/') // Redirect to home page
        dispatch(logout()) // Dispatch the logout action
    }

    return (
        <div className='shadow bg-white'>
            <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
                {/* Logo linked to the home page */}
                <Link to='/'>
                    <img src="/logo.svg" alt="logo" className='h-11 w-auto' />
                </Link>
                {/* User information and logout button */}
                <div className='flex items-center gap-4 text-sm'>
                    {/* Display user's name if available */}
                    <p className='max-sm:hidden'>Hi, {user?.name}</p>
                    <button onClick={LogoutUser} className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'>Logout</button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar