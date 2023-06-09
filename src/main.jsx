import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Main from './layout/Main.jsx'
import Home from './components/Home.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import ForgotPS from './components/ForgotPS.jsx'
import MyAccount from './components/MyAccount.jsx'
import { Toaster } from 'react-hot-toast'
import ErrorPage from './components/ErrorPage'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/forgotpassword',
        element: <ForgotPS></ForgotPS>
      },
      {
        path: '/myaccount',
        element: <MyAccount></MyAccount>
      }

    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
  </React.StrictMode>,
)
