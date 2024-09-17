import React from "react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
const SideBar = () => {
    const user=useSelector(state=>state.user)
  return (
    <div className="w-full h-full">
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
          >
            <FaUserPlus size={20} />
          </div>
        </div>

        <div>
          <button className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded -ml-1">
            <Avatar
              width={30}
              name={user.name}
              height={30}
              imageUrl={user.profile_pic}
              email={user.email}
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
    </div>
  );
};

export default SideBar;
