import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [blogsData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      const response = await fetch("/api/blogs/all");
      const data = await response.json();
      const { rows } = data;
      setBlogData(rows);
    };

    fetchBlogData();
  }, []);

  return (
    <>
      <h1>Hi how are you</h1>
      <h1>List of blogs</h1>

      <div className="table-responsive-sm">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Article</th>
              <th>Date</th>
              <th>Image</th>
              <th className="d-print-none">
                <a className="btn btn-sm btn-success" href="/books/create">
                  Add
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            {blogsData &&
              blogsData.map((blogData) => (
                <tr key={blogData._id}>
                  <td>{blogData.title}</td>
                  <td>{blogData.author}</td>
                  <td>{blogData.article}</td>
                  <td>{blogData.date}</td>
                  <td>{blogData.image}</td>

                  <td className="d-print-none">
                    <a
                      className="btn btn-sm btn-warning"
                      href={`/blogs/edit/${blogData._id}`}
                    >
                      Edit
                    </a>
                    <form
                      action={`/blogs/delete/${blogData._id}?_method=DELETE`}
                      method="POST"
                    >
                      <button className="btn btn-sm btn-danger" type="submit">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
