import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import AuthContext from "../store/auth-context";
import { toast } from "react-toastify";

const Header = () => {
  const location = useLocation();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginModal, setLoginModal] = useState(false);
  const loginBtnHandler = () => {
    setLoginModal(true);
  };
  console.log(location.pathname);
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
  const userId = localStorage.getItem("userID");

  return (
    <>
      {loginModal && <Login onClose={loginModalCloseHandler} />}
      <header className="max-md:h-[3rem] h-[4rem] w-full bg-[#eeeeee8b]  font-title px-10 flex items-center fixed z-[99] max-mobile:px-5">
        <nav className="flex justify-between items-center w-full text-[0.8rem] max-w-[1280px] mx-auto">
          <Link
            to="/"
            className={`tracking-widest border-b-2  hover:border-[#ffe436] cursor-pointer max-md:text-[0.8rem] ${
              location.pathname === "/"
                ? "border-[#ffe436]"
                : "border-transparent"
            }`}
          >
            HOME
          </Link>
          <div className="flex gap-5 text-[0.7rem] tracking-widest relative top-[2px] max-mobile:gap-3">
            {localStorage.getItem("userID") && (
              <>
                <Link
                  to={`/blog/${userId}`}
                  className={`border-b-2  hover:y-[-1rem] hover:border-b-2 hover:border-[#ffe436] cursor-pointer ${
                    location.pathname === `/blog/${userId}`
                      ? "border-[#ffe436]"
                      : "border-transparent"
                  }`}
                >
                  YOURS
                </Link>
              </>
            )}

            {localStorage.getItem("userID") && (
              <>
                <span>/</span>
                <Link
                  to="/create"
                  className={`border-b-2  hover:y-[-1rem] hover:border-b-2 hover:border-[#ffe436] cursor-pointer ${
                    location.pathname === "/create"
                      ? "border-[#ffe436]"
                      : "border-transparent"
                  }`}
                >
                  CREATE
                </Link>
                <span>/</span>
              </>
            )}
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
