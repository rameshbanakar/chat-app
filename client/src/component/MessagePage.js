import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { HiDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoImageSharp } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Spinner from "./Spinner"
import uploadFile from "../helpers/UploadFiles";
const MessagePage = () => {
  const params = useParams();
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: "",
  });
  const [messageData, setMessageData] = useState({
    text: "",
    imageURL: "",
    videoURL: "",
  });
  const socketConnection = useSelector((state) => state.user.socketConnection);
  const user = useSelector((state) => state.user);
  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
  const [loading,setLoading]=useState(false)
  // console.log(params);
  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userId);
      socketConnection.on("message-user", (data) => {
        setDataUser(data);
        // console.log(data);
      });
    }
  }, [socketConnection, params, user]);

  const handleImageVideoUploadOpen = () => {
    setOpenImageVideoUpload((prev) => !prev);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setLoading(true)
    const uploadImage = await uploadFile(file);
    if(uploadImage.secure_url){
      setLoading(false)
    }
    // console.log("uploadImage", uploadImage.secure_url);
    setMessageData((prevData) => {
      return {
        ...prevData,
        imageURL: uploadImage?.secure_url,
      };
    });
  };

  const handleClearUploadImage=()=>{
    setMessageData((prevData) => {
      return {
        ...prevData,
        imageURL:"",
      };
    });
  }
  
  const handleClearUploadVideo=()=>{
    setMessageData((prevData) => {
      return {
        ...prevData,
        videoURL: "",
      };
    });
  }

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];
    setLoading(true)
    const uploadImage = await uploadFile(file);
    // console.log("uploadImage", uploadImage.secure_url);
    if (uploadImage?.secure_url){
      setLoading(false)
    }
      setMessageData((prevData) => {
        return {
          ...prevData,
          videoURL: uploadImage?.secure_url,
        };
      });
  };
  return (
    <div className="">
      <header className="sticky top-0 h-16 bg-white flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
          <Link className="lg:hidden" to={"/"}>
            <FaArrowLeft size={20} />
          </Link>
          <div className="my-2">
            <Avatar
              width={40}
              height={40}
              imageUrl={dataUser?.profile_pic}
              name={dataUser?.name}
              // userId={dataUser?._id}
            />
          </div>
          <div className="">
            <h3 className="font-semibold text-lg my-0 text-ellipsis line-clamp-1">
              {dataUser?.name}
            </h3>
            <p className=" -my-2 text-sm">
              {dataUser?.online ? (
                <span className="text-primary">Online</span>
              ) : (
                ""
              )}
            </p>
          </div>
        </div>
        <div>
          <button className="cursor-pointer hover:text-primary">
            <HiDotsVertical />
          </button>
        </div>
      </header>
      {/*show all messages here*/}
      <section className="h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative">
        {/* upload image display */}
        {messageData.imageURL && (
          <div className="h-full w-full bg-slate-700 bg-opacity-40 flex justify-center items-center rounded overflow-hidden">
            <div
              className="w-fit p-3 absolute top-0 right-0 cursor-pointer hover:text-primary"
              onClick={handleClearUploadImage}
            >
              <MdClose size={30} />
            </div>
            <div className="bg-white p-3">
              <img
                src={messageData?.imageURL}
                alt="image"
                height={300}
                width={300}
                className="aspect-square object-scale-down"
              />
            </div>
          </div>
        )}
        {/* uplaod video showing */}
        {messageData.videoURL && (
          <div className="h-full w-full bg-slate-700 bg-opacity-40 flex justify-center items-center rounded overflow-hidden">
            <div
              className="w-fit p-3 absolute top-0 right-0 cursor-pointer hover:text-primary"
              onClick={handleClearUploadVideo}
            >
              <MdClose size={30} />
            </div>
            <div className="bg-white p-3">
              <video
                src={messageData?.videoURL}
                controls
                muted
                autoPlay
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
              />
            </div>
          </div>
        )}

        {/* loading */}
        {loading && (
          <div className="w-full h-full flex sticky bottom-0 justify-center items-center">
            <Spinner />
          </div>
        )}
      </section>
      {/* send messages from */}
      <section className="bg-white h-16 flex items-center px-4">
        <div className="relative ">
          <button
            onClick={handleImageVideoUploadOpen}
            className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-primary hover:text-white"
          >
            <FaPlus size={20} />
          </button>
        </div>
        {/* video and images */}
        {openImageVideoUpload && (
          <div className="bg-white shadow rounded absolute bottom-16 w-36 p-2 ">
            <form>
              <label
                htmlFor="uploadImage"
                className="flex items-center p-2 gap-3 hover:bg-slate-200 text-primary cursor-pointer px-3"
              >
                <div>
                  <IoImageSharp size={18} />
                </div>
                <p>Images</p>
              </label>
              <label
                htmlFor="uploadVideo"
                className="flex items-center p-2 gap-3 hover:bg-slate-200 text-purple-400 cursor-pointer px-3"
              >
                <div>
                  <FaVideo size={18} />
                </div>
                <p>Video</p>
              </label>
              <input
                type="file"
                id="uploadImage"
                onChange={handleUploadImage}
                className="hidden"
              />
              <input
                type="file"
                id="uploadVideo"
                onChange={handleUploadVideo}
                className="hidden"
              />
            </form>
          </div>
        )}
      </section>
    </div>
  );
};
export default MessagePage;
