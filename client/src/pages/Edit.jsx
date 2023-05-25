import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Edit = () => {
  const location = useLocation();
  const { blog_id, title, date, article, image, author } = location.state;

  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    title: title || "", // Use empty string if title is null or undefined
    author: author || "", // Use empty string if author is null or undefined
    article: article || "", // Use empty string if article is null or undefined
    date: date || "", // Use empty string if date is null or undefined
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: files[0] // Store the File object directly
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };
  useEffect(() => {
    console.log(formData.image);
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const isoDate = date.toISOString();
    handleChange({ target: { name: "date", value: isoDate } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObj = new FormData();

    for (const field in formData) {
      formDataObj.append(field, formData[field]);
    }

    console.log([...formDataObj);

    // Make the API request to submit the form data
    fetch(`/api/blogs/edit/${blog_id}`, {
      method: "POST",
      body: formDataObj
    })
      .then((response) => {
        if (response.ok) {
          // Handle the successful response
          console.log("Blog edited successfully");
          // Redirect or perform any other actions
        } else {
          // Handle the error response
          console.error("Failed to create blog");
        }
      })
      .catch((error) => {
        // Handle any network errors or exceptions
        console.error("Network error:", error);
      });
    navigate("/");
  };
  useEffect(() => {
    console.log(formData.title);
  }, [formData.title]);

  return (
    <section className="pt-[7rem] w-3/5 mx-auto mb-[7rem] tracking-wider">
      <h1 className="text-center mb-10 text-[1.3rem]">Edit a Snippet</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-horizontal">
          <div className="flex flex-col gap-5">
            <input
              name="title"
              type="text"
              placeholder="Title"
              className="border px-3 py-2 tracking-wider"
              value={formData.title}
              onChange={handleChange}
            />
            <input
              name="author"
              type="text"
              placeholder="author"
              className="border px-3 py-2 tracking-wider"
              value={formData.author}
              onChange={handleChange}
            />
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="border px-3 py-2 tracking-wider w-full text-[#000000]"
              dateFormat="yyyy-MM-dd"
            />
            <textarea
              name="article"
              type="text"
              placeholder="Article"
              className="border px-3 py-2 tracking-wider h-[15rem]"
              value={formData.article}
              onChange={handleChange}
              initialvalue={article}
            />

            <label
              htmlFor="imageInput"
              className="file-input-label inline-flex items-center px-4 py-2 bg-gray-200 text-[#9BA3AF] cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              <span>Upload Image</span>
              <input
                type="file"
                id="imageInput"
                name="image"
                accept="image/*"
                capture="user"
                onChange={handleChange}
                className="hidden"
              />
            </label>
            {/* {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Selected Image"
                className="w-10 h-10 object-cover"
                // value={(src = `/api/${image}`)}
              />
            )} */}
            <input
              type="submit"
              value="Edit"
              className="btn-default btn-success rounded-full border-2 px-3 py-1 cursor-pointer hover:bg-darker tracking-wider hover:bg-gray-200 active:bg-gray-200 w-1/3 mx-auto mt-8 max-md:w-full"
            />
          </div>
          <div className="flex justify-between mt-8 items-end">
            <button className=" btn-outline-dark cancel inline-block hover:text-[#9BA3AF]">
              <Link to="/">← back Home</Link>
            </button>
            <a className="hover:text-grayblack pb-[0.1px] border-b border-accent leading-[1rem] hover:border-transparent text-[1rem] inline-block cursor-pointer text-accent">
              Delete this snippet
            </a>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Edit;
