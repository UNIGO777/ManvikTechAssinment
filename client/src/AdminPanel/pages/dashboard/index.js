import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'


const AdminDashboard = ({categories , products}) => {
    
    return (
        <div className="max-w-7xl mx-auto px-3 py-12 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-10">
                <div className="bg-background overflow-hidden shadow-2xl rounded-2xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-1">
                    <div className="px-8 py-10">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-8">Manage Categories</h2>
                        <p className='mb-3'>
                            Categories are the categories of products in the store. They are used to group products together.
                        </p>
                        <p className="mb-3">
                            Manage your store's category structure efficiently. You can create main categories, subcategories, and even sub-subcategories to organize your products effectively.
                        </p>
                       
                        <p className='mb-4 uppercase font-semibold'>total categories : <span className='font bold'>{categories.length }</span></p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link to="/admin/add-new-category" className="w-full sm:w-auto inline-flex bg-primary items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300">
                                Add Category
                            </Link>
                            
                            <Link to="/admin/categories" className="w-full sm:w-auto inline-flex bg-secondary items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300">
                                View All Categories
                            </Link>
                        </div>
                        {/* Add a list or table of categories here */}
                    </div>
                </div>
                <div className="bg-background overflow-hidden shadow-2xl rounded-2xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-1">
                    <div className="px-8 py-10">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-8">Manage Products</h2>
                        <p className='mb-3'>
                            Products are the items available for purchase in your store. Manage your product inventory, add new products, or update existing ones.
                        </p>
                        <p className='mb-10'>
                            You can add new products, update existing ones, or delete them.
                        </p>
                        <p className='mb-4 uppercase font-semibold'>total categories : <span className='font bold'>{products.length}</span></p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link to="/admin/add-new-product" className="w-full sm:w-auto inline-flex bg-primary items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300">
                                Add Product
                            </Link>
                            <Link to="/admin/products" className="w-full sm:w-auto inline-flex bg-secondary items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300">
                                View All Products
                            </Link>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default AdminDashboard
