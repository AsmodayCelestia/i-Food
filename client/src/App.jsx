// import { useState } from 'react'
import React, { useEffect } from 'react'
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
import axios from 'axios';
// import OrderProvider from './contexts/OrderProvider.jsx';

import { createContext, useContext, useState } from 'react';

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



export const OrderContext = createContext();

function App() {
  const [order, setOrder] = useState([])
  useEffect(()=>{
    total()
}, [order])
  const total = async()=>{
    const {data} = await axios.get('https://ifood.asmodaycelestia.online/ifood/cart', {
      headers: {
        Authorization : localStorage.getItem('Authorization'),
    }
    })
    console.log(data, "yuhuuuuuuuuu");
    // setOrder(data)
  }
  const value = {
    // setOrder,
    order:[{ihihi:'asd'}],
    // handleOrder,
    // removeOrder,
    anything : 'adsadsadsadsad'
}
  return (
    <>
      <GoogleOAuthProvider clientId="770065709347-c3052vfr69lljkpgprgca0ukc4322f04.apps.googleusercontent.com">
          <OrderContext.Provider  value={value}>
              <RouterProvider router={router}/>
          </OrderContext.Provider>
      </GoogleOAuthProvider>;
    </>
  )
}

export default App

// import { useState, createContext } from 'react'
// import React from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import Navbar from './components/navbar';
// import './style.css'
// import './index.css'
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import {RouterProvider, createBrowserRouter, redirect} from "react-router-dom"
// import HomePage from './views/HomePage.jsx'
// import Login from './views/Login.jsx'
// import Register from './views/Register.jsx'
// import DetailNews from './views/DetailNews.jsx';
// import CartPage from './views/CartPage.jsx'
// import CardCart from './components/CardCart.jsx';
// import CardItem from './components/CardItem.jsx';
// // import EditImage from './views/editImage.jsx'
// // import EditNews from './views/editNews.jsx'
// // import Category from './views/category.jsx'
// import Layout from './components/Layout.jsx'
// import OrderProvider from './contexts/OrderProvider.jsx';

// const loader = ()=>{
//   if(!localStorage.Authorization){
//     console.log('mmm');
//     return redirect('/login')
//   } 
//   return null
// }
// const router = createBrowserRouter([
//   {
//     element: <Layout/>,
//     children:[
//       {
//         path: "/",
//         element: <HomePage/>,
//         loader 
//       },
//       {
//         path: "/home",
//         element: <HomePage/>, 
//         loader
//       },
//       {
//         path: "/cart",
//         element: <CartPage/>,
//         loader
//       },
//       // {
//       //   path: "/editImage/:id",
//       //   element: <EditImage/>,
//       //   loader
//       // },
//       // {
//       //   path: "/editNews/:id",
//       //   element: <EditNews/>, 
//       //   loader
//       // },
//       // {
//       //   path: "/addNews",
//       //   element: <EditNews/>, 
//       //   loader
//       // },
//       {
//         path: "/login",
//         element: <Login/>
//       },
//       {
//         path: "/menu/:id",
//         element: <DetailNews/>
//       },
//       {
//         path: "/register",
//         element: <Register/>,
//         loader
//       },
//       // {
//       //   path: "/category",
//       //   element: <Category/>,
//       //   loader
//       // }
//     ]
//   }
// ])


// function App() {
//       const [order, setOrder] = useState([]);
//       const OrderContext = createContext();
//       // add order function 
//       const handleOrder = (food) => {
//           console.log(food, "ini food");
//           // const {data} = await axios.post("https://api.asmodaycelestia.online/cart", {
//           //     data: {menuId: id, quantity, price: news.price * quantity},    
//           //     headers: {
//           //         Authorization : localStorage.getItem('Authorization'),
//           //     }
//           // })
//           // setOrder((prevValue) => {
//           //     return [
//           //         ...prevValue,
//           //         food, 
//           //     ]
//           // })
//       }
  
//       //remove order from cart 
//       // const removeOrder = (id) => {
//       //     setOrder((prev) => {
//       //         return prev.filter(item => {
//       //             return item.id !== id
//       //         })
//       //     })
//       // }
  
  
     
//     const value = {
//         setOrder,
//         order,
//         handleOrder,
//         // removeOrder
//     }
//   return (
//     <>
//       <GoogleOAuthProvider clientId="770065709347-c3052vfr69lljkpgprgca0ukc4322f04.apps.googleusercontent.com">
//         <OrderContext.Provider value={value}>
//           <RouterProvider router={router}/>
//         </OrderContext.Provider>
//       </GoogleOAuthProvider>;
//     </>
//   )
// }

// export default App

