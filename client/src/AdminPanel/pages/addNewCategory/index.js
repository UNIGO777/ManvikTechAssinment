import axios from 'axios'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useEffect } from 'react'


const AddNewCategory = ({ categories, subCategories }) => {
  const [formType, setFormType] = useState('category')
  const { control, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    
    if (formType === 'category') {
      try {
        const { categoryName, categoryDiscription } = data
         (categoryDiscription, categoryName)
        const res = await axios.post('http://localhost:5000/api/categories/categories', { categoryName, categoryDiscription })
        alert('Category added successfully')
        window.location.href = '/admin/categories'
      }
      catch (error) {
        alert(`Error adding category: ${error?.status === 400 && 'Catogery already exist'}`)
        window.location.reload()
      }
    } else if (formType === 'subcategory') {
      try {
        const { parentCategory, subcategoryName, subcategoryDescription } = data
        const res = await axios.post('http://localhost:5000/api/categories/subcategories', { name: subcategoryName, description: subcategoryDescription, categoryId: parentCategory })
        alert('Subcategory added successfully')
        window.location.href = '/admin'
      }
      catch (error) {
        alert(`Error adding subcategory: ${error.message}`)
        window.location.reload()
      }
    } else if (formType === 'subsubcategory') {
      try {
        const { parentCategory, subcategory, subsubcategoryName, subsubcategoryDescription } = data
        const res = await axios.post('http://localhost:5000/api/categories/sub-subcategories', { name: subsubcategoryName, description: subsubcategoryDescription, categoryId: parentCategory, subcategoryId: subcategory })
        alert('Sub-subcategory added successfully')
        window.location.href = '/admin/categories'
      }
      catch (error) {
        alert(`Error adding sub-subcategory: ${error.message}`)
        window.location.reload()
      }
    }
    reset()
  }
    
  

  const renderForm = () => {
    switch (formType) {
      case 'category':
        return (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="categoryName" className="block  text-sm font-medium text-gray-700">Category Name</label>
              <Controller
                name="categoryName"
                control={control}
                rules={{ required: 'Category name is required' }}
                render={({ field }) => (
                  <input {...field} placeholder='Name' type="text" className="mt-1 mb-3 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                )}
              />
                    {errors.categoryName && <p className="mt-2 text-[#6b0f0f] text-sm text-red-600">{errors.categoryName.message}</p>}
                    <label htmlFor="categoryDiscription" className="block text-sm font-medium text-gray-700">Category Discription</label>
              <Controller
                name="categoryDiscription"
                control={control}
                rules={{ required: 'Categor discription is required' } }
                render={({ field }) => (
                  <input {...field} placeholder='Discription' type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                )}
              />
              {errors.categoryDiscription && <p className="mt-2 text-sm text-red-600 text-[#6b0f0f]">{errors.categoryDiscription.message}</p>}
            </div>
            <button type="submit" className="w-full bg-primary flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add Category
            </button>
          </form>
        )
      case 'subcategory':
        return (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="parentCategory" className="block text-sm font-medium text-gray-700">Parent Category</label>
              <Controller
                name="parentCategory"
                control={control}
                rules={{ required: 'Parent category is required' }}
                render={({ field }) => (
                  <select {...field} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option value="">Select a parent category</option>
                    {categories.map(({ _id, name }) => (
                      <option className='uppercase' key={_id} value={_id}>{name}</option>
                    ))}
                  </select>
                )}
              />
              {errors.parentCategory && <p className="mt-2 text-[#6b0f0f] text-sm text-red-600">{errors.parentCategory.message}</p>}
            </div>
            <div>
              <label htmlFor="subcategoryName" className="block text-sm font-medium text-gray-700">Subcategory Name</label>
              <Controller
                name="subcategoryName"
                control={control}
                rules={{ required: 'Subcategory name is required' }}
                render={({ field }) => (
                  <input {...field} type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                )}
              />
              {errors.subcategoryName && <p className="mt-2 text-sm text-red-600">{errors.subcategoryName.message}</p>}
            </div>
            <div>
              <label htmlFor="subcategoryDescription" className="block text-sm font-medium text-gray-700">Subcategory Description</label>
              <Controller
                name="subcategoryDescription"
                control={control}
                rules={{ required: 'Subcategory description is required' }}
                render={({ field }) => (
                  <textarea {...field} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" rows="3"></textarea>
                )}
              />
              {errors.subcategoryDescription && <p className="mt-2 text-sm text-red-600">{errors.subcategoryDescription.message}</p>}
            </div>
            <button type="submit" className="w-full flex bg-primary justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add Subcategory
            </button>
          </form>
        )
      case 'subsubcategory':
        return (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="parentCategory" className="block text-sm font-medium text-gray-700">Parent Category</label>
              <Controller
                name="parentCategory"
                control={control}
                rules={{ required: 'Parent category is required' }}
                render={({ field }) => (
                  <select {...field} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option value="">Select a parent category</option>
                    {categories.map(({ _id, name }) => (
                      <option className='uppercase' key={_id} value={_id}>{name}</option>
                    ))}
                  </select>
                )}
              />
              {errors.parentCategory && <p className="mt-2 text-[#6b0f0f] text-sm text-red-600">{errors.parentCategory.message}</p>}
            </div>
            <div>
              <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">Subcategory</label>
              <Controller
                name="subcategory"
                control={control}
                rules={{ required: 'Subcategory is required' }}
                render={({ field }) => (
                  <select {...field} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option value="">Select a subcategory</option>
                    {subCategories.map(({ _id, name }) => (
                      <option className='uppercase' key={_id} value={_id}>{name}</option>
                    ))}
                  </select>
                )}
              />
              {errors.subcategory && <p className="mt-2 text-sm text-red-600">{errors.subcategory.message}</p>}
            </div>
            <div>
              <label htmlFor="subsubcategoryName" className="block text-sm font-medium text-gray-700">Sub-subcategory Name</label>
              <Controller
                name="subsubcategoryName"
                control={control}
                rules={{ required: 'Sub-subcategory name is required' }}
                render={({ field }) => (
                  <input {...field} type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                )}
              />
              {errors.subsubcategoryName && <p className="mt-2 text-sm text-red-600">{errors.subsubcategoryName.message}</p>}
            </div>
            <div>
              <label htmlFor="subsubcategoryDescription" className="block text-sm font-medium text-gray-700">Sub-subcategory Description</label>
              <Controller
                name="subsubcategoryDescription"
                control={control}
                rules={{ required: 'Sub-subcategory description is required' }}
                render={({ field }) => (
                  <textarea {...field} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" rows="3"></textarea>
                )}
              />
              {errors.subsubcategoryDescription && <p className="mt-2 text-sm text-red-600">{errors.subsubcategoryDescription.message}</p>}
            </div>
            <button type="submit" className="w-full bg-primary  flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add Sub-subcategory
            </button>
          </form>
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Add New Category</h1>
      <div className="mb-6">
        <button
          onClick={() => setFormType('category')}
          className={`mr-4 px-4 py-2 rounded-md ${formType === 'category' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Category
        </button>
        <button
          onClick={() => setFormType('subcategory')}
          className={`mr-4   px-4 py-2 rounded-md ${formType === 'subcategory' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Subcategory
        </button>
        <button
          onClick={() => setFormType('subsubcategory')}
          className={`px-4 py-2 rounded-md ${formType === 'subsubcategory' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Sub-subcategory
        </button>
      </div>
      {renderForm()}
    </div>
  )
}

export default AddNewCategory
