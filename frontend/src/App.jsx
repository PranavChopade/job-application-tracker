import React from 'react'
import Auth from './Pages/Auth'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import PageNotFound from './Components/PageNotFound'
import Dashboard from './Pages/Dashboard'
import Protected from './Components/Protected'
const App = () => {
  return (
    <div className='min-h-screen'>
      <Router>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1e1e2e',
              color: '#cdd6f4',
              borderRadius: '12px',
              padding: '14px 20px',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              border: '1px solid rgba(205, 214, 244, 0.1)',
            },
            success: {
              iconTheme: { primary: '#a6e3a1', secondary: '#1e1e2e' },
              style: { borderColor: 'rgba(166, 227, 161, 0.3)' }
            },
            error: {
              iconTheme: { primary: '#f38ba8', secondary: '#1e1e2e' },
              style: { borderColor: 'rgba(243, 139, 168, 0.3)' }
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App