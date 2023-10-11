import React, { useState } from 'react'
import './App.css'
import { useMemo } from 'react'
import { useAuth } from './contexts/AuthContext'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFound'
import { TasksPage } from './pages/TasksPages'
import { Route, Routes, BrowserRouter, NavLink, createBrowserRouter, RouterProvider} from 'react-router-dom';
import { TaskPage } from './pages/TaskPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Root } from './routes/root'
import { createRoot } from 'react-dom/client'


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

const router = createBrowserRouter([{
  path: '/',
  element: <Root/>,
  errorElement: <NotFoundPage />,
},
{
  path: '/login',
  element: <LoginPage />
},
{
  path: '/sobre',
  element: <TaskPage />
},
{
  path: '/tasks',
  element: <ProtectedRoute><TasksPage/></ProtectedRoute>
},
{
  path: '/tasks/:id',
  element: <ProtectedRoute><TaskPage/></ProtectedRoute>
}
]);

const rootElement = document.getElementById('root');
if(rootElement){
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

  return (
    <div>
        <header>
          <h1>Task App</h1>
          <p>{authBlock}</p>
          
        </header>

        <footer>
          <p>@TaskApp</p>
        </footer>
    </div>
  )
}

export default App
