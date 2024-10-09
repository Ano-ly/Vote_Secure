import React from 'react';
import Biometric from '/assets/Biometric.webp';
import home from '/assets/Home.png';
import management from '/assets/Management.png';
import results from '/assets/Results.png';
import helpcenter from '/assets/Helpcenter.png';
import guides from '/assets/Guides.png';
import FAQs from '/assets/FAQS.png';
import settings from '/assets/Settings.png';
import logout from '/assets/Logout.png';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='flex flex-col rounded-lg justify-between w-full h-full py-2 my-5 p-5 lg:p-4 mx-3 bg-footer_t'>
      {/* Header section */}
      <div className='flex-1 flex flex-col gap-10'>
        {/* Biometric Icon and Title */}
        <div className='block lg:flex items-center gap-2'>
          <img className='sm:w-8 w-6' src={Biometric} alt="Biometric Icon" />
          <div className='block lg:flex'>
            <h2 className='md:text-2xl sm:text-sm text-xs font-bold text-white'>
              <span className='text-blue-800'>Vote</span>
            </h2>
            <p className='md:text-2xl sm:text-sm text-xs font-bold text-white'>Secure</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className='flex flex-col gap-4'>
          <button className='flex items-center hover:bg-main_bg_color p-2 focus:bg-main_bg_color rounded-lg gap-3'>
            <img className='sm:w-6 w-5' src={home} alt="Home Icon" />
            <p className='lg:flex text-white text-opacity-40 hidden text-sm'>Home</p>
          </button>

          <Link to={'/votingm1'}>
          <button className='flex items-center hover:bg-main_bg_color p-2 focus:bg-main_bg_color rounded-lg gap-3'>
            <img className='sm:w-6 w-5' src={management} alt="Management Icon" />
            <p className='lg:flex hidden text-sm text-white text-opacity-40'>Management</p>
          </button>
          </Link>
          
          <button className='flex items-center hover:bg-main_bg_color p-2 focus:bg-main_bg_color rounded-lg gap-3'>
            <img className='sm:w-6 w-5' src={results} alt="Results Icon" />
            <p className='lg:flex hidden text-sm text-white text-opacity-40'>Results</p>
          </button>
        </div>
      </div>

      {/* Bottom section */}
      <div className='flex flex-col gap-4 text-white text-opacity-40'>
        <button className='flex items-center hover:bg-main_bg_color p-2 focus:bg-main_bg_color rounded-lg gap-3'>
          <img className='sm:w-6 w-5' src={helpcenter} alt="Help Center Icon" />
          <p className='lg:flex hidden text-sm'>Help Center</p>
        </button>
        <button className='flex items-center hover:bg-main_bg_color p-2 focus:bg-main_bg_color rounded-lg gap-3'>
          <img className='sm:w-6 w-5' src={guides} alt="Guides Icon" />
          <p className='lg:flex hidden text-sm'>Guides</p>
        </button>
        <button className='flex items-center hover:bg-main_bg_color p-2 focus:bg-main_bg_color rounded-lg gap-3'>
          <img className='sm:w-6 w-5' src={FAQs} alt="FAQs Icon" />
          <p className='lg:flex hidden text-sm'>FAQs</p>
        </button>
        <button className='flex items-center hover:bg-main_bg_color p-2 focus:bg-main_bg_color rounded-lg gap-3'>
          <img className='sm:w-6 w-5' src={settings} alt="Settings Icon" />
          <p className='lg:flex hidden text-sm'>Settings</p>
        </button>
        <Link to={'/'} 
        className='flex items-center hover:bg-main_bg_color p-2 focus:bg-main_bg_color rounded-lg gap-3'>
        
          <img className='sm:w-6 w-5' src={logout} alt="Logout Icon" />
          <p className='lg:flex hidden text-white text-opacity-40 text-sm'>Logout</p>

        </Link>
        
      </div>
    </div>
  );
};

export default Sidebar;
