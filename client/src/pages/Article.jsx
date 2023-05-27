import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const Article = () => {
  const location = useLocation();
  const { blog_id, title, author, date, article, image } = location.state;
  const imagePath = JSON.parse(image).filename;
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = `/api/${imagePath}`;
    img.onload = () => {
      setIsPortrait(img.naturalHeight > img.naturalWidth);
    };
  }, [imagePath]);

  const imageStyles = {
    width: isPortrait ? "50%" : "auto"
  };

  return (
    <section className="min-h-[70vh] w-[60%] max-md:w-[75%] min-w-[300px] mx-auto pt-[7rem] mb-[7rem] max-w-[1000px]">
      <div className="w-full flex justify-center max-w-[1000px]">
        <img
          src={`/api/${imagePath}`}
          alt=""
          className="grayscale"
          style={imageStyles}
        />
      </div>
      <div className="flex mt-3">
        <h1 className="text-[1.3rem] max-md:text-[1rem] max-mobile:text-[0.9rem] bg-accent px-2">
          {title}
        </h1>
        <span className="text-[0.9rem] ml-auto mr-0 max-md:text-[0.8rem]">
          {date.slice(0, 10)}
        </span>
      </div>

      <p className="mt-10 mb-5 text-[1.1rem]">{article}</p>

      <span className="text-[1rem] ml-auto mr-0 max-md:text-[0.9rem]">
        by {author}
      </span>
      <div className="w-full flex justify-end">
        <Link
          to={`/edit/${blog_id}`}
          state={location.state}
          className=" hover:text-grayblack pb-[0px] border-b border-black mb-0 leading-[1rem] hover:border-transparent  relative max-md:text-[0.9rem]"
        >
          Edit
        </Link>
      </div>
    </section>
  );
};

export default Article;
