import React, { useState } from 'react'
import { useUser } from "../hooks/useUser"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const Auth = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [state, setState] = useState("signup")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { registerUser, loginUser } = useUser()

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast.error("Email and password are required")
      return
    }
    if (state === "signup" && !formData.name) {
      toast.error("Name is required")
      return
    }
    if (state === "signup" && formData.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    setLoading(true)
    let data
    if (state === "signup") {
      data = await registerUser(formData)
    } else {
      data = await loginUser(formData)
    }
    setLoading(false)

    if (data?.user) {
      localStorage.setItem("user", JSON.stringify(data.user))
      toast.success(state === "signup" ? "Account created! 🎉" : "Welcome back! 👋")
      navigate("/dashboard")
    } else {
      toast.error(data?.message || "Something went wrong")
    }
  }

  const toggleState = () => {
    setState(state === "signup" ? "login" : "signup")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-blue-950 to-indigo-950 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md px-4">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-blue-400 to-indigo-500 shadow-lg shadow-blue-500/25 mb-4">
            <span className="text-3xl">📋</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Job Tracker</h1>
          <p className="text-slate-400 mt-1 text-sm">Manage your career journey</p>
        </div>

        {/* Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-sm"></div>
          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-white">
                {state === "signup" ? "Create account" : "Welcome back"}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                {state === "signup"
                  ? "Start tracking your job applications"
                  : "Sign in to your account"}
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {state === "signup" && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-linear-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  state === "signup" ? "Create account" : "Sign in"
                )}
              </button>
            </form>

            {/* Toggle */}
            <div className="mt-6 text-center">
              <p className="text-slate-400 text-sm">
                {state === "signup" ? "Already have an account?" : "Don't have an account?"}
                {' '}
                <button
                  onClick={toggleState}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                >
                  {state === "signup" ? "Sign in" : "Create one"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth