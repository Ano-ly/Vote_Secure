import React, { useState } from 'react';
import Nav2 from '../../components/dashboard/Nav2';
import { message, Spin, Button, Input } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import biometric from '/assets/Biometric.webp';
import { backendActorPromise } from "../../utils/backend";  // ✅ add at top
const Csvupload = () => {
  const navigate = useNavigate();
  const electionId = localStorage.getItem("electionId");

  const [uploading, setUploading] = useState(false); 
  const [uploaded, setUploaded] = useState(false);   
  const [fileSubmitted, setFileSubmitted] = useState(true); 

  const [emails, setEmails] = useState([]); 
  const [newEmail, setNewEmail] = useState("");

  const handleAddEmail = () => {
    if (newEmail.trim() === "") {
      message.error("Email cannot be empty");
      return;
    }
    setEmails([...emails, newEmail.trim()]);
    setNewEmail("");
    message.success("Email added successfully");
  };

  const handleFileSubmit = async () => {
    if (!electionId) {
      message.error("Election ID not found");
      return;
    }
    if (emails.length === 0) {
      message.error("Please add at least one voter email");
      return;
    }

    try {
      setUploading(true);

      // ✅ Call backend registerVoters
    const backendActor = await backendActorPromise;
      const voterIds = await backendActor.registerVoters(emails, BigInt(electionId));
      // Build list of { email, voterId }
      const voterList = emails.map((email, i) => ({
        email,
        voterId: voterIds[i]?.toString() || null
      }));

      // Save locally for next page
      localStorage.setItem("registeredVoters", JSON.stringify(voterList));

      setUploading(false);
      setUploaded(true);
      message.success("Voters registered successfully");
    } catch (error) {
      console.error("Error registering voters:", error);
      setUploading(false);
      message.error("Failed to register voters");
    }
  };

  return (
    <div className='bg-main_bg_color container-r flex flex-col pb-9'>
      <div>
        <Nav2 />
      </div>

      <div className='flex items-center flex-1 flex-col gap-4 m-4'>
        <div className='flex flex-col items-center gap-3'>
          <h1 className='text-xl text-white font-bold'>Create your Poll</h1>
          <p className='text-center text-sm text-white text-opacity-40'>
            Set up polls effortlessly on VoteSecure, with blockchain ensuring
            every vote is protected. Customize <br /> options, track real-time
            results, and guarantee transparent, tamper-proof outcomes.
          </p>
        </div>

        {fileSubmitted && (
          <div className='bg-footer_t flex-1 w-full px-3 lg:w-5/6 rounded-lg py-10 lg:px-24 flex flex-col gap-5'>
            <p className='text-center text-white text-opacity-40 text-sm'>
              Add your Voter's email Address
            </p>

            <div className='flex gap-3 items-center'>
              <Input 
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter voter's email"
              />
              <Button type="primary" onClick={handleAddEmail}>
                Add
              </Button>
            </div>

            <ul className='text-white text-sm mt-3'>
              {emails.map((email, index) => (
                <li key={index}>{email}</li>
              ))}
            </ul>

            <div className='flex gap-3 w-1/2'>
              <Button
                className='my-7 w-1/2'
                size='large'
                type='primary'
                onClick={handleFileSubmit}
              >
                Sumbit
              </Button>
              <Button
                className='my-7 bg-opacity-10 w-1/2 lg:text-base text-xs'
                size='large'
                color='default'
                variant='outlined'
                ghost
              >
                Save as Draft
              </Button>
            </div>

            <div className='flex gap-3 w-1/2'>
              <p className='text-white text-opacity-40 text-sm'>
                Election ID: <span className="font-bold text-white">{electionId}</span>
              </p>
            </div>
             <p className='text-center text-white text-opacity-40 text-sm'>
              Csv Upload Coming Soon...❣️
            </p>

            {uploading && (
              <div className='w-full items-center p-10 rounded-3xl text-center justify-center flex flex-col gap-4 bg-dialogue_box'>
                <p className='text-white text-sm text-opacity-40'>
                  Please wait, the system is generating a unique <br /> ID for the Voters
                </p>
                <div className='w-1/2 items-center justify-center'>
                  <Spin size="large" />
                </div>
              </div>
            )}

            {uploaded && (
              <div className='w-full items-center p-10 rounded-3xl text-center justify-center flex flex-col gap-4 bg-dialogue_box'>
                <p className='text-white text-sm text-opacity-40'>
                  Successful, voters can now check their mail to <br /> vote
                </p>
                <div className='w-1/6 items-center justify-center'>
                  <img src={biometric} className='w-full' alt="biometric icon" />
                </div>
                <div className='w-1/4'>
                  <Link to={'/Pollcreated'} className='w-full'>
                    <Button className='my-7 w-full' size='large' type='primary'>
                      Done
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Csvupload;
