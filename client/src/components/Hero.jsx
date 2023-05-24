import React from "react";
import HeroImage from "/Hero.jpg";
import ink from "/ink1.png";

const Hero = () => {
  return (
    <>
      <section>
        <div className="w-full aspect-[3/1.5] overflow-hidden relative flex items-center">
          <img className="absolute z-1 top-0 left-0" src={HeroImage} alt="" />
          <div className="w-[35%]"></div>
          <h1 className="ml-[10%] relative font-title lg:text-[2.3rem] md:text-[1.8rem] sm:text-[1.5rem] font-light w-[65%] tracking-wider text-black-100 z-10  py-2 px-6 text-[#ecececb4]  ">
            {/* <img
              src={ink}
              alt=""
              className="absolute w-[19rem] left-[20px] z-1 opacity-90 -bottom-0"
            /> */}
            SNIPPETS OF MY HAZY DAYS
          </h1>
        </div>
      </section>
    </>
  );
};

export default Hero;
