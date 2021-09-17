import React, { useState } from "react";
import moduleCss from "../styles/Login.module.css";
import axios from "axios";
import showPwdImg from "../images/eye_visible_hide_hidden_show_icon_145988.png";
import hidePwdImg from "../images/eye_slash_visible_hide_hidden_show_icon_145987.png";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  const [formData, setFormData] = useState({
    // username: "",
    email: "",
    password: "",
    // address: "",
  });
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const res = await axios.post("api/login", formData);
  };

  return (
    <div>
      <div className="w-full ">
        <form className=" rounded mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-500 text-base font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              className="mb-3 appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none border-b border-teal-500"
              id="username"
              type="text"
              placeholder="Email"
              autoComplete="off"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
            />
          </div>

          <div className="mb-7">
            <label
              className="block text-gray-500 text-base font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div>
              <div
                className={moduleCss.pwdContainer}
              // style={{
              //   borderColor: !formData.password.trim()
              //     ? "rgba(239, 68, 68, 1)"
              //     : "rgba(226, 226, 226, 1)"
              // }}
              >
                <input
                  className=" appearance-none bg-transparent w-full text-gray-700 leading-tight focus:outline-none "
                  id="password"
                  type={isRevealPwd ? "text" : "password"}
                  placeholder="******************"
                  autoComplete="off"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
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
              {/* {!formData.password.trim() ? (
                <p className="text-red-500 text-xs italic mt-1">
                  Please enter a password.
                </p>
              ) : null} */}
            </div>
            <div className="text-right my-2">
              <Link href="#">
                <a className="text-gray-500 text-sm font-bold">
                  Forgot Password?
                </a>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
          {/* <Link href="../home"> */}
            <button
              className=" w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 my-1 rounded-2xl focus:outline-none focus:shadow-outline"
              type="submit"
            >
                Log In
            </button>
          {/* </Link> */}
          </div>
        </form>
        <p className="text-center text-gray-500 text-sm font-bold">
          Doesn't have an account?{" "}
          <Link href="../signup">
            <a className="text-green-500" href="../signup">
              Signup
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
