import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  const imagePath = JSON.parse(props.image).filename;

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  const handleImageHover = (event) => {
    event.currentTarget.querySelector("img").style.transform = "scale(1.1)";
  };

  const handleImageLeave = (event) => {
    event.currentTarget.querySelector("img").style.transform = "scale(1)";
  };
  return (
    <Link
      to={`/article/${props.blog_id}`}
      state={props} // Pass the article data as state
      className="w-[100%] overflow-hidden flex-col aspect-[10/6] flex justify-center justify-self-center relative cursor-pointer"
      onClick={handleClick}
      onMouseEnter={handleImageHover}
      onMouseLeave={handleImageLeave}
    >
      <div className="absolute  w-full h-full">
        <img
          src={`/api/${imagePath}`}
          alt=""
          className="w-full h-full object-cover grayscale duration-300"
        />
      </div>
      <div className="font-title w-full h-full flex items-center justify-center relative">
        <h1 className="relative text-title text-white px-2 py-0 tracking-wider bg-[#d6d30ee2] max-w-[80%] mx-auto text-center text-[0.9rem]">
          {props.title}
        </h1>
        <p className="absolute bottom-[10px] right-[10px] text-[0.8rem] text-accent bg-[#11111183]">
          {props.date.slice(0, 10)}
        </p>
      </div>
    </Link>
  );
};

export default Card;
