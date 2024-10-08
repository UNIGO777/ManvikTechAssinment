import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AdminProduct = ({ products: initialProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const results = products.filter(product =>
      product?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts(products.filter(product => product?._id !== id));
        alert('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center">Product Management</h1>
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600">
          <h2 className="text-3xl font-semibold ">Product List</h2>
        </div>
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <input
                type="text"
                onChange={handleSearch}
                placeholder="Search products..."
                className="pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 w-64"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <Link to="/admin/add-new-product" className="bg-primary text-white px-6 py-3 rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              Add New Product
            </Link>
          </div>
          <div className="overflow-x-auto min-h-20">
            <table className="min-w-full  divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 flex justify-center whitespace-nowrap">
                      <img src={product?.image || "https://via.placeholder.com/50"} alt={product?.name} className="w-12 h-12 rounded-full object-cover" />
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">{product?.name.substring(0, 20)}...</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <span className="px-2 inline-flex uppercase text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {product?.subSubcategory?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-center text-gray-900">${product?.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium">
                      <button 
                        onClick={() => handleDelete(product?._id)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProduct
