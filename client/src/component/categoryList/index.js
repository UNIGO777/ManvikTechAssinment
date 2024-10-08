import React from 'react'
import { Link } from 'react-router-dom'

const CategoryList = ({filteredSubCategories, subSubCategories}) => {
    
  return (
    <div className=' flex gap-5 bg-white  text-nowrap p-4 py-6 '>
    {filteredSubCategories.map((subCategory) => (
    <table className='space-y-1 w-44 ' key={subCategory._id}>
        <thead>
        <tr className='  ' >
                    <th  className=' font-semibold  py-2 border-b-2 border-[#ededed]  '>{subCategory.name}</th>
                
        </tr>
            </thead>
            
           <div className='h-2'/>
            <tbody className=''>
            
                {
                        subSubCategories.filter(subSubCategory => subSubCategory?.subcategory?._id === subCategory._id).map((item) => {
                        
                        return <tr className=' cursor-pointer text-[gray] hover:text-black '  key={item._id} ><td className=' font-normal  '><Link to={`/viewproducts/categoryid=${item._id}`} >{item.name}</Link></td></tr>
                    })
                }
                
                
       
        </tbody>
    </table>))}
    </div>
  )
}

export default CategoryList
