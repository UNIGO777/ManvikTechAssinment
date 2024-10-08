import React, { Children, Suspense, lazy, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'
import CombineMNF from './hoc/combileMNF' // Import the CombineMNF HOC
import Cookies from 'js-cookie'
import ProtectedRoute from './hoc/protectedRoute'


const Home = lazy(() => import('./pages/Home'))
const Cart = lazy(() => import('./pages/Cart'))
const ViewProducts = lazy(() => import('./pages/viewProducts'))
const AdminPanel = lazy(() => import('./AdminPanel'))
const Authentication = lazy(() => import('./pages/Authentication'))

const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="loader"></div>
    <style jsx>{`
      .loader {
        border: 8px solid #f3f3f3; /* Light grey */
        border-top: 8px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 60px;
        height: 60px;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);



const App = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true)
  const [cartItems, setCartItems] = useState()
  const [cartItemsapp, setCartItemsapp] = useState([])
  

  const user = JSON.parse(localStorage.getItem('user'));
  console.log(categories)
  
  

  useEffect(() => {
    const checkToken = () => {
      const token = Cookies.get('token'); // Get the token from cookies
      if (!token) {
        localStorage.clear(); // Clear localStorage if token is not present
      }};

      
    
    
    

    const fetchData = async () => {
      const userId = JSON.parse(localStorage.getItem('user'))?._id;
      try {
        const categoriesResponse = await axios.get('http://localhost:5000/api/categories/categories');
        const subCategoriesResponse = await axios.get('http://localhost:5000/api/categories/subcategories');
        const subSubCategoriesResponse = await axios.get('http://localhost:5000/api/categories/sub-subcategories');
        const productsResponse = await axios.get('http://localhost:5000/api/products');
        const cart = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCategories(categoriesResponse.data);
        setSubCategories(subCategoriesResponse.data);
        setCartItems(cart.data.items)
        setSubSubCategories(subSubCategoriesResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    checkToken();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = JSON.parse(localStorage.getItem('user'))?._id; // Retrieve user ID from localStorage
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
          if (response.status === 200) {
            setCartItems(response.data.items);
          }
         
        } catch (error) {
          console.error('Error fetching cart:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [cartItemsapp]); // Removed cartItems from dependency array

  
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path='/' element={<CombineMNF categories={categories} subCategories={subCategories} subSubCategories={subSubCategories} products={products}><Home categories={categories} cart={cartItems} setCart={setCartItemsapp} subCategories={subCategories} subSubCategories={subSubCategories} products={products} /></CombineMNF>} />
        <Route path='/cart' element={<CombineMNF categories={categories} subCategories={subCategories} subSubCategories={subSubCategories} products={products}><Cart cart={cartItems} setCart={setCartItemsapp} /></CombineMNF>} />
        <Route path='/viewproducts/:id' element={<CombineMNF categories={categories} subCategories={subCategories} subSubCategories={subSubCategories} products={products}><ViewProducts cart={cartItems} setCart={setCartItemsapp} categories={categories} subCategories={subCategories} subSubCategories={subSubCategories} products={products} /></CombineMNF>} />
        <Route path='/authentication' element={<CombineMNF categories={categories} subCategories={subCategories} subSubCategories={subSubCategories} products={products}><Authentication /></CombineMNF>} />
        <Route path='/admin/*' element={<AdminPanel categories={categories} subCategories={subCategories} subSubCategories={subSubCategories} products={products} />} />
      </Routes>
    </Suspense>
  )
}

export default App
