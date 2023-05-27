import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CiPaperplane } from "react-icons/ci";
const Article = () => {
  const location = useLocation();
  const { blog_id, title, author, date, article, image } = location.state;
  const imagePath = JSON.parse(image).filename;
  const [isPortrait, setIsPortrait] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const commentRef = useRef();
  const commenterRef = useRef();
  const [commentData, setCommentData] = useState({
    commenter: "",
    comment: ""
  });

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

  const inputChangehandler = (fieldName) => {
    if (fieldName === "comment") {
      setCommentData((previous) => {
        return { ...previous, comment: commentRef.current.value };
      });
    } else {
      setCommentData((previous) => {
        return { ...previous, commenter: commenterRef.current.value };
      });
    }

    console.log(commentData);
  };

  let commentDivStyle = "cursor-pointer  mt-[7rem] bg-black inline-block";
  if (commentModal) {
    commentDivStyle = "cursor-pointer  mt-[7rem] bg-white";
  }

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
        <h1 className="text-[1.3rem] max-md:text-[1rem] max-mobile:text-[1rem] bg-accent px-2">
          {title}
        </h1>
        <span className="text-[0.9rem] ml-auto mr-0 max-md:text-[0.8rem]">
          {date.slice(0, 10)}
        </span>
      </div>

      <p className="mt-10 mb-5 text-[1rem]">{article}</p>

      <span className="text-[1rem] ml-auto mr-0 max-md:text-[0.8rem]">
        by {author}
      </span>
      <div className="w-full flex justify-end">
        <Link
          to={`/edit/${blog_id}`}
          state={location.state}
          className=" hover:text-grayblack pb-[0px] border-b border-black mb-0 leading-[1rem] hover:border-transparent  relative max-md:text-[0.9rem]"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Edit
        </Link>
      </div>

      <motion.div
        layout="true"
        transition={{ layout: { duration: 0.2 } }}
        onClick={() => {
          setCommentModal(true);
        }}
        className={commentDivStyle}
      >
        {!commentModal && (
          <motion.h2
            layout="position"
            className="inline-block text-white px-2 py-1 text-[0.9rem]"
          >
            create a comment
          </motion.h2>
        )}

        {commentModal && (
          <motion.form
            action="/api/comment/:id"
            method="post"
            className="flex flex-col"
          >
            <input
              name="commenter"
              type="text"
              placeholder="commenter"
              ref={commenterRef}
              onBlur={() => inputChangehandler("commenter")}
              className="border mb-3 px-2 py-1"
            />
            <textarea
              name="comment"
              placeholder="comment"
              ref={commentRef}
              onBlur={() => inputChangehandler("comment")}
              className="border px-2 py-1 h-[6rem]"
            ></textarea>
            <div className="flex items center justify-between mt-3">
              <button
                type="button"
                layout
                className="cursor-pointer ml-2 text-[1rem] text-grayblack"
                onClick={(e) => {
                  e.stopPropagation();
                  setCommentModal(false);
                }}
              >
                × close
              </button>
              <button className="text-[1.5rem] mr-1">
                <CiPaperplane />
              </button>
            </div>
          </motion.form>
        )}
      </motion.div>
    </section>
  );
};

export default Article;
