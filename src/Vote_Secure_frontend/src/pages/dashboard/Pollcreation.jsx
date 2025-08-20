import React, { useState } from 'react';
import Nav2 from '../../components/dashboard/Nav2';
import { Input, DatePicker, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { backendActorPromise } from "../../utils/backend";


const { TextArea } = Input;

const Pollcreation = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);
  const [positions, setPositions] = useState(['']);

  const addPositionInput = () => {
    setPositions([...positions, '']);
  };

  const handlePositionChange = (index, event) => {
    const newPositions = [...positions];
    newPositions[index] = event.target.value;
    setPositions(newPositions);
  };

  const onChangeDate = (date, dateString) => {
    setDate(dateString);
  };

  const handleSubmit = async () => {
  try {
    // If backendActorPromise is a promise, await it first
    const backendActor = await backendActorPromise;

    // Example values — replace with your form states
    const date = selectedDate;        // e.g., "2025-08-15"
    const adminName = currentAdmin;   // e.g., "john"
    const adminPass = adminPassword;  // e.g., "1234"
    const title = pollTitle;          // e.g., "Presidential Election"
    const desc = pollDescription;     // e.g., "Vote for your candidate"
    const pollList = polls;           // must be [(Text, [(Text, Text, Text)])]

    // Call backend function
    const [status, message] = await backendActor.createNewElection(
      date,
      adminName,
      adminPass,
      title,
      desc,
      pollList
    );

    if (status === "Fail") {
      console.error("Error:", message);
      alert(`Failed: ${message}`);
    } else {
      console.log("Election created:", message);
      alert("Election created successfully!");
    }
  } catch (error) {
    console.error("Error creating election:", error);
    alert("An error occurred while creating the election.");
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

        <div className='bg-footer_t flex-1 lg:w-5/6 w-full rounded-lg py-24 px-5 lg:px-24 flex flex-col gap-5'>
          <div className='flex flex-col gap-3'>
            <p className='text-white'>Title</p>
            <Input
              className='bg-slate-600 bg-opacity-50 focus:bg-opacity-70 focus:ring-2 hover:ring-2 placeholder-slate-500 text-white hover:bg-slate-600 focus:bg-slate-600 border-0'
              placeholder='Please Enter your Title...'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-3'>
            <p className='text-white'>Description</p>
            <TextArea
              className='bg-slate-600 bg-opacity-50 focus:bg-opacity-70 focus:ring-2 hover:ring-2 text-white hover:bg-slate-600 placeholder-slate-500 focus:bg-slate-600 border-0'
              rows={7}
              placeholder='Please Enter your Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className='flex gap-2 py-5'>
            <div className='flex flex-col gap-3 w-2/4'>
              <p className='text-white'>Date</p>
              <DatePicker
                className='bg-slate-600 bg-opacity-50 focus:bg-opacity-70 focus:ring-2 hover:ring-2 text-white hover:bg-slate-600 placeholder-slate-500 focus:bg-slate-600 border-0'
                onChange={onChangeDate}
              />
            </div>
            <div className='w-1/4'></div>
            <div></div>
          </div>

          <div className='flex flex-col w-full gap-5 py-5'>
            {positions.map((position, index) => (
              <Input
                key={index}
                className='bg-slate-600 bg-opacity-50 focus:bg-opacity-70 focus:ring-2 hover:ring-2 placeholder-slate-500 text-white hover:bg-slate-600 focus:bg-slate-600 border-0'
                placeholder={`Please Enter Position ${index + 1}`}
                value={position}
                onChange={(event) => handlePositionChange(index, event)}
              />
            ))}

            <a
              className='text-right w-full text-sm cursor-pointer text-white'
              onClick={addPositionInput}
            >
              + Add more positions
            </a>

            <Button
              className='my-7 w-1/3 lg:w-1/6'
              size='large'
              type='primary'
              onClick={handleSubmit}
            >
              Proceed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pollcreation;
