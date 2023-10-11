import { useState } from 'react'
import './App.css'
import { useMemo } from 'react'
import { useAuth } from './contexts/AuthContext'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFound'
import { TasksPage } from './pages/TasksPages'
import { Route, Routes, BrowserRouter, Browse } from 'react-router-dom';
import { TaskPage } from './pages/TaskPage'

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
        </header>

        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/sobre' element={<TaskPage/>}></Route>
          <Route path='/tasks' element={<TasksPage />}></Route>
        </Routes>

        <footer>
          <p>@TaskApp</p>
        </footer>
      </BrowserRouter>
    </div>
  )
}

export default App
