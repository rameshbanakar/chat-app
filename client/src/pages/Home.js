import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout, setOnlineUser, setToken, setUser } from "../redux/UserSlice";
import SideBar from "../component/SideBar";
import logo from "../asset/assets/logo.png";
import io from "socket.io-client";

function Home() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("redux user", user);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      dispatch(setToken(token));

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const url = `${process.env.REACT_APP_BACKEND_URL}/api/getUser`;

      try {
        const response = await axios.post(url, { token: token }, config);
        console.log("response", response);
        if (response.data.logout) {
          dispatch(logout());
          navigate("/email");
        } else {
          dispatch(setUser(response.data.user));
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUser(); // Call the async function
  }, []);

  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
      auth: { token: localStorage.getItem("token") },
    });
    socketConnection.on("onlineUsers", (data) => {
      dispatch(setOnlineUser(data))
    });
    return ()=>{
      socketConnection.disconnect()
    }
  }, []);

  
  const basePath = location.pathname === "/";
  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <SideBar />
      </section>

      {/**message component**/}
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div
        className={`justify-center items-center flex-col gap-2 hidden ${
          !basePath ? "hidden" : "lg:flex"
        }`}
      >
        <div>
          <img src={logo} width={250} alt="logo" />
        </div>
        <p className="text-lg mt-2 text-slate-500">
          Select user to send message
        </p>
      </div>
    </div>
  );
}

export default Home;
