import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <Link
      to={`/article/${props.blog_id}`}
      state={props} // Pass the article data as state
      className="w-[320px] overflow-hidden flex-col aspect-[10/6] flex justify-center justify-self-center relative cursor-pointer"
    >
      <div className="aspect-w-10 aspect-h-16">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-full max-h-full">
            <img
              src={`/api/${props.image.name}`}
              alt=""
              className="w-full h-full object-cover grayscale hover:scale-110 hover:transform duration-300"
            />
          </div>
        </div>
      </div>
      <div className="font-title w-full h-full flex items-center justify-center relative">
        <h1 className="relative z-2 text-title text-white px-2 py-0 tracking-wider bg-[#d6d30ee2] max-w-[80%] mx-auto text-center text-[0.9rem]">
          {props.title}
        </h1>
        <p className="absolute bottom-[10px] right-[10px] text-[0.8rem] text-accent">
          {props.date.slice(0, 10)}
        </p>
      </div>
    </Link>
  );
};

export default Card;
