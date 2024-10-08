import React from 'react';
import { Button, Dropdown, Space } from 'antd';
import Sidebar from '../../components/dashboard/Sidebar';
import Searchbar from '../../components/dashboard/Searchbar';
import abstract from '/assets/Abstract.png';
import profilepic from '/assets/ProfilePic.png';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';

const items = [
    {
        label: <a href="https://www.antgroup.com">1st menu item</a>,
        key: '0',
    },
    {
        label: <a href="https://www.aliyun.com">2nd menu item</a>,
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: '3rd menu item',
        key: '3',
    },
];

const Dashboard = () => {
    return (
        <main className='bg-main_bg_color container-r flex pb-9'>
            <div className='w-1/5 lg:w-1/6 sm:w-1/6'>
                <Sidebar />
            </div>

            {/* Flex container to handle proper layout */}
            <div className='flex-1 flex flex-col gap-10'>
                {/* First Section (Searchbar and Profile) */}
                <div className='px-5 py-3 m-3 flex flex-col lg:flex-row gap-3 '>
                    <div className='w-full lg:w-4/5 flex flex-col gap-3'>
                        <Searchbar />
                        <div className='flex justify-between'>
                            <Link to='/pollcreation' className='lg:w-1/6 w-1/3 '>
                                <Button className='text-[9px] w-full lg:text-base' type='primary'>
                                    Create poll
                                </Button>                     
                            </Link>
                           
                            <div className='px-3'>
                                <img src="" alt="" />
                                <div className='dropdown-container'>
                                    <Dropdown menu={{ items }} trigger={['click']}>
                                        <p className='text-white rounded-lg dropdown-trigger' onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                Created
                                            </Space>
                                        </p>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Section */}
                    <div className='w-full lg:w-1/5 rounded-lg justify-center shadow-inner sm:text-xl lg:text-base main-hero-bg p-2 gap-5 flex flex-col items-center'>
                        <p className='text-white font-medium'>Profile</p>
                        <img className='w-1/3' src={profilepic} alt="" />
                        <div className='text-white text-opacity-40'>
                            <div className='flex gap-2'>
                                <p>Name: </p>
                                <p>David Kehinde</p>
                            </div>
                            <div className='flex gap-2'>
                                <p>Current Plan: </p>
                                <button className='ring-2 px-2 rounded-lg ring-blue-800'>free</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Poll Table */}
                <div className='px-5 py-3 mx-5 my-5 h-full rounded-lg flex-1 bg-footer_t flex flex-col'>
                    <p className='text-white text-opacity-40'>Polls Created</p>
                    <div className='text-white lg:text-sm px-1 py-4'>
                        <p>Mechanical engineering  departmental election</p>

                        <Divider style={{borderColor: '#002066',}}></Divider>
                    </div>
                    <div className='flex-1 flex flex-col justify-center items-center'>
                        <img className='w-40' src={abstract} alt="" />
                        <p className='text-white text-opacity-40'>You haven't created any polls yet</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
