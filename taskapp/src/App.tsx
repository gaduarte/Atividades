import { useState } from 'react'
import './App.css'
import { useMemo } from 'react'
import { useAuth } from './contexts/AuthContext'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFound'
import { TasksPage } from './pages/TasksPages'
import { Route, Routes, BrowserRouter, NavLink} from 'react-router-dom';
import { TaskPage } from './pages/TaskPage'
import { ProtectedRoute } from './components/ProtectedRoute'


function App() {
  const {signout, isAuthenticated, user} = useAuth()

const authBlock = useMemo(() => {
    return (
      isAuthenticated ?
        <p>{user!.username}
          <button onClick={() => { signout() }}>Sair</button>
        </p>
        : <p>Olá Visitante!</p>)
  }, [isAuthenticated])
  return (
    <div>
      <BrowserRouter>
        <header>
          <h1>Task App</h1>
          <p>{authBlock}</p>
          <nav>
            <ul>
              <li><NavLink to='/'>Home</NavLink></li>
              <li><NavLink to='/tasks'>Tasks</NavLink></li>
              <li><NavLink to='/login'>Login</NavLink></li>
            </ul>
          </nav>
        </header>

        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sobre" element={<TaskPage />} />
        <Route path='/tasks'>
          <Route index element={<ProtectedRoute><TasksPage/></ProtectedRoute>}></Route>
          <Route path=':id' element={<ProtectedRoute><TaskPage/></ProtectedRoute>}></Route>
          <Route path='*' element={<NotFoundPage/>}></Route>
        </Route>
      </Routes>

        <footer>
          <p>@TaskApp</p>
        </footer>
      </BrowserRouter>
    </div>
  )
}

export default App
