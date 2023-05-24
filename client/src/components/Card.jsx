import React from "react";

const Card = (props) => {
  return (
    <div className=" w-[300px] overflow-hidden flex-col aspect-[10/6] justify-self-center relative grayscale">
      <img src={props.image} alt="" classname="absolute top-0 left-0 w-full" />
      <div className="font-title w-full h-full flex items-center justify-center absolute top-0">
        <h1 className="relative z-2 text-title text-white bg-[#2222226f] px-3 py-1">
          {props.title}
        </h1>
        <p className="absolute bottom-[10px] right-[10px] text-[0.8rem] text-accent bg-[#2222226f] ">
          {props.date.slice(0, 10)}
        </p>
      </div>
    </div>
  );
};

export default Card;
