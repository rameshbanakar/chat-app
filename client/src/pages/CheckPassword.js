import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Avatar from "../component/Avatar";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/UserSlice";

const CheckPassword = () => {
  const dispatch=useDispatch()
  const [data, setData] = useState({
    password: "",
  });
  const location = useLocation();

  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (!location.state) {
      navigate("/email");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/password`;
    const inputData={userId:location?.state?._id,password:data.password}
    try {
      const response = await axios.post(url, inputData);
      
      if (response.data.success) {
        dispatch(setUser(response.data.data))
        dispatch(setToken(response.data.token))
        console.log("password page",response)
        toast.success(response?.data?.message);
        setData({
          password: "",
        });
        localStorage.setItem("token", response?.data?.token);
        navigate("/");
      }else{
        toast.error(response?.data?.message);
      }

      
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto">
        <div className="w-fit mx-auto mb-2 flex justify-center items-center flex-col">
          <Avatar
            width={80}
            height={80}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
          />
          <h2 className="font-semibold text-lg mt-1">
            {location?.state?.name}
          </h2>
        </div>
        <h3>Welcome to ChatApp!</h3>
        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={data.password}
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              onChange={handleOnChange}
              required
            />
          </div>
          <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-3 font-bold text-white leading-relaxed">
            Submit
          </button>
        </form>
        <p className="my-3 text-center">
          <Link
            to="/forgot-password"
            className="hover:text-primary font-semibold"
          >
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckPassword;
