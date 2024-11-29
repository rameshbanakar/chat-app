import React, { useEffect, useState } from "react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import EditUserDetails from "./EditUserDetails";
import Divider from "./Divider";
import { MdOutlineArrowOutward } from "react-icons/md";
import UserSearch from "./UserSearch";
import { FaImage } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
const SideBar = () => {
  const socketConnection = useSelector((state) => state.user.socketConnection);

  const user = useSelector((state) => state.user);
  const [editUserDetails, setEditUserDetails] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [openSearchUser, setOpenSearchUser] = useState(false);

  useEffect(() => {
    if (socketConnection) {
      // console.log(user);
      socketConnection.emit("sidebar", user?._id);

      socketConnection.on("conversation", (data) => {
        const conversationUserData = data.map((conversationUser, index) => {
          if (
            conversationUser?.sender?._id === conversationUser?.receiver?._id
          ) {
            return {
              ...conversationUser,
              userDetails: conversationUser.sender,
            };
          } else if (
            conversationUser?.sender?._id !== conversationUser?.receiver?._id
          ) {
            return {
              ...conversationUser,
              userDetails: conversationUser.receiver,
            };
          } else {
            return {
              ...conversationUser,
              userDetails: conversationUser.sender,
            };
          }
        });

        setAllUsers(conversationUserData);
      });
    }
  }, [socketConnection, user]);

  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 flex flex-col justify-between">
        <div>
          <NavLink
            className={(isActive) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${
                isActive && "bg-slate-300"
              }`
            }
            title="Chat"
          >
            <IoChatbubbleEllipsesSharp size={20} />
          </NavLink>
          <div
            className={`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded `}
            title="Add User"
            onClick={() => setOpenSearchUser(true)}
          >
            <FaUserPlus size={20} />
          </div>
        </div>

        <div>
          <button
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded -ml-1"
            title={user.name}
            onClick={() => setEditUserDetails(true)}
          >
            <Avatar
              width={30}
              name={user.name}
              height={30}
              imageUrl={user.profile_pic}
              email={user.email}
              userId={user?._id}
            />
          </button>
          <button
            title="Logout"
            className={`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded `}
          >
            <span className="-ml-1">
              <IoLogOut size={20} />
            </span>
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="h-16 text-center">
          <h2 className="text-xl font-bold p-4 text-slate-800 ">Messages</h2>
        </div>

        <div className="bg-slate-200 p-[.5px]"></div>
        <div className=" h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
          {allUsers.length === 0 && (
            <div className="mt-12">
              <div className="flex justify-center items-center my-4 text-slate-500">
                <MdOutlineArrowOutward size={50} />
              </div>
              <p className="text-lg text-center text-slate-400">
                Explore users to start a conversation with.
              </p>
            </div>
          )}
          {allUsers?.map((conv, index) => {
            return (
              <div key={conv?._id} className="flex items-center gap-2 p-2">
                <div>
                  <Avatar
                    imageUrl={conv?.userDetails?.profile_pic}
                    name={conv?.userDetails?.name}
                    height={40}
                    width={40}
                  />
                </div>
                <div>
                  <h3 className="text-ellipsis line-clamp-1 font-semibold text-sm">
                    {conv?.userDetails?.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    {conv?.lastMsg?.imageURL && (
                      <div className="flex items-center gap-1">
                        <span>
                          <FaImage />
                        </span>
                        {!conv?.lastMsg?.text && <span>Image</span>}
                      </div>
                    )}
                    {conv?.lastMsg?.videoURL && (
                      <div className="flex items-center gap-1">
                        <span>
                          <FaVideo />
                        </span>
                        {!conv?.lastMsg?.text && <span>Video</span>}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">
                    {conv?.lastMsg?.text}
                  </p>
                </div>
                <p>{conv?.unseenMsg}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/*Edit user details page here */}
      {editUserDetails && (
        <EditUserDetails
          onClose={() => setEditUserDetails(false)}
          data={user}
        />
      )}
      {/* search user */}
      {openSearchUser && (
        <UserSearch
          onClose={() => {
            setOpenSearchUser(false);
          }}
        />
      )}
    </div>
  );
};

export default SideBar;
