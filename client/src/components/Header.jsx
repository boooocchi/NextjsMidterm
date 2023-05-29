import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="max-md:h-[2.5rem] h-[4rem] w-full bg-[#eeeeee8b]  font-title px-10 flex items-center fixed z-[99] max-mobile:px-5">
      <nav className="flex justify-between items-center w-full text-[0.8rem] max-w-[1280px] mx-auto">
        <Link
          to="/"
          className="tracking-widest border-b-[2px] border-[#ffe436] cursor-pointer max-md:text-[0.8rem]"
        >
          HOME
        </Link>
        <div className="flex gap-5 text-[0.7rem] tracking-widest relative top-[2px] max-mobile:gap-3">
          <span className="border-b-2 border-transparent hover:y-[-1rem] hover:border-b-2 hover:border-[#ffe436] cursor-pointer">
            ABOUT
          </span>
          <span>/</span>
          <span className="border-b-2 border-transparent hover:y-[-1rem] hover:border-b-2 hover:border-[#ffe436] cursor-pointer">
            BLOGS
          </span>
          <span>/</span>
          <Link
            to="/create"
            className="border-b-2 border-transparent hover:y-[-1rem] hover:border-b-2 hover:border-[#ffe436] cursor-pointer"
          >
            CREATE
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
