import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from "react-router-dom";
import { logout, setToken, setUser } from '../redux/UserSlice'

function Home() {
  const user=useSelector(state=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  console.log("redux user",user)
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
          if(response.data.logout){
            dispatch(logout())
            navigate("/email")
          }else{
             dispatch(setUser(response.data.user));
          }
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      
    };

    fetchUser(); // Call the async function
  }, []);
 
  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
        {/*message section */}
        <section className='bg-white'>
          sidebar
        </section>
        <section>
            <Outlet/>
        </section>
    </div>
  )
}

export default Home