import React, { useEffect, useState } from "react";
import axios from "axios";
import CardCart from '../components/CardCart';

const Cart = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Call fetchCart when the component is mounted
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("http://localhost:3000/cart", {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
        }
      });
      setNews(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to calculate the total price
  const calculateTotal = () => {
    return news.reduce((total, item) => total + item.Menu.price * item.quantity, 0);
  };

  const buy = async () => {
    try {
      // Make a POST request to send the total price to the server
      const response = await axios.post("http://localhost:3000/payment", {
        total: calculateTotal(),
      }, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
        },
      });

      // Handle the response as needed, e.g., show a success message
      console.log(response.data);
      window.location.href= response.data.invoiceUrl
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error(error);
    }
}

  return (
    <>
      <div className="h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {news.map((el) => (
              <section key={el.id}>
                <CardCart name={el.Menu.name} image={el.Menu.image} price={el.Menu.price} quantity={el.quantity} id={el.id}/>
              </section>
            ))}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">{calculateTotal()}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">Rp. {calculateTotal()}, 00</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button onClick={buy} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
              Check out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
