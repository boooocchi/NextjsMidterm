import React from "react";
import HeroImage from "/Hero.jpg";

const Hero = () => {
  return (
    <>
      <section>
        <div className="w-full max-md:aspect-[8/10] aspect-[3/1.6] overflow-hidden relative flex items-center">
          <img
            className="absolute z-1 top-0 left-0 h-full max-md:object-left object-cover w-full max-md:scale-100"
            src={HeroImage}
            alt="Hero section image"
          />
          <div className="w-[45%] max-md:hidden"></div>
          <h1 className="pt-9 max-md:w-full relative md:inline-flex font-title lg:text-[6.5rem] max-lg:text-[4.7rem]   max-md:text-[6rem] max-sm:text-[5rem] font-light tracking-wider text-black-100 z-10 text-[#ecececb4] max-md:inline-block max-md:text-center md:pr-6 max-md:px-5 max-md:py-5 max-mobile:text-[3.2rem]">
            SNIPPETS <br></br> OF MY HAZY DAYS
          </h1>
        </div>
      </section>
    </>
  );
};

export default Hero;
