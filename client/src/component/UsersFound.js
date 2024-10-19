import React from "react";
import Avatar from "./Avatar";
function UsersFound({ user }) {
  // console.log(user)
  return (
    <div className="flex m-2">
      <div>
        <Avatar
          width={50}
          imageUrl={user.profile_pic}
          height={50}
          name={user.name}
        />
      </div>
      <div className="px-2">
        <div className="font-semibold">
          {user?.name}
        </div>
        <p className="text-sm">{user?.email}</p>
      </div>
    </div>
  );
}

export default UsersFound;
