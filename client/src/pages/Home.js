import axios from 'axios'
import React from 'react'
import { Outlet } from 'react-router-dom'

function Home() {
  const fetchUserDetails=async()=>{
    const token=localStorage.getItem("token")
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/getUser`;
    const reponse = await axios.post(url, { token: token }, config);
    console.log("reponse", reponse);
    
  }
  fetchUserDetails()
  return (
    <div>Home
        {/*message section */}
        <section>
            <Outlet/>
        </section>
    </div>
  )
}

export default Home