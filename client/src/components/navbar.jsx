import { useEffect } from "react";
import { AiOutlineMenu,  } from "react-icons/ai";
import { BsCart2 } from 'react-icons/bs';
import { Link, useNavigate } from "react-router-dom";
// import { useOrder } from '../contexts/OrderProvider';

export default function Navbar(){
    // const { order } = useOrder();
    const navigate = useNavigate()

    useEffect(() => {
        // Toggle class active
    const navbarNav = document.querySelector('.navbar-nav');
    //ketika hamburger menu di klik
    document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
    };

    // klik diluar sidebar untuk menutup hamburger menu

    const hamburger = document.querySelector('#hamburger-menu');

    document.addEventListener('click', function(e){
    if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
    }); 
    }, [])

    const logout = ()=>{
        // console.log("masuk");
        localStorage.clear()
        navigate("/")
    }
    return( 
    <>
  {/* Navbar Start */}
  <nav className="navbar">
      <Link className="navbar-logo ml-5" to={'/'}>I-<span>FOOD</span>.</Link>
    <div className="flex w-full navbar-nav sm:flex-row flex-col sm:justify-center justify-start">
      <Link to={'/'}>Home</Link>
      {/* <Link to={'/category'}>Category</Link> */}
      <Link to={'/register'}>Register</Link>
      <a onClick={logout}>{localStorage.Authorization ? "Logout" : ""}</a>
      <div className="relative flex cursor-pointer" onClick={() => history.push('/orders')}>
              <span className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white poppins absolute -right-2 -top-2">4</span>
          <BsCart2 className="cursor-pointer w-6 h-6 text-white" />
      </div>
    </div>
    <div className="flex-auto navbar-extra mr-5 justify-end">
            <a href="#" id="hamburger-menu">
                <AiOutlineMenu/>
            </a>
        </div>
  </nav>
  {/* Navbar End */}

    </>
    )
}





// import React, { createContext, useContext, useState } from 'react';
// import axios from 'axios';

// export const OrderContext = createContext();

// export const useOrder = () => {
//     return useContext(OrderContext)
// }
// const OrderProvider = ({ children }) => {
//     const [order, setOrder] = useState([]);

//     // add order function 
//     const handleOrder = (food) => {
//         console.log(food, "ini food");
//         // const {data} = await axios.post("https://api.asmodaycelestia.online/cart", {
//         //     data: {menuId: id, quantity, price: news.price * quantity},    
//         //     headers: {
//         //         Authorization : localStorage.getItem('Authorization'),
//         //     }
//         // })
//         // setOrder((prevValue) => {
//         //     return [
//         //         ...prevValue,
//         //         food, 
//         //     ]
//         // })
//     }

//     //remove order from cart 
//     // const removeOrder = (id) => {
//     //     setOrder((prev) => {
//     //         return prev.filter(item => {
//     //             return item.id !== id
//     //         })
//     //     })
//     // }


//     const value = {
//         setOrder,
//         order,
//         handleOrder,
//         // removeOrder
//     }
//     return (
//         <OrderContext.Provider value={value}>
//             {children}
//         </OrderContext.Provider>
//     )
// }

// export default OrderProvider
