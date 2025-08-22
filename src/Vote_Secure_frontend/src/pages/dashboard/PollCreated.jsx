import React from 'react'
import { useNavigate } from 'react-router-dom';
import Nav2 from '../../components/dashboard/Nav2';
import { message, Spin, Button, Input } from 'antd';
import { Link,} from "react-router-dom";

function PollCreated() {
  
    const electionId = localStorage.getItem("electionId");
  // ✅ Get registered voters from localStorage
  const voters = JSON.parse(localStorage.getItem("registeredVoters")) || [];

  return (
    <div className='bg-main_bg_color container-r flex flex-col pb-9'>
      <div>
        <Nav2 />
      </div>

      <div className="flex flex-col items-center gap-4 m-4">
        <h1 className="text-xl text-white font-bold">Poll Created Successfully</h1>
        <p className="text-white text-opacity-40 text-sm">
          Here are the registered voters for this election:
        </p>

        <div className="bg-footer_t w-full lg:w-5/6 rounded-lg py-6 px-4 lg:px-10">
          {voters.length === 0 ? (
            <p className="text-white text-opacity-40 text-sm">No voters registered.</p>
          ) : (
            <ul className="text-white text-sm list-disc pl-6">
              {voters.map((v, i) => (
                <li key={i}>
                  {v.email} — <span className="text-green-400">ID: {v.voterId}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className='flex gap-3 w-full lg:w-5/6 rounded-lg py-6 px-4 lg:px-10'>
             <p className='text-white text-opacity-40 text-sm'>
                 Election ID: <span className="font-bold text-white">{electionId}</span>
             </p>
         </div>

         <div className='w-1/5'>
                  <Link to={'/dashboard'} className='w-full'>
                    <Button className='my-7 w-full' size='large' type='primary'>
                      Done
                    </Button>
                  </Link>
                </div>
      </div>
    </div>
  )
}

export default PollCreated
