import React from 'react'
import { HiX } from "react-icons/hi";
import Links from './Links';
import routes from '../../routes';
import routesone from '../../routesone';
import logo from '../../assets/iitrpr_logo.jpg';

const SidebarOne = ({open, onClose}) => {
  
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all  md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className="flex-wrap gap-1">
        <div>
          <div className={`mx-[56px] mt-[10px] flex items-center`}>

            <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700">
              LHB
            </div>

          </div>
          <img src={logo} alt="logo" className="w-11 h-11 mx-2 object-contain " />

          <div className={`mx-[56px] mt-[-20px] flex items-center`}>
            <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700">
              Portal
            </div>
          </div>
        </div>
      </div>
      <div class="mt-[58px] mb-7 h-px bg-gray-300 " />
 
      <ul className="mb-auto pt-1">
        <Links routes={routesone} />
      </ul>

      {/* Nav item end */}
    </div>
  )
}

export default SidebarOne
