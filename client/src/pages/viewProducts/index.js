import React from 'react'
import { useParams } from 'react-router-dom'
import MainNav from '../../component/MainNav'
import Navbar from '../../component/Navbar'
import ViewProductsHeader from '../../component/ViewProductHeader'


const ViewProducts = ({ categories, subCategories, subSubCategories, products,cart,setCart }) => {
    const { id } = useParams(); // Get the dynamic category ID from the URL
    const categoryId = id.slice(11)

  
    
    const filteredSubSubCategories = subSubCategories.filter(subSubCategory => subSubCategory._id === categoryId);

    return (
        <>
            
            <div>
                <ViewProductsHeader category={filteredSubSubCategories} products={products} cart={cart} setCart={setCart}  />
                
            </div>
            
        </>
    )
}

export default ViewProducts
