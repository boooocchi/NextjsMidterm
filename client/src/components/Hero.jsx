import React from "react";
import HeroImage from "/Hero.jpg";

const Hero = () => {
  return (
    <>
      <section>
        <div className="w-full aspect-[3/1.5] overflow-hidden relative flex items-center">
          <img className="absolute z-1 top-0 left-0" src={HeroImage} alt="" />
          <div className="w-[35%]"></div>
          <h1 className="ml-[10%] relative font-title lg:text-[2.5rem] md:text-[1.9rem] sm:text-[1.7rem] font-light w-[65%] tracking-wider text-black-100 border-b-2 border-[#ffe436] pb-2 px-3 text-[#0606069f] bg-[#c9cabf3a]">
            SNIPPETS OF MY HAZY DAYS
          </h1>
        </div>
      </section>
    </>
  );
};

export default Hero;
