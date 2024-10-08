import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { storage } from '../../../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const AddNewProduct = () => {
  const { control, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [subSubcategories, setSubSubcategories] = useState([])

  useEffect(() => {
    fetchSubSubcategories()
  }, [])

  const fetchSubSubcategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories/sub-subcategories')
      setSubSubcategories(response.data)
    } catch (error) {
      console.error('Error fetching sub-subcategories:', error)
    }
  }

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
      setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      let imageUrl = ''
      if (image) {
        const imageRef = ref(storage, `products/${image.name}`)
        await uploadBytes(imageRef, image)
        imageUrl = await getDownloadURL(imageRef)
      }

      const productData = {
        ...data,
        image: imageUrl
      }

      const response = await axios.post('http://localhost:5000/api/products', productData)
       ('Product added:', response.data)
      alert('Product added successfully')
      window.location.href = '/admin'
    } catch (error) {
      console.error('Error adding product:', error)
      alert('Error adding product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Add New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Product name is required' }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          />
          {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <Controller
            name="price"
            control={control}
            rules={{ required: 'Price is required', min: { value: 0, message: 'Price must be positive' } }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                step="0.01"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          />
          {errors.price && <p className="mt-2 text-sm text-red-600">{errors.price.message}</p>}
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <Controller
            name="stock"
            control={control}
            rules={{ required: 'Stock is required', min: { value: 0, message: 'Stock must be non-negative' } }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          />
          {errors.stock && <p className="mt-2 text-sm text-red-600">{errors.stock.message}</p>}
        </div>

        <div>
          <label htmlFor="subSubcategory" className="block text-sm font-medium text-gray-700">
            Sub-Subcategory
          </label>
          <Controller
            name="subSubcategory"
            control={control}
            rules={{ required: 'Sub-Subcategory is required' }}
            render={({ field }) => (
              <div className="relative">
                <select
                  {...field}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md appearance-none"
                >
                  <option value="">Select a sub-subcategory</option>
                  {subSubcategories.map((subSubcategory) => (
                    <option key={subSubcategory._id} value={subSubcategory._id}>
                      {subSubcategory.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            )}
          />
          {errors.subSubcategory && <p className="mt-2 text-sm text-red-600">{errors.subSubcategory.message}</p>}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, value, ...rest } }) => (
              <input
                {...rest}
                type="file"
                onChange={(e) => {
                  onChange(e.target.files[0]);
                  handleImageChange(e);
                }}
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100
                "
              />
            )}
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-4 h-32 w-auto object-cover rounded-md" />
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center bg-primary py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddNewProduct
