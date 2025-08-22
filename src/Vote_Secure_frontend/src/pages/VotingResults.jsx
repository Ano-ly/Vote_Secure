import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/Favicon.webp";
import Biometric from "../../public/assets/Biometric.png";
import Thumbs from "../../public/assets/Thumbs.svg"
import { Button, message } from "antd";




function VotingResults() {
  return (
    <div className="bg-main_bg_color flex flex-col items-center justify-center py-14 px-4 h-full">
      <div className="w-10/12 flex flex-col">
              {/* Header */}
              <div className="flex flex-col items-center text-white text-center mb-6 relative w-full">
                <div className="absolute left-0 bottom-100 md:left-0 md:top-0 flex items-center font-bold gap-2">
                  <img src={logo} alt="" className="w-6" />
                  <p className="text-white">
                    Vote<span className="text-primary_blue">Secure</span>
                  </p>
                </div>
                <img src={Biometric} alt="" className="w-9 sm:w-11 mb-3" />
                <h1 className="text-3xl font-bold mb-2">Voted Sucessfully</h1>
                <div className="vpage  w-full py-6 px-2 mt-10 sm:px-10">
                    <div className='w-full'>
                        <img src={Thumbs} alt="" />
                    </div>
                </div>
                 <div className="w-1/6">
                 <Link  to={"/"}>
                    <Button
                                className="my-7 w-full"
                                size="large"
                                type="primary"
                                
                            >
                                 Return home
                    </Button>
                 </Link>
                              </div>
              </div>
              
        </div>
    </div>
  )
}

export default VotingResults
