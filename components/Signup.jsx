import React from "react";
import axios from "axios";
import { useState } from "react";
import moduleCss from "../styles/Signup.module.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    address: "",
  });
  const handleClick = async (e) => {
    console.log(formData);
    const res = await axios.post("api/signup", formData);
  };
  return (
    <div className={moduleCss.container}>
      <div className=" rounded mb-4 ">
        <div className="mb-4">
          <div className={moduleCss.signUpContainer}>
            <h1 className="mb-2 text-3xl text-left font-bold">Sign up</h1>
            <h5 className="text-gray-500">
              Enter your credentials to continue
            </h5>
          </div>
          <label className="block text-gray-500 text-base font-bold mb-1">
            Username
          </label>
          <input
            type="text"
            className="mb-4 appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none border-b border-teal-500"
            name="username"
            placeholder="Username"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            value={formData.uesrname}
          />
          <label className="block text-gray-500 text-base font-bold mb-1">
            Email
          </label>
          <input
            type="text"
            className="mb-4 appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none border-b border-teal-500"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
          />
          <label className="block text-gray-500 text-base font-bold mb-1">
            Password
          </label>
          <input
            type="password"
            className="mb-4 appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none border-b border-teal-500"
            name="password"
            placeholder="Password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            value={formData.password}
          />
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
          <button
            type="submit"
            className="w-full text-center py-3 rounded-2xl  bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1"
            onClick={handleClick}
          >
            Create Account
          </button>
          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              {" "}
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              {" "}
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="text-grey-dark mt-6">
          Already have an account?
          <a
            className="no-underline border-b border-blue text-blue"
            href="../login/"
          >
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default Signup;
