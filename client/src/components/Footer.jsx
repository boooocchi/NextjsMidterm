import React from "react";
import {
  AiFillInstagram,
  AiFillYoutube,
  AiFillLinkedin,
  AiFillGithub
} from "react-icons/Ai";
const Footer = () => {
  return (
    <div className="flex justify-center items-center flex-col mt-5 mb-5">
      <div className="iconHolder flex gap-2 text-grayblack">
        <a href="https://github.com/boooocchi" target="_blank">
          <AiFillGithub
            color="#21272b"
            className="text-[1.8rem] max-mobile:text-[1.7rem]"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/kota-ito-%EF%BC%A0041212/"
          target="_blank"
        >
          <AiFillLinkedin
            color="#21272b"
            className="text-[1.8rem] max-mobile:text-[1.7rem]"
          />
        </a>
        <a href="https://www.instagram.com/boooocchi/" target="_blank">
          <AiFillInstagram
            color="#21272b"
            className="text-[1.8rem] max-mobile:text-[1.7rem]"
          />
        </a>
        <a
          href="https://www.youtube.com/channel/UCnqG6PkVW6V_gC3TCb80COg"
          target="_blank"
        >
          <AiFillYoutube
            color="#21272b"
            className="text-[1.8rem] max-mobile:text-[1.7rem]"
          />
        </a>
      </div>
      <div className="mt-3 max-mobile:text-[0.8rem] text-[0.9rem]">
        <p>© 2023 Kota Ito</p>
      </div>
    </div>
  );
};

export default Footer;
