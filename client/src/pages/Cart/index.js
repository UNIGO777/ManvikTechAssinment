import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import { Link, useNavigate } from 'react-router-dom';



const Cart = ({ cart, setCart }) => {

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);


  const handleQuantityChange = async (productId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart/increase', { userId: JSON.parse(localStorage.getItem('user'))._id, productId });
      if (response.status === 200) {
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
        setCart(prevItems =>
          prevItems.map(item =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
          )
        ); // Update the cart as well
      }

    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart/decrease', { userId: JSON.parse(localStorage.getItem('user'))._id, productId });
      if (response.status === 200) {
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.productId === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
          )
        );
        setCart(prevItems =>
          prevItems.map(item =>
            item.productId === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
          )
        ); // Update the cart as well
      }
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.delete('http://localhost:5000/api/cart/remove', { data: { userId: JSON.parse(localStorage.getItem('user'))._id, productId } });
      if (response.status === 200) {
        setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
        setCart(prevItems =>
          prevItems.map(item =>
            item.productId === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
          )
        )
      }

    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const totalAmount = cartItems?.reduce((total, item) => total + item.quantity * item.productId.price, 0);

  if (cartItems?.length > 0) return (
    <div className='p-2 px-4 md:p-8 md:px-12 '>
      <h1 className='font-semibold text-4xl mb-7'>Your Cart</h1>
      <table className="min-w-full">
        <thead className='uppercase text-xl border-b-2 border-[#ededed] '>
          <tr>
            <th className="text-left font-normal px-0 md:px-4 py-2">Product</th>
            <th className="text-left hidden md:visible font-normal px-4 py-2">Quantity</th>
            <th className="text-right md:text-left font-normal px-4 py-2 ">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems?.map(item => (
            <tr key={item.productId._id} className='h-auto md:h-[200px]'>
              <td className="px-0 md:px-4 py-2 w-full md:w-[60%]">
                <div className='flex items-center'>
                  <div className='border border-[#ededed] px-2'>
                    <img src={item.productId.image} alt={item.productId.name} className='w-24 ' />
                  </div>
                  <div className='w-[70%] text-sm px-2 md:px-10 p-3'>
                    <h1 className='w-full font-semibold'>{item.productId.name}</h1>
                    <p className='font-normal'>${item.productId.price}</p>
                    <p className='font-light'>Size: 10.2"L x 9.34"W x 4.38"H</p>
                    <p className='font-light'>Color: Silver</p>
                  </div>
                </div>
              </td>
              <td className="px-4 hidden md:flex h-auto md:h-[200px] items-center">
                <div className="flex items-center border-2 justify-between w-fit md:w-fit shadow-sm shadow-[#000000a5] rounded-md">
                  <button
                    onClick={() => handleDecreaseQuantity(item.productId._id, item.quantity)}
                    className="rounded-l px-4 text-xl py-2"
                  >
                    -
                  </button>
                  <div min="1" readOnly className="text-center w-10 text-2xl">{item.quantity}</div>
                  <button
                    onClick={() => handleQuantityChange(item.productId._id, item.quantity)}
                    className="px-4 text-center text-xl"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.productId._id)}
                  className="ml-4 px-1 py-1 text-center text-xl flex items-center"
                >
                  <svg className='w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path></svg>
                </button>
              </td>
              <td className="px-4 py-2">${(item?.quantity * item?.productId.price)?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-end'>
        <div className="mt-4 w-full text-end">
          <h2 className="text-xl font-semibold  mb-5">Estimated total  <span className='font-normal ml-3 font-sans'>${totalAmount?.toFixed(2)}</span></h2>
          <p className='mb-2 text-sm'>Free Shipping On All Products within USA</p>
          <button className="mt-4 bg-primary text-white p-3 px-20 rounded-md  font-semibold shadow-lg">Continue shopping</button>
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 py-24">
      <h1 className="text-2xl font-mono  mb-10">Your cart is empty</h1>
      <button className="bg-primary px-10 text-white p-3 rounded-lg font-semibold  mb-10" onClick={() => navigate("/")}>Continue shopping</button>
      <p className="text-gray-600">Have an account?</p>
      <p className="text-black cursor-pointer"><Link to="/authentication"><span className='text-primary underline '>Log in</span></Link> to check out faster.</p>
    </div>
  )
}

export default Cart;
