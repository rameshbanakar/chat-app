import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
function Avatar({userId, name, email, imageUrl, width, height }) {
  const onlineUser=useSelector((state) => state.user.onlineUser);
  let avatarName = "";
  if (name) {
    const splitName = name?.split(" ");
    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }
  const bg_color=[
    'bg-slate-200',
    'bg-teal-200',
     'bg-red-2000',
     'bg-green-200',
     'bg-yellow-200'
  ]
  const randomNumber=Math.floor(Math.random()*5)
  const isOnline = onlineUser.includes(userId);
  return (
    <div
      className={`text-slate-800  rounded-full font-bold relative ${bg_color[randomNumber]} relative`}
      style={{ width: width + "px", height: height + "px" }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          width={width}
          height={height}
          className=" rounded-full overflow-hidden"
        />
      ) : name ? (
        <div
          className="overflow-hidden rounded-full flex justify-center items-center"
          style={{ width: width + "px", height: height + "px" }}
        >
          {avatarName}
        </div>
      ) : (
        <div
          className={`text-slate-800 overflow-hidden rounded-full shadow border text-xl font-bold ${bg_color[randomNumber]}`}
        >
          <FaUserCircle size={width} />
        </div>
      )}
      {isOnline && (
        <div className="bg-green-600 p-1 absolute bottom-2 -right-1 z-10 rounded-full"></div>
      )}
    </div>
  );
}

export default Avatar;  


