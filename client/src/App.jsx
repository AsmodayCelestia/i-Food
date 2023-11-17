import { useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/navbar';
import './style.css'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {RouterProvider, createBrowserRouter, redirect} from "react-router-dom"
import HomePage from './views/HomePage.jsx'
import Login from './views/Login.jsx'
import Register from './views/Register.jsx'
import DetailNews from './views/DetailNews.jsx';
import CartPage from './views/CartPage.jsx'
import CardCart from './components/CardCart.jsx';
import CardItem from './components/CardItem.jsx';
// import EditImage from './views/editImage.jsx'
// import EditNews from './views/editNews.jsx'
// import Category from './views/category.jsx'
import Layout from './components/Layout.jsx'
import OrderProvider from './contexts/OrderProvider.jsx';

const loader = ()=>{
  if(!localStorage.Authorization){
    console.log('mmm');
    return redirect('/login')
  } 
  return null
}
const router = createBrowserRouter([
  {
    element: <Layout/>,
    children:[
      {
        path: "/",
        element: <HomePage/>,
        loader 
      },
      {
        path: "/home",
        element: <HomePage/>, 
        loader
      },
      {
        path: "/cart",
        element: <CartPage/>,
        loader
      },
      // {
      //   path: "/editImage/:id",
      //   element: <EditImage/>,
      //   loader
      // },
      // {
      //   path: "/editNews/:id",
      //   element: <EditNews/>, 
      //   loader
      // },
      // {
      //   path: "/addNews",
      //   element: <EditNews/>, 
      //   loader
      // },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/menu/:id",
        element: <DetailNews/>
      },
      {
        path: "/register",
        element: <Register/>,
        loader
      },
      // {
      //   path: "/category",
      //   element: <Category/>,
      //   loader
      // }
    ]
  }
])


function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="770065709347-c3052vfr69lljkpgprgca0ukc4322f04.apps.googleusercontent.com">
          <OrderProvider>
              <RouterProvider router={router}/>
          </OrderProvider>
      </GoogleOAuthProvider>;
    </>
  )
}

export default App
