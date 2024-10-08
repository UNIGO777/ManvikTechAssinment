
import axios from 'axios'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const AddNewCategory = lazy(() => import('./pages/addNewCategory'))
const AddNewProduct = lazy(() => import('./pages/addNewProduct'))

const AdminDashboard = lazy(() => import('./pages/dashboard'))
const AdminProducts = lazy(() => import('./pages/product'))
const AdminCategories = lazy(() => import('./pages/categories'))

const AdminPanel = ({categories,subCategories,subSubCategories,products}) => {
    const location = useLocation();

    const path = location.pathname;
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img className="h-12 w-auto" src="https://www.thekbsupply.com/cdn/shop/files/KB-Logo-01-01.png?v=1724826900&width=450" alt="Logo" />
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <Link to="/admin" className={` text-gray-900 inline-flex items-center px-1 pt-1 transition-all ${path === '/admin' && "border-b-2"}  text-sm font-medium transition-all  hover:text-indigo-600 `}>
                  Dashboard
                </Link>
                <Link to="/admin/products" className={` text-gray-500  inline-flex items-center px-1 pt-1   text-sm font-medium transition-all duration-300 ${path === '/admin/products' && "border-b-2"}`}>
                  Products
                </Link>
                <Link to="/admin/categories" className={`border-transparent text-gray-500 inline-flex items-center px-1 pt-1  ${path === '/admin/categories' && "border-b-2"} text-sm font-medium transition-all d`}>
                  Categories
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="relative">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                />
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
              </div>
            </div>
          </div>
        </div>
          </nav>
          
          {/* Main content */}
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            {path === '/admin' && <AdminDashboard categories={categories} products={products} />}
            {path === '/admin/products' && <AdminProducts products={products} />}
            {path === '/admin/categories' && <AdminCategories subSubCategories={subSubCategories} categories={categories} subCategories={subCategories} />}
            {path === '/admin/add-new-category' && <AddNewCategory categories={categories} subCategories={subCategories} />}
            {path === '/admin/add-new-product' && <AddNewProduct />}
          </Suspense>

      </div>

  )
}

export default AdminPanel
