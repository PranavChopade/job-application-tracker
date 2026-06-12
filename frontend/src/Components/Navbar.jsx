import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from "../hooks/useUser"
import toast from "react-hot-toast"

const Navbar = () => {
  const navigate = useNavigate()
  const { logoutUser, getMe } = useUser()
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getMe()
      if (data?.user) {
        setUser(data.user)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    const data = await logoutUser()
    if (data?.message) {
      localStorage.removeItem("user");
      toast.success("Logged out successfully")
      navigate('/')
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-blue-400 to-indigo-500 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-105">
              <span className="text-lg">📋</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white tracking-tight">Job Tracker</h1>
              <p className="text-xs text-slate-400 font-medium">Manage your career</p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {user && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/50">
                <div className="w-6 h-6 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-slate-300 font-medium">{user.name}</span>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/50 hover:border-slate-600 text-sm font-medium transition-all duration-200 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar