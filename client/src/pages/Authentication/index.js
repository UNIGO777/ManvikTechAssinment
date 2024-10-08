import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Ensure Link and useNavigate are imported
import axios from 'axios'; // Import axios for making HTTP requests
import Cookies from 'js-cookie'; // Import js-cookie for handling cookies

const Authentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // New state for name
  const [phone, setPhone] = useState(''); // New state for phone
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(true); // New state for user login
  const navigate = useNavigate(); // Initialize useNavigate

  const handleUserLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });
      // Save the token in a cookie
      Cookies.set('token', response.data.token, { expires: 1 }); // Set cookie to expire in 7 days
      // Save user information in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user info in localStorage
      console.log(response.data);
      navigate('/'); // Navigate to home on success
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials.'); // Alert on error
    }
  };

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    // Handle admin login logic here
    console.log('Admin Email:', email);
    console.log('Admin Password:', password);
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/signup', {
        email,
        password,
        name,
        phone,
      });
      // Save the token in a cookie
      Cookies.set('token', response.data.token, { expires: 1 }); // Set cookie to expire in 7 days
      // Save user information in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user info in localStorage
      console.log(response.data);
      navigate('/'); // Navigate to home on success
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Sign up failed. Please check your details.'); // Alert on error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-3 text-black">{isSignUp ? 'User Sign Up' : isAdmin ? 'Admin Login' : 'User Login'}</h1>
      
      {/* User Login Form */}
      {isUserLogin && !isSignUp && (
        <form onSubmit={handleUserLoginSubmit} className="bg-white p-6 rounded w-[80vw] md:w-1/2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="w-full bg-primary text-white p-2 rounded">
            Sign In
          </button>
          <p className="mt-4 text-sm text-center">
            <Link to="#" className="text-black underline hover:underline" onClick={() => setIsSignUp(true)}>
              Create account
            </Link>
          </p>
          <p className="mt-4 text-sm text-center">
            <Link to="#" className="text-[#1d4ed8] hover:underline">Forgot your password?</Link>
          </p>
        </form>
      )}

      {/* Sign Up Form */}
      {isSignUp && (
        <form onSubmit={handleSignUpSubmit} className="bg-white p-6 rounded w-[80vw] md:w-1/2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-black">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="w-full bg-primary text-white p-2 rounded">
            Sign Up
          </button>
          <p className="mt-4 text-sm text-center">
            <Link to="#" className="text-[#1d4ed8] hover:underline" onClick={() => setIsSignUp(false)}>
              Already have an account? Login
            </Link>
          </p>
        </form>
      )}

      {/* Admin Login Form */}
      {isAdmin && !isSignUp && (
        <form onSubmit={handleAdminLoginSubmit} className="bg-white p-6 rounded w-1/2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="w-full bg-[#1d4ed8] text-white p-2 rounded">
            Admin Login
          </button>
          <p className="mt-4 text-sm text-center">
            <Link to="#" className="text-[#1d4ed8] hover:underline" onClick={() => setIsAdmin(false)}>
              Back to User Login
            </Link>
          </p>
        </form>
      )}

      {/* Link to switch between forms */}
      <p className="mt-1 text-sm text-center">
        <Link to="#" className="text-[#1d4ed8] hover:underline" onClick={() => { setIsUserLogin(!isUserLogin); setIsSignUp(false); setIsAdmin(false); }}>
          {isUserLogin ? 'Switch to Admin Login' : 'Switch to User Login'}
        </Link>
      </p>
    </div>
  );
}

export default Authentication;
