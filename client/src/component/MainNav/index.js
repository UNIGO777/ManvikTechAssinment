import React from 'react'

const index = () => {
    const navOptions = ["Catalogs","wholesale programs","call our customer care at +0 000-000-0000","Free shipping on all orders"]
  return (
      <div className='w-screen grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-[1px] min-h-14 bg-white'>
          {
              navOptions.map((option,index) => {
                  return (
                      <div key={index} className='bg-primary     p-2   flex items-center justify-center '>
                          {index === 2 && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="white" viewBox="0 0 24 24" >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          )}
                          <p className={`text-white uppercase text-sm  ${index === navOptions.length - 1 && "font-bold"} `}>{option}</p>
                      </div>    
                  )
              })
          }
          
      </div>
  )
}

export default index
