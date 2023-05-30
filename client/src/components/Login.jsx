import React from "react";

const Login = (props) => {
  const modalCloseHandler = () => {
    props.onClose();
  };

  const modalContentClickHandler = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className="h-screen w-screen flex justify-center bg-[#11111181] fixed z-[100] font-title font-light min-w-[330px]"
      onClick={modalCloseHandler}
    >
      <div
        onClick={modalContentClickHandler}
        className="flex flex-col items-center justify-center w-[300px] max-sm:w-[70%] py-8 h-screen lg:py-0 fixed"
      >
        <div className="w-full   shadow  sm:max-w-xl xl:p-0 bg-[#e0e0e0da]">
          <div className="p-6 space-y-4 md:space-y-5 sm:p-8 relative">
            <button
              onClick={modalCloseHandler}
              className="absolute right-[3%]  top-[-0.5%] text-black text-[1.4rem]"
            >
              ×
            </button>
            <h1 className="text-xl  font-title font-light leading-tight text-gray-900 md:text-2xl tracking-wider text-center">
              Login in
            </h1>
            <form className="space-y-4 md:space-y-6" action="/api/login">
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-title text-[#111] font-normal"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-white border text-[#111] sm:text-sm  block w-full p-2.5"
                  placeholder="snippets@blog.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-title text-[#111] font-normal"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start"></div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#111] hover:bg-primary-700 focus:ring-primary-300 font-medium  text-sm px-5 py-2.5 text-center hover:bg-[#494949]"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-[black]">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
