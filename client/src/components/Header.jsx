import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import AuthContext from "../store/auth-context";
import { toast } from "react-toastify";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginModal, setLoginModal] = useState(false);
  const loginBtnHandler = () => {
    setLoginModal(true);
  };

  const logoutBtnHandler = () => {
    authCtx.onLogout();
    navigate("/");
    toast.success("Logout successul!!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
  };

  const loginModalCloseHandler = () => {
    setLoginModal(false);
  };

  console.log(authCtx.userInfo);
  return (
    <>
      {loginModal && <Login onClose={loginModalCloseHandler} />}
      <header className="max-md:h-[3rem] h-[4rem] w-full bg-[#eeeeee8b]  font-title px-10 flex items-center fixed z-[99] max-mobile:px-5">
        <nav className="flex justify-between items-center w-full text-[0.8rem] max-w-[1280px] mx-auto">
          <Link
            to="/"
            className="tracking-widest border-b-[2px] border-[#ffe436] cursor-pointer max-md:text-[0.8rem]"
          >
            HOME
          </Link>
          <div className="flex gap-5 text-[0.7rem] tracking-widest relative top-[2px] max-mobile:gap-3">
            <span className="border-b-2 border-transparent hover:y-[-1rem] hover:border-b-2 hover:border-[#ffe436] cursor-pointer">
              ABOUT
            </span>
            <span>/</span>
            <span className="border-b-2 border-transparent hover:y-[-1rem] hover:border-b-2 hover:border-[#ffe436] cursor-pointer">
              SNIPPETS
            </span>

            {localStorage.getItem("userID") && (
              <>
                <span>/</span>
                <Link
                  to="/create"
                  className="border-b-2 border-transparent hover:y-[-1rem] hover:border-b-2 hover:border-[#ffe436] cursor-pointer"
                >
                  CREATE
                </Link>
              </>
            )}
            <span>/</span>
            {!localStorage.getItem("userID") ? (
              <button
                className="border-b-2 border-transparent hover:y-[-1rem] hover:border-b-2 hover:border-[#ffe436] cursor-pointer"
                onClick={loginBtnHandler}
              >
                LOG IN
              </button>
            ) : (
              <button
                className="border-b-2 border-transparent hover:y-[-1rem] hover:border-b-2 hover:border-[#ffe436] cursor-pointer"
                onClick={logoutBtnHandler}
              >
                LOG OUT
              </button>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
