import React, { useState } from 'react';
import Nav2 from '../../components/dashboard/Nav2';
import { Input, DatePicker, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom'; // For navigation

const { TextArea } = Input;

const Pollcreation = () => {
  const navigate = useNavigate(); // Hook for navigation

  // State to store form values
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);
  const [positions, setPositions] = useState(['']); // Initial state with one empty input

  // Function to add more input fields
  const addPositionInput = () => {
    setPositions([...positions, '']); // Add another empty input
  };

  // Function to handle input change for positions
  const handlePositionChange = (index, event) => {
    const newPositions = [...positions];
    newPositions[index] = event.target.value;
    setPositions(newPositions);
  };

  // Function to handle date change
  const onChangeDate = (date, dateString) => {
    setDate(dateString);
  };

// Function to handle form submission
const handleSubmit = () => {
  if (!title || !description || !date || positions.some((pos) => !pos)) {
    message.error('Please fill in all the fields.');
    return;
  }

  // Navigate to the next page with just the positions
  navigate('/addcandidates', { state: { positions } }); // Only send positions
};

  return (
    <div className='bg-main_bg_color container-r flex flex-col pb-9'>
      {/* Nav bar */}
      <div>
        <Nav2 />
      </div>

      {/* Main Div for forms */}
      <div className='flex items-center flex-1 flex-col gap-4 m-4'>
        <div className='flex flex-col items-center gap-3'>
          <h1 className='text-xl text-white font-bold'>Create your Poll</h1>
          <p className='text-center text-sm text-white text-opacity-40'>
            Set up polls effortlessly on VoteSecure, with blockchain ensuring
            every vote is protected. Customize <br /> options, track real-time
            results, and guarantee transparent, tamper-proof outcomes.
          </p>
        </div>

        {/* Poll content */}
        <div className='bg-footer_t flex-1 w-5/6 rounded-lg py-24 px-24 flex flex-col gap-5'>
          <div className='flex flex-col gap-3'>
            <p className='text-white'>Title</p>
            <Input
              className='bg-slate-600 bg-opacity-50 focus:bg-opacity-70 focus:ring-2 hover:ring-2 placeholder-slate-500 text-white hover:bg-slate-600 focus:bg-slate-600 border-0'
              placeholder='Please Enter your Title...'
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Set title state
            />
          </div>

          <div className='flex flex-col gap-3'>
            <p className='text-white'>Description</p>
            <TextArea
              className='bg-slate-600 bg-opacity-50 focus:bg-opacity-70 focus:ring-2 hover:ring-2 text-white hover:bg-slate-600 placeholder-slate-500 focus:bg-slate-600 border-0'
              rows={7}
              placeholder='Please Enter your Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Set description state
            />
          </div>

          <div className='flex gap-2 py-5'>
            <div className='flex flex-col gap-3 w-2/4'>
              <p className='text-white'>Date</p>
              <DatePicker
                className='bg-slate-600 bg-opacity-50 focus:bg-opacity-70 focus:ring-2 hover:ring-2 text-white hover:bg-slate-600 placeholder-slate-500 focus:bg-slate-600 border-0'
                onChange={onChangeDate} // Set date state
              />
            </div>
            <div className='w-1/4'></div>
            <div></div>
          </div>

          {/* Dynamic Input List for Positions */}
          <div className='flex flex-col w-full gap-5 py-5'>
            {positions.map((position, index) => (
              <Input
                key={index}
                className='bg-slate-600 bg-opacity-50 focus:bg-opacity-70 focus:ring-2 hover:ring-2 placeholder-slate-500 text-white hover:bg-slate-600 focus:bg-slate-600 border-0'
                placeholder={`Please Enter Position ${index + 1}`}
                value={position}
                onChange={(event) => handlePositionChange(index, event)} // Set position state
              />
            ))}

            <a
              className='text-right w-full text-sm cursor-pointer text-white'
              onClick={addPositionInput}
            >
              + Add more positions
            </a>

            <Button
              className='my-7 w-1/6'
              size='large'
              type='primary'
              onClick={handleSubmit} // Handle form submission
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
