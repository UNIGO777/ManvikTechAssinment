import React, { useState } from 'react';
import ProductCard from '../productCard';

const ViewProductsHeader = ({ category, products,cart,setCart }) => {
    const [filters, setFilters] = useState({
        productType: '',
        availability: '',
        priceFrom: '',
        priceTo: '',
        brand: '',
        cct: '',
        wattage: '',
        approvals: '',
        sortBy: 'Best selling',
    });
   
    
    const filterCatogoryProducts = products.filter((item)=> item?.subSubcategory._id === category[0]._id)
   
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const filteredProducts = products.filter(product => {
        const priceCondition = (filters.priceFrom ? product.price >= filters.priceFrom : true) &&
            (filters.priceTo ? product.price <= filters.priceTo : true);
        const typeCondition = filters.productType ? product.type === filters.productType : true;
        const availabilityCondition = filters.availability ? product.availability === filters.availability : true;
        const brandCondition = filters.brand ? product.brand === filters.brand : true;
        const cctCondition = filters.cct ? product.cct === filters.cct : true;
        const wattageCondition = filters.wattage ? product.wattage === filters.wattage : true;
        const approvalsCondition = filters.approvals ? product.approvals === filters.approvals : true;

        return priceCondition && typeCondition && availabilityCondition && brandCondition && cctCondition && wattageCondition && approvalsCondition;
    });



    return (
        <header>
            <div className='p-8 px-12 '>
                <h1 className='uppercase text-md mb-7'>HOME <span className='font-bold'> &gt; {category[0]?.name} </span></h1>
                <h1 className='font-semibold uppercase text-4xl mb-7'>{category[0]?.name}</h1>
                <div className="flex items-center flex-wrap space-x-4 justify-between border-b-2 pb-3 border-[#ededed]">
                    <div className='flex items-center flex-wrap space-x-4'><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16l-8 8v4l-4-4H4z" />
                            </svg><span className="font-bold">Filter:</span>
                        <select name="productType" className="rounded px-2 py-1" onChange={handleFilterChange}>
                            <option value="">Product type</option>
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                        </select>
                        <select name="availability" className="rounded px-2 py-1" onChange={handleFilterChange}>
                            <option value="">Availability</option>
                            <option value="In Stock">In Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>

                        <select name="brand" className="rounded px-2 py-1" onChange={handleFilterChange}>
                            <option value="">Brand</option>
                            <option value="Brand 1">Brand 1</option>
                            <option value="Brand 2">Brand 2</option>
                        </select>
                      
                        
                        <select name="approvals" className="rounded px-2 py-1" onChange={handleFilterChange}>
                            <option value="">Approvals / Ratings</option>
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                        </select>
                    </div>
                    <div className='flex items-center space-x-4'><span className="font-bold ">Sort by:</span>
                        <select name="sortBy" className="rounded px-2 py-1" onChange={handleFilterChange}>
                            <option value="Best selling">Best selling</option>
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                        </select>
                        <span className="text-gray-600">{filterCatogoryProducts.length} products</span></div>
                </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-4 p-4">
                {filterCatogoryProducts.map(product => (
                    <ProductCard name={product.name} cart={cart} setCart={setCart} image={product.image} price={product.price} id={product._id}/>
                ))}
            </div>

            </div>
        </header>
    );
}

export default ViewProductsHeader;
