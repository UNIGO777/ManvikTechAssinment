import React from 'react';



const LogoPanel = ({logos, background , scrolled}) => {
  return (
    <div className={`flex overflow-hidden  bg-[${background}] p-1 md:p-4 px-0 md:px-20 logo-scroll`}>
      {!scrolled ? <> <div className="flex flex-nowrap justify-between w-full">
              {
                  logos?.concat(logos).map((logo, index) =>{
                      if (index <=3 ) return (
          <div key={index} className="text-center hidden md:grid  place-items-center mx-2 ">
            <img src={logo.src} alt={logo.alt} className=" w-[20vw] md:w-[10vw]" />
            <span className="ml-2 text-primary text-sm md:text-xl font-semibold">{logo.name}</span>
          </div>
        )})}
      </div>
      <div className="flex flex-nowrap py-5  animate-scroll md:hidden">
        {logos?.concat(logos).map((logo, index) => (
          <div key={index} className="text-center w-[45vw] flex text-nowrap items-center justify-center md:grid md:place-items-center mx-2 ">
            <img src={logo.src} alt={logo.alt} className=" w-[15vw] md:w-[10vw]" />
            <span className="ml-2 text-primary text-sm md:text-xl font-semibold">{logo.name}</span>
          </div>
        ))}
      </div> </>:<div className="flex flex-nowrap py-5  animate-scroll ">
        {logos?.concat(logos).map((logo, index) => (
          <div key={index} className="text-center  w-[15vw] md:w-[30vw] lg:w-[20vw] flex text-nowrap items-center justify-center md:grid md:place-items-center mx-2 ">
            <img src={logo.src} alt={logo.alt} className=" w-[15vw] md:w-[10vw]" />
            <span className="ml-2 text-primary text-sm md:text-xl font-semibold">{logo.name}</span>
          </div>
        ))}
      </div>}
    </div>
  );
}

export default LogoPanel;

// CSS
// Add this CSS to your App.css or relevant CSS file

