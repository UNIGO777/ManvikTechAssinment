import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductCard = ({ image, name, price, id, cart, setCart }) => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    setCartItems(cart)
  }, [])
  console.log(cartItems,"jdksd")
  // Check if the item is already in the cart
  
  const rating = 4; // Dummy rating

  const stars = Array(5).fill(0).map((_, index) => (
    <span key={index} className={`text-[#ffcb2f] text-xl w-5 ${index < rating ? 'filled' : ''}`}>★</span>
  ));

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user._id : null;

    if (userId) {
      try {
        const response = await axios.post('http://localhost:5000/api/cart/add', {
          userId,
          productId: id,
          quantity: 1,
        });
        if (response.status === 200) {
          const newCartItems = [...cartItems, { productId: id, quantity: 1 }];
          setCartItems(newCartItems);
          setCart(newCartItems);
         
          alert("product is added in cart")
        } else {
          console.error('Failed to add item to cart');
        }
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }
  };

  return (
    <div className="rounded-lg w-full max-w-sm mx-auto relative">
      <span className='bg-[red] text-white p-2 px-3 absolute top-5 rounded-full'>55% off</span>
      <img src={image} alt={name} loading='lazy' className="h-auto min-h-[40vh] object-cover rounded-md" />
      <h2 className="text-lg font-semibold mt-2">{name}</h2>
      <p className="text-gray-700 text-xl">${price}</p>
      <div className="flex mt-1">
        {stars}
      </div>
      <button 
        onClick={handleAddToCart} 
        className={`mt-4 p-2 rounded w-full bg-primary text-white`}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
