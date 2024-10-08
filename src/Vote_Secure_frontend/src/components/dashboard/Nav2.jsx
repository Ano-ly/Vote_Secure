import React from 'react';
import Searchbar from './Searchbar';
import Biometric from '/assets/Biometric.webp';
import profilepic from '/assets/ProfilePic.png';
const Nav2 = () => {
  return (
    <div className='w-full flex justify-between items-center gap-3 px-4 py-3'>
      <div className='bg-footer_t w-1/6 flex items-center justify-center rounded-3xl gap-2 py-3 px-3'>
        <img className='sm:w-4 w-2' src={Biometric} alt="Biometric Icon" />
        <div className='lg:flex block'>
            <h2 className='lg:text-xl text-sm font-bold text-white'>
              <span className='text-blue-800'>Vote</span>
            </h2>
            <p className='lg:text-xl text-sm font-bold text-white'>Secure</p>
        </div>
      </div>
      <div className='w-4/6'>
        <Searchbar/>
      </div>
      
      <div className='main-hero-bg shadow-inner p-1 flex justify-start items-start rounded-3xl w-1/6'>
        <div className='lg:w-1/3 w-full'>
            <img className='lg:w-2/3 w-full ' src={profilepic} alt="" />
        </div>
        <div className='w-2/3 hidden lg:flex flex-col justify-start'>
            <p className='text-white text-opacity-40'>David Kehinde</p>
            <button className='ring-2 px-2 rounded-lg w-1/2 text-left text-blue-800 ring-blue-800'>free</button>
        </div>
      </div>
    </div>
  );
};

export default Nav2;