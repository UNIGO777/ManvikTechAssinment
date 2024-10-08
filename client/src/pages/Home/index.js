import React from 'react'

import HeroImgaePanel from '../../component/Hero image panel'
import GroupImagePanel from '../../component/group image panel'
import LogoPanel from '../../component/logoPanel'
import TopPicksForYou from '../../component/TopPicksForYou'
import NewArrivles from '../../component/NewArrivles'
import FeaturedCollection from '../../component/Featured collection'

const HomePage = ({ categories, subCategories, subSubCategories, products,cart,setCart }) => {
  const logos1 = [
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/1_a368a826-e40d-4f88-9038-a11d8afa6e9e.png?v=1727770241&width=2048', alt: 'Logo 1', name: 'Flexible Payment' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/2_3dc17ea2-b4bb-4983-929d-7d4b209378bb.png?v=1727770241&width=2048', alt: 'Logo 2', name: 'Free Delivery' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/3_1703945e-5041-42c3-a34c-027b853c501a.png?v=1727770241&width=2048', alt: 'Logo 3', name: 'Certified Products' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/4_398bb804-982d-4637-9b81-400511976282.png?v=1727770241&width=2048', alt: 'Logo 4', name: 'Easy Return' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/1_a368a826-e40d-4f88-9038-a11d8afa6e9e.png?v=1727770241&width=2048', alt: 'Logo 1', name: 'Flexible Payment' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/2_3dc17ea2-b4bb-4983-929d-7d4b209378bb.png?v=1727770241&width=2048', alt: 'Logo 2', name: 'Free Delivery' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/3_1703945e-5041-42c3-a34c-027b853c501a.png?v=1727770241&width=2048', alt: 'Logo 3', name: 'Certified Products' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/4_398bb804-982d-4637-9b81-400511976282.png?v=1727770241&width=2048', alt: 'Logo 4', name: 'Easy Return' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/1_a368a826-e40d-4f88-9038-a11d8afa6e9e.png?v=1727770241&width=2048', alt: 'Logo 1', name: 'Flexible Payment' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/2_3dc17ea2-b4bb-4983-929d-7d4b209378bb.png?v=1727770241&width=2048', alt: 'Logo 2', name: 'Free Delivery' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/3_1703945e-5041-42c3-a34c-027b853c501a.png?v=1727770241&width=2048', alt: 'Logo 3', name: 'Certified Products' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/4_398bb804-982d-4637-9b81-400511976282.png?v=1727770241&width=2048', alt: 'Logo 4', name: 'Easy Return' },
    // Add more logos as needed
  ];
  const logos2 = [
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/12.png?v=1727705648&width=2048', alt: 'Logo 1', name: '' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/8_5410684b-7a68-4879-94fe-4b8d6f449a95.png?v=1727705649&width=2048', alt: 'Logo 2', name: '' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/14.png?v=1727705648&width=2048', alt: 'Logo 3', name: '' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/13.png?v=1727705648&width=2048', alt: 'Logo 4', name: '' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/12.png?v=1727705648&width=2048', alt: 'Logo 1', name: '' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/8_5410684b-7a68-4879-94fe-4b8d6f449a95.png?v=1727705649&width=2048', alt: 'Logo 2', name: '' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/14.png?v=1727705648&width=2048', alt: 'Logo 3', name: '' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/13.png?v=1727705648&width=2048', alt: 'Logo 4', name: '' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/12.png?v=1727705648&width=2048', alt: 'Logo 1', name: '' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/8_5410684b-7a68-4879-94fe-4b8d6f449a95.png?v=1727705649&width=2048', alt: 'Logo 2', name: '' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/14.png?v=1727705648&width=2048', alt: 'Logo 3', name: '' },
    { src: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/13.png?v=1727705648&width=2048', alt: 'Logo 4', name: '' },
    
    // Add more logos as needed
  ];
  return (
    <>
     
      <div >
        <HeroImgaePanel/>
      </div>
      <div >
        <GroupImagePanel/>
      </div>
      <div >
        <LogoPanel logos={logos1} background={ "#F5F5F5" } />
      </div>
      <div className='p-10' >
        <TopPicksForYou/>
      </div>

      <div className='p-10' >
        <FeaturedCollection  />
      </div>
      <div className='p-10' >
        <NewArrivles products={products} cart={cart} setCart={setCart} />
      </div>
      <div className='text-center mb-10 p-5'>
        <h1 className='text-2xl lg:text-[3vw] mb-3 lg:mb-5 text-black font-bold '>Introducing The KB Supply</h1>
        <p className='text-lg'>USA's Best Online Store for Home Decor, Furniture & Lighting</p>
            </div>
      <div className='text-center mb-10 flex items-center justify-center px-20  h-[90vw] md:h-[] lg:h-[90vh]'>
        <iframe 
          className='h-full w-full'
          src="https://www.youtube.com/embed/Ze-YNUPb0F0" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
      </div>

      
      <div className='text-center mb-10'>
                <h1 className='text-[3vw] text-black font-bold '>Our Clients</h1>
            </div>
      <div className=' w-[90vw] m-auto' >
        <LogoPanel logos={logos2} background={ "#fffff" } scrolled={true} />
      </div>
      <div className='text-center mb-10'>
                <button className=' text-xl border-2 border-primary p-3 rounded px-10 uppercase ' onClick={()=>alert("Site is in underconstruction")}>View all</button>
      </div>

      


      
     
    </>
  )
}

export default HomePage
