import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoFastFoodOutline } from "react-icons/io5";
import { BsCart4 } from "react-icons/bs";

const Navbar = () => {

  const navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate("/");
  }

  return (
    <div className="h-12 flex justify-between items-center bg-green-600 text-white pl-4 pr-4 font-medium text-sm md:text-base sticky top-0 z-10">
      <div className="flex items-center space-x-5">
        <div className="flex justify-center items-center space-x-2">
          <h1 className="inline text-xl italic md:text-2xl">GoFood</h1>
          <span>
            <IoFastFoodOutline />
          </span>
        </div>
        <div className="space-x-3">
          <Link to="/" className="hover:underline underline-offset-4">Home</Link>
          {
            (localStorage.getItem("authToken"))? <Link to="/myorder" className="hover:underline underline-offset-4">My Order</Link> : ""
          }
        </div>
      </div>

      <div>
        {
          (!localStorage.getItem("authToken")) ? <Link to="/login" className="hover:underline underline-offset-4 bg-white text-green-500 p-1 rounded-sm">Login</Link>
          : <div className="flex items-center">
              <button className="mr-4 text-lg"><Link to="/cart"><BsCart4 /></Link></button>
              <button className="hover:underline underline-offset-4 bg-white text-green-500 p-1 rounded-sm" onClick={handleLogout}>Logout</button>
            </div>
        }
      </div>
    </div>
  );
};

export default Navbar;