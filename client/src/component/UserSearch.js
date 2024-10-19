import React, { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import Spinner from "./Spinner";
import UsersFound from "./UsersFound";
import toast from "react-hot-toast";
import axios from "axios";
function UserSearch() {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // const handleSearchUser=async()=>{
  //    try {
  //       setLoading(true)
  //       const data = await axios.get(
  //         `${process.env.REACT_APP_BACKEND_URL}/api/search-user`,
  //       );
  //       console.log("data",data)
  //    } catch (error) {
  //     toast.error(error.reponse.data.message)
  //    }
  // }
  useEffect(() => {
    const hanldeSerachUsers = async () => {
      try {
        setLoading(true);
        const repsonse = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/search-user`,
          { search: searchValue }
        );
        setSearchUser(repsonse.data.data);
      } catch (error) {
        toast.error(error?.reponse?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    hanldeSerachUsers();
  }, [searchValue]);

  const searchValeChange = (e) => {
    setSearchValue(e.target.value);
    // console.log(searchValue);
  };
  console.log("searchUser", searchUser);
  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 bg-slate-700 bg-opacity-40 p-2">
      <div className="w-full max-w-lg mx-auto mt-10">
        {/* input user search */}
        <div className="bg-white rounded h-14 flex">
          <input
            type="text"
            placeholder="Search users by name,email....."
            className="w-full outline-none py-1 h-full px-2"
            value={searchValue}
            onChange={searchValeChange}
          />
          <div className="w-14 h-14 flex justify-center items-center">
            <CgSearch size={25} />
          </div>
        </div>

        {/* display search users */}
        <div className="bg-white mt-2 w-full p-4 rounded">
          {/* no user found */}
          {searchUser.length === 0 && !loading && (
            <p className="text-center text-slate-500">No user found!</p>
          )}
          {loading && (
            <p className="text-center">
              <Spinner />
            </p>
          )}

          {searchUser.length > 0 &&
            !loading &&
            searchUser.map((user, index) => <UsersFound key={user._id} user={user}/>)}
        </div>
      </div>
    </div>
  );
}

export default UserSearch;
