import React from "react";
import axios from "axios";
import { useState } from "react";
import moduleCss from "../styles/Signup.module.css";
import showPwdImg from "../images/eye_visible_hide_hidden_show_icon_145988.png";
import hidePwdImg from "../images/eye_slash_visible_hide_hidden_show_icon_145987.png";
import Image from "next/image";


const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    address: "",
  });
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  const handleClick = async (e) => {
    console.log(formData);
    const res = await axios.post("api/signup", formData);
  };
  return (
    <div className={moduleCss.container}>

      <div className={moduleCss.signUpContainer}>
        <h1 className={moduleCss.signUpTitle}>Sign up</h1>
        <h5 className="text-gray-500">
          Enter your credentials to continue
        </h5>
      </div>
      <div className={moduleCss.inputContainer}>
        <label className="block text-gray-500 text-base font-bold mb-1">
          Username
        </label>
        <input
          type="text"
          className="appearance-none bg-transparent w-full text-gray-700 leading-tight focus:outline-none border-b border-teal-500"
          name="username"
          placeholder="Username"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          value={formData.uesrname}
        />
      </div>
      <div className={moduleCss.inputContainer}>
        <label className="block text-gray-500 text-base font-bold mb-1">
          Email
        </label>
        <input
          type="text"
          className="appearance-none bg-transparent w-full text-gray-700  leading-tight focus:outline-none border-b border-teal-500"
          name="email"
          placeholder="Email"
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          value={formData.email}
        />
      </div>
      <label className="block text-gray-500 text-base font-bold mb-1">
        Password
      </label>
      <div className={moduleCss.pwdContainer}>
        <input
          type="password"
          className="appearance-none bg-transparent w-full text-gray-700 leading-tight focus:outline-none border-teal-500"
          name="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          value={formData.password}
        />
        <span className="pwdIcon">
          <Image
            src={isRevealPwd ? hidePwdImg : showPwdImg}
            width="20vw"
            height="20vh"
            onClick={() => setIsRevealPwd((prevState) => !prevState)}
          ></Image>
        </span>
      </div>
      {/* <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="address"
            placeholder="Address"
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            value={formData.address}
          /> */}
      <div className={moduleCss.declaration}>
        <div className="text-left text-sm text-gray-500">
          By continuing, you agree to the
          <a
            className="no-underline border-b border-grey-dark text-green-500"
            href="#"
          >
            {" "}
            Terms of Service
          </a>{" "}
          and
          <a
            className="no-underline border-b border-grey-dark text-green-500"
            href="#"
          >
            {" "}
            Privacy Policy
          </a>
        </div>
      </div>
      <div className={moduleCss.signUpButton}>
        <button
          type="submit"
          className="w-full text-center py-3 rounded-2xl  bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1"
          onClick={handleClick}
        >
          Sign Up
        </button>
      </div>
     
        <div className="text-center text-sm  font-bold">
          Already have an account?
          <a
            className="no-underline border-b border-blue text-green-500"
            href="../login/"
          >
            {" "}Log in
          </a>
          .
        </div>
      </div>
  
  );
};

export default Signup;
