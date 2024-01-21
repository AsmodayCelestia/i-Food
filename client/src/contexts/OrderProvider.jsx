import React, { createContext, useContext, useState } from 'react';
import { OrderContext } from "../App";

export const useOrder = () => {
    return useContext(OrderContext)
}
const OrderProvider = ({ children }) => {
    const [order, setOrder] = useState([]);

    // add order function 
    const handleOrder = (food) => {
        console.log(food);
        setOrder((prevValue) => {
            return [
                ...prevValue,
                food, 
            ]
        })
    }

    //remove order from cart 
    const removeOrder = (id) => {
        setOrder((prev) => {
            return prev.filter(item => {
                return item.id !== id
            })
        })
    }


    const value = {
        setOrder,
        order,
        handleOrder,
        removeOrder
    }
    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderProvider







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
