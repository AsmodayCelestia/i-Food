import { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useOrder } from '../contexts/OrderProvider';
import { BsCart2 } from 'react-icons/bs';
import swal from "sweetalert"
import React from "react";
import axios from "axios";
import { OrderContext } from "../App";

export default function detailNews(){
  let {anything} = useContext(OrderContext)
  console.log(anything,'zzzzzzzzzzzzzfdsfsfdsfds');
    const [news, setNews] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [disabled, setDisabled] = useState(false)
    const { handleOrder } = useOrder();
    const [isLoading, setIsLoading] =useState(false)
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
            window.scrollTo(0,0);
        if(id){
            fetchById(id)
        }
    }, [id])

    const fetchById =async()=>{
        setIsLoading(true)
        try{
            const {data} = await axios.get("https://api.asmodaycelestia.online/menu/"+id)
            console.log(data, "<<<<<<<<<");
            setNews(data.menu)
        }catch(error){
            console.log(error);
        }
    }

    const addCart = async()=>{
        try {
            console.log("click", id);
            console.log(localStorage.getItem('Authorization'));
            const {data} = await axios.post(`https://api.asmodaycelestia.online/transaction`, {
                data: {menuId: id, quantity, price: news.price * quantity},    
                headers: {
                    Authorization : localStorage.getItem('Authorization'),
                }
            })
            console.log(data);
            navigate('/cart')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
  {/* Detail News Start */}
  <section className="page mx-24">
    <div id="register" className="register font-extrabold">
      <h2>
        <span>News</span>Detail
      </h2>
    </div>
    <div className="mt-7 flex justify-center w-full gap-7">
      <div className="cols-9">
        <img className="w-[2000px]" src={news.image} />
      </div>
      <div className="cols-3 w-full flex flex-col justify-center items-center">
        <div className="flex flex-col w-full font-extrabold text-5xl">
          <label>{news.name}</label>
        </div>
        <div className="mt-7 flex flex-col w-full text-3xl">
          <label htmlFor="">
            {news.description}
          </label>
        </div>
        <div className="mt-7 flex flex-col w-full font-extrabold text-5xl">
          <label htmlFor="">
            Rp. {news.price},00
          </label>
        </div>
                        {/* price and quantity  */}
                            <div className="flex items-center justify-center md:justify-start lg:justify-start space-x-6 pt-8">
                                <h1 className="text-3xl font-bold text-black poppins select-none" >Rp. {(news.price * quantity).toFixed(2)}</h1>
                                {/* quantity  */}
                                <div className="flex items-center border border-gray-200 px-4 py-2 space-x-6 rounded-full">
                                    <AiOutlineMinus onClick={() => {
                                        quantity === 1 ? setQuantity(1) : setQuantity(quantity - 1);
                                    }}
                                        className="text-2xl bg-primary w-8 h-8 rounded-full text-white hover:scale-105 transform transition duration-500 cursor-pointer p-1"
                                    />
                                    <span className="text-lg text-gray-700 poppins select-none">{quantity}</span>

                                    <AiOutlinePlus onClick={() => {
                                        setQuantity(quantity + 1);
                                    }}
                                        className="text-2xl bg-primary w-8 h-8 rounded-full text-white hover:scale-105 transform transition duration-500 cursor-pointer p-1"
                                    />
                                </div>
                            </div>

{/* add button  */}
<div className="mt-8 flex items-center justify-center md:justify-start lg:justify-start">
  <button
    disabled={disabled}
    className={
      disabled
        ? "opacity-30 flex items-center space-x-3 bg-primary px-6 py-3 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"
        : "flex items-center space-x-3 bg-primary px-6 py-3 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"
    }
    onClick={() => {
      addCart(id);
      news['quantity'] = quantity;
      news.price = news.price * quantity;
      handleOrder(news);
      setDisabled(true);
      swal("Wow!!!", "Your order has been added to the cart", "success");
    }}
  >
    <BsCart2 className="text-xl" />
    <span>{disabled ? "Added" : "Add to Cart"}</span>
  </button>
</div>

      </div>
    </div>
  </section>
  {/* Detail Bews End */}
</>
    )
}