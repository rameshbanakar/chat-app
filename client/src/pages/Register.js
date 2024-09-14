import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import uploadFile from "../helpers/UploadFiles";
const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });
  const [uploadphto, setUploadPhoto] = useState("");
  const navigate=useNavigate()
  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  
  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];

    const uploadphoto = await uploadFile(file);
    setData({ ...data, profile_pic: uploadphoto.url });
    setUploadPhoto(file);
  };
  const clearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/register`;
    try {
      const response = await axios.post(url, data);
      console.log(response);
      if(response.data.error){
        toast.error(response.data.message)
      }else{
          toast.success(response?.data?.message);
      }
      
      if (response.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: "",
        });
        navigate("/email");
      }
     
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto">
        <h3>Welcome to ChatApp!</h3>
        <form className="grid gap-3 mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={data.name}
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              onChange={handleOnChange}
              required
            />
          </div>

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

          <div className="flex flex-col r">
            <label htmlFor="profile_pic">
              Photo:
              <div className="h-14 bg-slate-200 flex justify-center items-center  rounded border hover:border-primary cursor-pointer">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {uploadphto ? uploadphto.name : "upload profile pic"}
                </p>
                {uploadphto && (
                  <button
                    className="ml-2 text-lg  hover:text-red-600"
                    onClick={clearUploadPhoto}
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            </label>
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              onChange={handleUploadPhoto}
              className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
            />
          </div>
          <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-3 font-bold text-white leading-relaxed">
            Register
          </button>
        </form>
        <p className="my-3 text-center">
          If you have already accout?{" "}
          <Link to="/email" className="hover:text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
