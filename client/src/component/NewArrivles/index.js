import React from 'react'
import ProductCard from '../productCard'

const NewArrivles = ({ products, cart, setCart }) => {
  
  return (
    <>
            <div className='text-center mb-10'>
                <h1 className='text-[3vw] text-black font-bold '>New Arrivles</h1>
          </div>
          <div className='flex overflow-x-scroll gap-10 flex-wrap lg:flex-nowrap justify-center items-center scrollbar-hidden'> 
              {
                  
                  products?.map((item,index) => {
                      if(index <= 3)
                      return <ProductCard cart={cart} setCart={setCart} key={item.id} name={item?.name} image={item?.image} price={item?.price} id={item?._id} /> // Assuming each item has a unique id
                  })
              }
          </div>
    </>
  )
}

export default NewArrivles
