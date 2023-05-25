import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Hero from "../components/Hero";
import Card from "@/components/Card";

function App() {
  const [blogsData, setBlogsData] = useState([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch("/api/blogs/all");
        const data = await response.json();
        const { rows } = data;
        setBlogsData(rows);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    if (blogsData.length === 0) {
      fetchBlogData();
    }
  }, [blogsData]);

  return (
    <>
      <Hero></Hero>
      <main className="grid md:grid-cols-3 w-[90%] mx-auto gap-[1rem] mt-[7rem] mb-[7rem]">
        {blogsData.map((blogData) => (
          <Card key={blogData.blog_id} {...blogData}></Card>
        ))}
      </main>
    </>
  );
}

export default App;

{
  /* <Link
  className="btn btn-sm btn-warning"
  to={`/edit/${blogData.id}`}
>
  Edit
</Link>
<form
  action={`/blogs/delete/${blogData.id}?_method=DELETE`}
  method="POST"
>
  <button
    className="btn btn-sm btn-danger bg-red-500"
    type="submit"
  >
    Delete
  </button>
</form> */
}
