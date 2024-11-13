import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

  const[credential,setcredential] = useState({name:"",email:"",password:""})
  const navigate = useNavigate();

  const handlerSubmit = async(e)=>{
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/createuser",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name:credential.name, email:credential.email, password:credential.password})
    });

    setcredential({name:"",email:"",password:""})
    const json = await response.json();
    if(json.success){
      localStorage.setItem("userEmail",credential.email);
      localStorage.setItem("authToken",json.authToken);
      navigate("/");
    } else{
      toast.error(json.message);
    }
  }

  const onChange=(event)=>{
    setcredential({...credential,[event.target.name]:event.target.value})
  }

  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <ToastContainer/>
      <form onSubmit={handlerSubmit} className="space-y-5 mb-4">
        <div className="p-8 rounded-lg space-y-8 shadow-xl">
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Name"
              value={credential.name}
              onChange={onChange}
              className="ml-1 outline-none border border-gray-400 pl-1 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              value={credential.email}
              onChange={onChange}
              className="ml-1 outline-none border border-gray-400 pl-1 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              value={credential.password}
              onChange={onChange}
              className="ml-1 outline-none border border-gray-400 pl-1 rounded-md"
            />
          </div>
        </div>

        <button type="submit" className="bg-green-500 w-full p-1 rounded-md text-white font-bold active:scale-105">Sign Up</button>
      </form>

      <span>Already have an account? <Link to="/login" className="text-blue-600">Log In</Link></span> 
    </div>
  );
};

export default Signup;
