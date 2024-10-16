import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../component/Avatar";

const CheckEmail = () => {
  const [data, setData] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/email`;
    try {
      const response = await axios.post(url, data);

      if (response?.data?.error) {
        toast.error(response.data.message);
      } else {
        toast.success(response?.data?.message);
        navigate("/password",{state:response.data.data});
      }

      if (response.data.success) {
        setData({
          email: "",
        });
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto">
        <div className="w-fit mx-auto mb-2">
          <Avatar />
        </div>
        <h3>Welcome to ChatApp!</h3>
        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your E-mail"
              value={data.email}
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              onChange={handleOnChange}
              required
            />
          </div>
          <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-3 font-bold text-white leading-relaxed">
            Let's Go
          </button>
        </form>
        <p className="my-3 text-center">
          If you don't have account?{" "}
          <Link to="/register" className="hover:text-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;
