import React from "react";
import { useLocation, Link } from "react-router-dom";

const Article = () => {
  const location = useLocation();
  const { blog_id, title, author, date, article, image } = location.state;

  return (
    <section className="w-[55%] mx-auto pt-[7rem] mb-[7rem]">
      <div className="w-full flex justify-center">
        <img src={`/api/${image}`} alt="" className="grayscale w-full" />
      </div>
      <div className="flex mt-2">
        <h1 className="text-[1.3rem] bg-accent px-2">{title}</h1>
        <span className="text-[1rem] ml-auto mr-0">by {author}</span>
      </div>

      <p className="mt-10">{article}</p>

      <div className="w-full flex justify-end">
        <Link
          to={`/edit/${blog_id}`}
          state={location.state}
          className=" hover:text-grayblack pb-[0px] border-b border-black mb-0 leading-[1rem] hover:border-transparent  relative"
        >
          Edit
        </Link>
      </div>
    </section>
  );
};

export default Article;
