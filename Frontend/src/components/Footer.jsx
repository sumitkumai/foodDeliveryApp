import React from "react";
import { FaInstagram, FaFacebook } from 'react-icons/fa'; 

const Footer = () => {
  return (

    <div className="text-gray-500 p-3 space-y-3">
      <hr className="border-gray-400"/>
      <p className="text-xs text-center lg:text-sm">
        By continuing past this page, you agree to our Terms of Service, Cookie
        Policy, Privacy Policy and Content Policies. All trademarks are
        properties of their respective owners. 2008-2024 © GoFood™ Ltd. All
        rights reserved.
      </p>
      <div className="flex justify-center items-center space-x-3">
        <p className="text-xs font-medium lg:text-sm">Follow Us On : </p>
        <a href=""><FaInstagram/></a>
        <a href=""><FaFacebook/></a>
      </div>
    </div>
  );
};

export default Footer;
