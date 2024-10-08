import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Categorybutton from '../category button';
import Cookies from 'js-cookie';

const Navbar = ({ categories, subCategories, subSubCategories, products }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [profileDrag, setProfileDrag] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredResults(value ? [...products, ...subSubCategories].filter(item => 
            item.name.toLowerCase().includes(value.toLowerCase())
        ) : []);
        setIsDropdownOpen(!!value);
    };

    const handleDropdownItemClick = () => {
        setIsDropdownOpen(false);
        setSearchTerm('');
    };

    const getUserFromCookie = () => {
        const token = Cookies.get('token');
        return token;
    };

    const userToken = getUserFromCookie();

    const getUserFromLocalStorage = () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    };

    const user = getUserFromLocalStorage();

    const handleLogout = () => {
        setProfileDrag(false)
        Cookies.remove('token'); // Clear the cookie
        localStorage.removeItem('user'); // Clear local storage

        navigate("/authentication"); // Redirect to authentication page
    };

    return (
        <div className='border-b border-gray-300'>
            <div className='flex justify-between bg-white'>
                <div className='flex items-center p-3 md:p-10 w-[55vw] md:w-[45vw] lg:w-[35vw]'>
                    <Link to="/">
                        <img src="https://www.thekbsupply.com/cdn/shop/files/KB-Logo-01-01.png?v=1724826900&width=450" className='w-full' alt="logo" />
                    </Link>
                </div>
                <div className='hidden md:flex items-center w-full'>
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute z-50 bg-white p-3 w-full mt-1 rounded-lg shadow-lg">
                                {filteredResults.map((item, index) => (
                                    <div key={index} className="flex items-center p-2 hover:bg-gray-200 cursor-pointer" onClick={handleDropdownItemClick}>
                                        {item.image && <img src={item.image} alt={item.name} className="h-10 w-10 mr-2" />}
                                        <Link to={item.image ? `/product/${item.id || item._id}` : `/viewproducts/categoryid=${item.id || item._id}`}>
                                            {item.name} {item.type && `(${item.type})`}
                                            {subSubCategories.some(subSub => subSub._id === item._id) && <span className="text-sm text-gray-500"> (Sub-Category)</span>}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex items-center justify-center p-10'>
                    <div className="flex space-x-4">
                        <Link to="#" className="text-gray-600 hover:text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 hover:stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </Link>
                        <div onClick={() => user ? setProfileDrag(!profileDrag) : navigate("/authentication")} className="relative text-gray-600 hover:text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 hover:stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {
                                profileDrag && (
                                    <div className='bg-white absolute shadow-2xl z-50 -translate-x-[80%] p-4 rounded-lg' >
                                        <div className="flex items-center   ">
                                            <img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKwAAACUCAMAAAA5xjIqAAAAMFBMVEXk5ueutLeor7Ld3+Dn6erDx8m5vsHY29zf4uOxt7rR1NbAxMfO0dPJzc/q7O29wcTakNilAAADzklEQVR4nO2c27arKgxAuYSrov//t1trT1frUQuEBhyD+dTHOVghBBIXY51Op9PpdDqdTqfT6XT2wMGvJgFmpfFBrQRvpG1XeJLjoJ34w2nl7dSgL4DR/IhZtmYLdnTi0JVz4Xxb0eD1mepDd/bN2AI7DoCPYIBGdP3Vqr5oY3FVlCsXob4tfA+B/2yH2rbWxbqu+6yuq4xe1/q28TFQPxJSXRdUNdcQlwc+1rZWBjPJqiu2jmxCInhD11jaKfIw2FPjcACT58q5k+SybMh0XZaWWhXydtdmS77HhtwoWGTVROtq810XW9otBpmp4ClLmxAAobqgKV1Zdt7acIZwaafsvLUhRso4SC+3PhkIXU1eWfCHo0u14JGuXNAduTmF7E7Wk8nm1wUvWUW3w7D7a8m0ZCduyv37BEcmK/GynE4W70pXy3TZLns72Ttlg1vlWTajZelOMKawroS1wa2qrlvVs7e6KdzrDoa+3VK+cuS/d26QvhswwMnSvsjkPntvUD9+S5QsqSrDvc8OxO+zqJdv+qZCdjEj6LuMmG4NfW/pTn0wltthdHWat7fq3WaVtaRv3h+2N5o3YMmloqAsDf9H2qVc0BYweyBp+khX2lwvW4i2FUMDI36RJQ3ly/wFY9wsYm3NDbDfk4JuaIT2fNT3EQG6jRHPJ2BHfjGZbFtyZWta8MfBoElvsrEArNP0/HOafmxymv4BMGv8GNQ8zyqMxsiGttUBsLL71R4PM2ulNH9Iazfp2nJvrDby8dfX2r2dvs45PQ8qeMkaEQawRukvBYJz8yjrCq+f/YzDsv2vTZ/ZVggdTKUvg2CSXunTk+BE2A3rCpOrmtmlmb5CQo+M8Plo2U4q7m9/tsDaEB3AwPyct6bvvm4keJeBKeBnTh644cfRcFVcpSPmHx7HSwBclq0ZuuFXwXD23R/K1oVfLC4U6C4f6nJTXrVksO50h7J57FfL+rR1Ja9o4AuMblzqFvwaAN2x/26ry4QCYLpI8bZFOqQxLxhlwAcuyMLnwDnoQXBMby7dFrfNoMQEVwKYrhMUGI1LAhEJSc/ahWzzd9kvj60TsjMYagAi2zar7wBxD9qlETkfZAKrobrahvTbTkb3sBTJYQuhmitP/vyd+DT4IDV/4ec4UaTJor6nRJPW35soStgLUpIt2KqqPKmiAfSYNJaE/jnZ5eCc+McEyor7mIQtVqWC2dlGr2xt0wURGweocdNSRMZBpdpwR+T3LFOFC8IBcclrqljDvBFZKNbW3Ii76FLfv0+I2mFgRBNE/k8n2QSVp+s6zfIPkiE0PFp+KkUAAAAASUVORK5CYII=" alt="Profile" className="rounded-full mr-3 w-12 h-12 object-cover" />
                                            <div className='w-[300px]'>
                                                <h2 className='font-semibold text-lg'>User Profile</h2>
                                                <p className='text-gray-700'>Name: {user.name}</p>
                                                <p className='text-gray-700'>Email: { user.email}</p>
                                                <p className='text-gray-700'>Phone: {user.phone}</p>
                                            </div>
                                            
                                        </div>
                                        <button onClick={handleLogout} className='p-2 w-full bg-primary mt-2 font-semibold text-white rounded-md transition-all hover:scale-[0.9] '>
                                            Logout
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                        <Link to="/cart" className="text-gray-600 hover:text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 hover:stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex px-2 pb-2 items-center w-screen bg-white md:hidden'>
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute z-50 bg-white p-3 w-full mt-1 rounded-lg shadow-lg">
                            {filteredResults.map((item, index) => (
                                <div key={index} className="flex items-center p-2 hover:bg-gray-200 cursor-pointer" onClick={handleDropdownItemClick}>
                                    {item.image && <img src={item.image} alt={item.name} className="h-10 w-10 mr-2" />}
                                    <Link to={item.image ? `/product/${item.id || item._id}` : `/viewproducts/categoryid=${item.id || item._id}`}>
                                        {item.name} {item.type && `(${item.type})`}
                                        {subSubCategories.some(subSub => subSub._id === item._id) && <span className="text-sm text-gray-500"> (Sub-Category)</span>}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className='hidden md:flex flex-wrap justify-between py-3 px-[8%] bg-white'>
                <ul className='flex gap-5 items-center uppercase'>
                    <li className='font-semibold px-2'><Link to="/">Home</Link></li>
                    <li className='font-semibold px-2'><Link>New Arrival</Link></li>
                    {categories.map((item, index) => (
                        <Categorybutton key={index} subCategories={subCategories} item={item} subSubCategories={subSubCategories} />
                    ))}
                </ul>
                <button className='uppercase text-primary z-0 rounded-xl font-bold bg-accent p-2'>Seasonal sale</button>
            </div>
        </div>
    );
};

export default Navbar;
