import React, { useState } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
import moduleCss from "../styles/signup.module.css";
import showPwdImg from "../images/eye_visible_hide_hidden_show_icon_145988.png";
import hidePwdImg from "../images/eye_slash_visible_hide_hidden_show_icon_145987.png";
import Image from "next/image";
import validator from 'validator';
import vector from "../images/Vector.png";
import cross from "../images/Cross.png";
import Link from "next/link";
import {NotificationContainer, NotificationManager} from 'react-notifications';


const Signup = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isUsername, setIsUsername] = useState(false);

  const validateUsername = (e) => {
    setFormData({ ...formData, username: e.target.value })
    // console.log(e.target.value)
    // console.log(e.target.value.length)
    if (e.target.value.length > 0) {
      setIsUsername(true)
    } else {
      setIsUsername(false)
    }
  }

  const validateEmail = (e) => {
    if (validator.isEmail(e.target.value)) {
      setIsEmailValid(true)
    } else {
      setIsEmailValid(false)
    }
    setFormData({ ...formData, email: e.target.value })
  }

  const validatePassword = (e) => {
    setFormData({ ...formData, password: e.target.value })
    // console.log(e.target.value)
    // console.log(e.target.value.length)
    if (e.target.value.length >= 6) {
      setIsPasswordValid(true)
    } else {
      setIsPasswordValid(false)
    }
  }

  const handleClick = async (e) => {
    // console.log(formData);
    if(!isUsername) {
      createNotification("info")
    }
    else if (!isEmailValid || !isPasswordValid) {
      createNotification("error")
    } else {
        try {
          await axios.post("api/signup", formData);
          createNotification("success")
          await new Promise(resolve => setTimeout(resolve, 3000));
          router.push("/")
        } catch (e) {
//          console.log(e.response.data.message);
          console.log(e)
          createNotification("warning", e)
        }
    }
    setFormData({username: "", email: "", password: ""})
    setIsUsername(false)
    setIsEmailValid(false)
    setIsPasswordValid(false)
  };

  const createNotification = (type, item) => {
    switch (type) {
      case "info":
        return NotificationManager.info(`Your username should not be empty`, "Username");
      case "success":
        return NotificationManager.success(`You have succefully created an account`, "Successful Registration");
      case "error":
        return NotificationManager.error('Please enter a valid email and a password with at least 6 characters', 'Invalid Email/Password', 3000);
      case "warning":
        return NotificationManager.warning(item, 'Duplicated Username/Email', 3000);
  
    }
  }

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
          className="py-1 appearance-none bg-transparent w-full text-gray-700 leading-tight focus:outline-none border-b border-teal-500"
          name="username"
          placeholder="Username"
          onChange={(e) =>
            validateUsername(e)
          }
          value={formData.username}
        />
      </div>

      <label className="block text-gray-500 text-base font-bold mb-1">
        Email
      </label>
      <div className={moduleCss.emailContainer}>
        <input
          type="text"
          className="py-1 appearance-none bg-transparent w-full text-gray-700 leading-tight focus:outline-none border-teal-500"
          name="email"
          placeholder="Email"
          onChange={(e) =>
            validateEmail(e)
          }
          value={formData.email}
        />
        <span className={moduleCss.validationIcon}>
          <Image
            src={isEmailValid ? vector : cross}
            width="17vw"
            height="17vh"
            onClick={() => setIsRevealPwd((prevState) => !prevState)}
          ></Image>
        </span>
      </div>
      <label className="block text-gray-500 text-base font-bold mb-1">
        Password
      </label>
      <div className={moduleCss.pwdContainer}
        style={{
          borderColor: formData.password.length > 0 && formData.password.length < 6
            ? "rgba(239, 68, 68, 1)"
            : "rgba(226, 226, 226, 1)"
        }}    
      >    
        <input
          type={isRevealPwd ? "text" : "password"}
          className="py-1 appearance-none bg-transparent w-full text-gray-700 leading-tight focus:outline-none border-teal-500"
          name="password"
          placeholder="Password"
          onChange={(e) =>
            validatePassword(e)
          }
          value={formData.password}
        />
        <span>
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
      {formData.password.length > 0 && formData.password.length < 6 ? (
          <p className="text-red-500 text-xs italic mt-1">
            Please enter a password with at least 6 characters.
          </p>
        ) : null}    
      <div className={moduleCss.declaration}>
        <div className="text-left text-sm text-gray-500">
          By continuing, you agree to the
          <Link href="#">
            <a
              className="no-underline border-b border-grey-dark text-green-500"
            >
              {" "}
              Terms of Service
            </a>
          </Link>
          {" "}
          and
          <Link href="#">
            <a
              className="no-underline border-b border-grey-dark text-green-500"

            >
              {" "}
              Privacy Policy
            </a>
          </Link>
        </div>
      </div>
      <div className={moduleCss.signUpButton}>
        <button
          type="submit"
          className="w-full text-center py-3 rounded-2xl  font-bold bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1"
          onClick={handleClick}
        >
          Sign Up
        </button>
      </div>

      <div className="text-center text-sm  font-bold">
        Already have an account?
        <Link href="/">
          <a
            className="no-underline border-b border-blue text-green-500"

          >
            {" "}Log in
          </a>
        </Link>
      </div>
      <NotificationContainer/>
    </div>

  );
};

export default Signup;
