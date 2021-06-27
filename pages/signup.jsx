import {useState} from "react";
import axios from 'axios'

const signup = () => {
    const [formData, setFormData] = useState({ username: "", password: "", email: "", address: "" });
    const handleClick = async e => {
        console.log(formData)
        const res = await axios.post('api/signup', formData)
    }
    return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="username"
            placeholder="Username"
            onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              value = {formData.uesrname}
          />
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value = {formData.email}
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value = {formData.password}
          />
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="address"
            placeholder="Address"
            onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              value = {formData.address}
          />
          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-500 focus:outline-none my-1"
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
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
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

export default signup;
