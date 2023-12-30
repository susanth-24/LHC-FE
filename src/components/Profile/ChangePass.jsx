import React from 'react'
import { IoKeyOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const ChangePass = () => {
  return (
    <div className="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full h-full p-4">
     
     <div className="mb-auto flex flex-col items-center justify-center">
        <div className="mt-2 flex items-center justify-center rounded-full bg-lightPrimary p-[26px] text-5xl font-bold text-brand-500 ">
          <IoKeyOutline />
        </div>
        <h4 className="mb-px text-center mt-[55px] text-2xl font-bold text-navy-700 ">
        Change Password 
        </h4>
        <p className="px-5 text-center text-base font-normal text-gray-600 md:!px-0 xl:!px-8">
            It is recommended to change your passoword once you have received your details.
        </p>
        </div>
        <Link to="/changePassword" className="linear mt-4 flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 ">
        <button
          type="button"
          
        >
          Change It Now
        </button>
        </Link>
        
    </div>
  )
}

export default ChangePass
