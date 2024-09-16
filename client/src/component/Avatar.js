import React from "react";
import { FaUserCircle } from "react-icons/fa";
function Avatar({ name, email, imageUrl, width, height }) {
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
  
  return (
    <div
      className={`text-slate-800 overflow-hidden rounded-full shadow border text-xl font-bold ${bg_color[randomNumber]}`}
      style={{ width: width + "px", height: height + "px" }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          width={width}
          height={height}
          className="overflow-hidden rounded-full"
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
          <FaUserCircle size={80} />
        </div>
      )}
    </div>
  );
}

export default Avatar;
