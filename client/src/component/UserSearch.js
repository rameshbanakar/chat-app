import React from 'react'
import { CgSearch } from "react-icons/cg";
function UserSearch() {
  return (
    <div className="fixed left-0 right-0 top-0 bottom-0">
      <div className="w-full max-w-md mx-auto mt-10">
        {/* input user search */}
        <div className="bg-white rounded h-14 flex">
          <input
            type="text"
            placeholder="Search users by name,email....."
            className="w-full outline-none py-1 h-full px-2"
          />
          <div className='w-14 h-14 flex justify-center items-center'>
         
            <CgSearch size={25}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSearch