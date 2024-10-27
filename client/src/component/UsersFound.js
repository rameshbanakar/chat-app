import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
function UsersFound({ user, onClose }) {
  // console.log(user)
  return (
    <Link
      to={"/" + user?._id}
      onClick={onClose}
      className="flex items-center gap-3 p-2 hover:border-2 hover:border-primary rounded cursor-pointer"
    >
      <div>
        <Avatar
          width={50}
          imageUrl={user.profile_pic}
          height={50}
          name={user.name}
          userId={user?._id}
        />
      </div>
      <div className="px-2">
        <div className="font-semibold text-ellipsis line-clamp-1">
          {user?.name}
        </div>
        <p className="text-sm text-ellipsis line-clamp-1">{user?.email}</p>
      </div>
    </Link>
  );
}

export default UsersFound;
