import React, { useState, useContext, useRef } from "react";
import useInput from "../hooks/use-input";
import AuthContext from "../store/auth-context";

const Login = (props) => {
  const authCtx = useContext(AuthContext);

  const [inputPassword, setInputPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  //Ref
  const passwordRef = useRef(null);
  const emailRef = useRef(null);

  //login input handlers
  const loginPasswordHandler = () => {
    setInputPassword(passwordRef.current.value);
  };
  const loginEmailHandler = () => {
    setInputEmail(emailRef.current.value);
  };

  const fetchUser = async (email, password) => {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    return data;
  };

  //login submit handler
  const submitLoginHandler = (event) => {
    event.preventDefault();
    console.log(inputEmail, inputPassword);
    if (inputEmail && inputPassword) {
      fetchUser(inputEmail, inputPassword)
        .then((data) => {
          console.log(data.rows[0]);
          const { user_id, email, name } = data.rows[0];
          authCtx.onLogin(user_id, email, name);
          props.onClose();
        })
        .catch((error) => {
          console.log("Error:", error);
        });
      // authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!inputEmail) {
      emailRef.current.focus();
    } else if (!inputPassword) {
      passwordRef.current.focus();
    }
  };

  // username input handler
  const {
    reset: usernameReset,
    inputBlurHandler: usernameInputBlurHandler,
    value: enteredUsername,
    valueChangeHandler: usernameInputHandler,
    hasError: usernameError,
    isValid: usernameValidation
  } = useInput((value) => {
    return value.trim() !== "";
  });

  // email input handler
  const {
    reset: emailReset,
    inputBlurHandler: emailInputBlurHandler,
    value: enteredEmail,
    valueChangeHandler: emailInputHandler,
    hasError: emailError,
    isValid: emailValidation
  } = useInput((value) => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return value.match(validRegex);
  });

  // password input handler
  const {
    reset: passwordReset,
    inputBlurHandler: passwordInputBlurHandler,
    value: enteredPassword,
    valueChangeHandler: passwordInputHandler,
    hasError: passwordError,
    isValid: passwordValidation
  } = useInput((value) => {
    const passw = /^(?=.*\d)(?=.*[a-z]).{6,20}$/;
    return value.match(passw);
  });

  // form submission
  const formSubmission = (event) => {
    event.preventDefault();
    if (!usernameValidation || !emailValidation || !passwordValidation) {
      return;
    }

    fetch("/api/user/register", {
      method: "POST",
      body: JSON.stringify({
        enteredEmail,
        enteredPassword,
        enteredUsername
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          console.log("registered successfully");

          setRegisterMode(false);
          usernameReset();
          emailReset();
          passwordReset();
        } else {
          console.error("Failed to create blog");
        }
      })
      .catch((error) => {
        // Handle any network errors or exceptions
        console.error("Network error:", error);
      });
  };

  const [registerMode, setRegisterMode] = useState(false);
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
        <div className="w-full shadow sm:max-w-xl xl:p-0 bg-[#e0e0e0da]">
          <div className="p-6 space-y-4 md:space-y-5 sm:p-8 relative">
            <button
              onClick={modalCloseHandler}
              className="absolute right-[3%] top-[-0.5%] text-black text-[1.4rem]"
            >
              ×
            </button>
            {registerMode && (
              <>
                <h1 className="text-xl font-title font-light leading-tight text-gray-900 md:text-2xl tracking-wider text-center">
                  Sign in
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  action="/api/login"
                  onSubmit={formSubmission}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-title text-[#111] font-normal"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-white border text-[#111] sm:text-sm block w-full p-2.5"
                      placeholder="snippets@blog.com"
                      required
                      onBlur={emailInputBlurHandler}
                      onChange={emailInputHandler}
                      value={enteredEmail}
                    />
                    {emailError && <p className="error-text">Invalid email</p>}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-title text-[#111] font-normal"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                      onBlur={passwordInputBlurHandler}
                      onChange={passwordInputHandler}
                      value={enteredPassword}
                    />
                    {passwordError && (
                      <p className="error-text">
                        The password must be at least 6 characters long and
                        contain at least one digit.
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-title text-[#111] font-normal"
                    >
                      User name
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Mr.Hazy"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                      onBlur={usernameInputBlurHandler}
                      onChange={usernameInputHandler}
                      value={enteredUsername}
                    />
                    {usernameError && (
                      <p className="error-text">Username is required</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start"></div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-[#111] hover:bg-primary-700 focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center hover:bg-[#494949]"
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-[black]">
                    Already have an account?{" "}
                    <button
                      onClick={() => {
                        setRegisterMode(true);
                      }}
                      className="font-medium text-primary-600 hover:underline"
                    >
                      Log in
                    </button>
                  </p>
                </form>
              </>
            )}
            {!registerMode && (
              <>
                <h1 className="text-xl font-title font-light leading-tight text-gray-900 md:text-2xl tracking-wider text-center">
                  Login
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={submitLoginHandler}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-title text-[#111] font-normal"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-white border text-[#111] sm:text-sm block w-full p-2.5"
                      placeholder="snippets@blog.com"
                      required
                      ref={emailRef}
                      onChange={loginEmailHandler}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-title text-[#111] font-normal"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                      onChange={loginPasswordHandler}
                      ref={passwordRef}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start"></div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-[#111] hover:bg-primary-700 focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center hover:bg-[#494949]"
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-[black]">
                    Don't have an account yet?{" "}
                    <button
                      onClick={() => {
                        setRegisterMode(true);
                      }}
                      className="font-medium text-primary-600 hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
