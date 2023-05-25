import React, { useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Create = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    article: "",
    date: "",
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0] // Store the File object directly
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const isoDate = date.toISOString(); // Convert date to ISO 8601 format
    handleChange({ target: { name: "date", value: isoDate } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formDataObj = new FormData();

    // Append the form fields to the FormData object
    for (const field in formData) {
      formDataObj.append(field, formData[field]);
    }

    // Make the API request to submit the form data
    fetch("/api/blogs/create", {
      method: "POST",
      body: formDataObj
    })
      .then((response) => {
        if (response.ok) {
          // Handle the successful response
          console.log("Blog created successfully");
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

  return (
    <section className="pt-[7rem] w-3/5 mx-auto mb-[7rem] tracking-wider">
      <h1 className="text-center mb-10 text-[1.3rem]">Create a Snippet</h1>

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
              placeholderText="Select a date"
            />
            <textarea
              name="article"
              type="text"
              placeholder="Article"
              className="border px-3 py-2 tracking-wider h-[15rem]"
              value={formData.article}
              onChange={handleChange}
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
            {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Selected Image"
                className="w-10 h-10 object-cover"
              />
            )}
            <input
              type="submit"
              value="Create"
              className="btn-default btn-success rounded-full border-2 px-3 py-1 cursor-pointer hover:bg-darker tracking-wider hover:bg-gray-200 active:bg-gray-200 w-1/3 mx-auto mt-8 max-md:w-full"
            />
          </div>
          <button className=" btn-outline-dark cancel mt-8 inline-block hover:text-[#9BA3AF]">
            <Link to="/">← back Home</Link>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Create;
