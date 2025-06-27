import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['Manager', 'Employee']}>
              {localStorage.getItem('role') === 'Manager' ? (
                <ManagerDashboard />
              ) : (
                <EmployeeDashboard />
              )}
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
