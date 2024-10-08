import React from 'react';
import notification from '/assets/Notification.png';
import { Input } from 'antd';
import { Button } from 'antd';

const Searchbar = () => {
  return (
    <div className='bg-footer_t flex gap-3 w-full justify-between rounded-3xl p-3'>
      <Input className='w-full rounded-3xl text-white bg-main_bg_color ring-0 hover:bg-slate-500 focus:bg-main_bg_color placeholder:text-white placeholder:text-opacity-40  lg:w-2/4 min-w-[100px]' placeholder="Search..." />
      <div className='hidden lg:w-1/4  gap-4 text-white text-base text-opacity-40 lg:flex'> {/* Allow text items to wrap */}
        <p>Pricing</p>
        <p>Demo</p>
      </div>
      <button className=''>
        <img src={notification} alt="Notification Icon" />
      </button>
    </div>
  );
};

export default Searchbar;
