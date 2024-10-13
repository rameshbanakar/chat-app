import React, { useRef, useState } from "react";
import Avatar from "./Avatar";
import uploadFile from "../helpers/UploadFiles";
import Divider from "./Divider";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import setUser from "../redux/UserSlice";
const EditUserDetails = ({ onClose, data }) => {
  const [user, setuser] = useState({
    name: data?.name,
    email: data?.email,
    profile_pic: data?.profile_pic,
    token: localStorage.getItem("token"),
  });
  const dispatch = useDispatch();
  const changePhotoRef = useRef();

  const onChangeHandler = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };
  const handlePhotoChange = async (e) => {
    console.log("photo change");
    const file = e.target.files[0];

    const uploadphoto = await uploadFile(file);

    setuser({ ...user, profile_pic: uploadphoto.url });
    //
    // setUploadPhoto(file);
  };
  const changePhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    changePhotoRef.current.click();
  };
  const changeOnSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    user["token"] = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/updateUser`,
        user
      );

     
      console.log("response", response.data); 
      setuser(response.data);
      toast.success(response?.data?.message);
      if(response?.data?.success){
        console.log(response)
         dispatch(setUser(response.data.user))
      }
      onClose()
    } catch (error) {
      //console.log(error)
      toast.error(error?.message);
    }
  };
  //console.log(user.profile_pic)
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0  bg-gray-700 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-4 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit Profile Details </p>
        <form action="" className="grid gap-3 mt-3" onSubmit={changeOnSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={user.name}
              className="w-full py-1 px-2 focus:outline-primary border-0.5"
            />
          </div>
          <div>
            <div>Photo</div>
            <div className="my-1 flex items-center gap-4">
              <Avatar width={40} height={40} imageUrl={user.profile_pic} />
              <label htmlFor="profile_pic">
                <button className="font-semibold" onClick={changePhoto}>
                  Change Photo
                </button>
                <input
                  type="file"
                  className="hidden"
                  onChange={handlePhotoChange}
                  ref={changePhotoRef}
                />
              </label>
            </div>
          </div>
          <Divider />
          <div className="flex gap-2 w-fit ml-auto">
            <button
              className="border-primary text-primary border px-4 py-1 rounded hover:bg-primary hover:text-white"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="border-primary bg-primary text-white border px-4 py-1 rounded hover:bg-secondary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(EditUserDetails);
