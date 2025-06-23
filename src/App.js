// App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// PAGES & COMPONENTS
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'

// ✅ Import the context provider
import { WorkoutsContextProvider } from './context/WorkoutContext'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      {/* ✅ Wrap your app in the provider */}
      <WorkoutsContextProvider>
        <BrowserRouter>
          <Navbar />
          <div className='pages'>
            <Routes>
              <Route path='/' element={user ? <Home /> : <Navigate to="/login" />}
               />

              <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} 
              />

              <Route path='/signup' element={!user ?<Signup /> : <Navigate to="/" />}
               />
            </Routes>
          </div>
        </BrowserRouter>
      </WorkoutsContextProvider>
    </div>
  )
}

export default App
