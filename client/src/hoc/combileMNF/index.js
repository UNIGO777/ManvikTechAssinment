import React from 'react';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';
import MainNav from '../../component/MainNav'

const CombineMNF = ({ children, categories, subCategories, subSubCategories, products }) => {
    console.log(categories,subCategories,subSubCategories,products)
  return (
    <>
       <div className='h-[260px]'>
      <div className='fixed z-50'>
      <MainNav />
        <Navbar categories={categories} subCategories={subCategories} subSubCategories={subSubCategories} products={products} />
        </div>
      </div>
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default CombineMNF;
