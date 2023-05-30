import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Edit = () => {
  const location = useLocation();
  const { blog_id, title, date, article, image, author } = location.state;

  const [formData2, setFormData] = useState({
    title: title,
    author: author,
    article: article,
    date: date,
    image: null
  });

  const [isImgChanged, setIsImageChanged] = useState(false);

  // let imgPath = JSON.parse(image).filename;

  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({
        ...formData2,
        image: files[0]
      });
      setIsImageChanged(true);
    } else {
      setFormData({ ...formData2, [name]: value });
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const isoDate = date.toISOString();
    handleChange({ target: { name: "date", value: isoDate } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObj = new FormData();

    for (const field in formData2) {
      formDataObj.append(field, formData2[field]);
    }

    fetch(`/api/blogs/edit/${blog_id}`, {
      method: "POST",
      body: formDataObj
    })
      .then((response) => {
        if (response.ok) {
          console.log("Blog edited successfully");
        } else {
          console.error("Failed to edit");
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
    navigate("/");
  };

  // let ImageTag;
  // if (isImgChanged) {
  //   ImageTag = (
  //     <div className="w-[30%] max-smw-full grayscale">
  //       <img
  //         src={URL.createObjectURL(formData2.image)}
  //         alt="Selected Image"
  //         className="object-cover"
  //       />
  //     </div>
  //   );
  // } else {
  //   ImageTag = (
  //     <div className="w-[30%] max-sm:w-full grayscale">
  //       <img
  //         src={`/api/${formData2.image.name}`}
  //         alt="Selected Image"
  //         className="object-cover"
  //       />
  //     </div>
  //   );
  // }
  useEffect(() => {
    console.log(formData2);
  }, []);

  return (
    <section className="pt-[7rem] w-3/5 mx-auto mb-[7rem] tracking-wider max-mobile:w-4/5">
      <h1 className="text-center mb-10 text-[1.3rem]">Edit a Snippet</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-horizontal">
          <div className="flex flex-col gap-5">
            <input
              name="title"
              type="text"
              placeholder="Title"
              className="border px-3 py-2 tracking-wider"
              value={formData2.title}
              onChange={handleChange}
            />
            <input
              name="author"
              type="text"
              placeholder="author"
              className="border px-3 py-2 tracking-wider"
              value={formData2.author}
              onChange={handleChange}
            />
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="border px-3 py-2 tracking-wider w-full text-[#000000]"
              dateFormat="yyyy-MM-dd"
              value={formData2.date.slice(0, 10)}
            />
            <textarea
              name="article"
              type="text"
              placeholder="Article"
              className="border px-3 py-2 tracking-wider h-[15rem]"
              value={formData2.article}
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
            <div className="w-[50%] max-sm:w-full grayscale">
              {!isImgChanged ? (
                <img
                  src={image}
                  alt="Selected Image"
                  className="object-cover  grayscale"
                />
              ) : (
                <img src={URL.createObjectURL(formData2.image)} alt="" />
              )}
            </div>
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

            <form
              action={`/api/blogs/delete/${blog_id}?_method=DELETE`}
              method="POST"
            >
              <button
                className="hover:text-grayblack pb-[0.1px] border-b border-accent leading-[1rem] hover:border-transparent text-[1rem] inline-block cursor-pointer text-accent"
                type="submit"
              >
                Delete this snippet
              </button>
            </form>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Edit;
