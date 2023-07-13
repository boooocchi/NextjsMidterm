import { useState, useEffect } from "react";

import Hero from "../components/Hero";
import Card from "@/components/Card";

function Yours() {
  const [blogsData, setBlogsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem("userID");
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/blogs/yours/${userId}`);
        const data = await response.json();
        console.log(data);
        setBlogsData(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
      setIsLoading(false);
    };
    fetchBlogData();
  }, []);

  return (
    <>
      <Hero></Hero>
      <h1 className="text-center mt-[6.5rem]  max-lg:mt-[5rem]  max-md:mt-[5rem] max-md:text-[1.1rem] mb-[2rem] text-[1.3rem] uppercase max-mobile:mt-[4rem]">
        Your Snippets
      </h1>

      {isLoading && (
        <div className="w-full flex items-center justify-center h-[2rem]">
          <div className="px-3  text-xs   text-center text-white   animate-pulse w-[5rem] h-[2rem]  dark:bg-[#333] text-title font-[200] leading-[2rem]">
            loading...
          </div>
        </div>
      )}

      <main className="grid md:grid-cols-2  lg:grid-cols-3 w-[80%] mx-auto gap-[2rem]  mb-[7rem] max-w-[1280px] gap-y-[2rem]">
        {blogsData.map((blogData) => (
          <Card key={blogData.blog_id} {...blogData}></Card>
        ))}
      </main>
    </>
  );
}

export default Yours;
