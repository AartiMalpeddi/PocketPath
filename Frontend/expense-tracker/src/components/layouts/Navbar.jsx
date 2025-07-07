// src/components/Navbar.jsx
import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { FaComments } from 'react-icons/fa';
import SideMenu from './SideMenu';

const Navbar = ({ activeMenu, onChatToggle }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex justify-between items-center bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <div className="flex items-center gap-5">
        <button
          className="block lg:hidden text-black"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
        </button>
        <h2 className="text-lg font-medium text-black">PocketPath</h2>
      </div>


      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
