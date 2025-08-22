import React, { useState } from 'react';
import Nav2 from '../../components/dashboard/Nav2';
import { Input, DatePicker, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

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

  const handleSubmit = () => {
    try {
      // pollList = each position + empty candidate list
      const pollList = positions.map((pos) => [pos, []]);

      const adminName = localStorage.getItem("username") || "admin";

      // ✅ Store election data in localStorage instead of API
      const electionData = {
        title,
        description,
        date,
        positions,
        pollList,
        adminName,
      };

      localStorage.setItem("currentElection", JSON.stringify(electionData));

      alert("Election saved locally!");
      navigate("/Addcandidates");
    } catch (error) {
      console.error("Error saving election:", error);
      alert("An error occurred while saving the election.");
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
            every vote is protected.
          </p>
        </div>

        <div className='bg-footer_t flex-1 lg:w-5/6 w-full rounded-lg py-24 px-5 lg:px-24 flex flex-col gap-5'>
          <div className='flex flex-col gap-3'>
            <p className='text-white'>Title</p>
            <Input
              placeholder='Please Enter your Title...'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-3'>
            <p className='text-white'>Description</p>
            <TextArea
              rows={7}
              placeholder='Please Enter your Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className='flex gap-2 py-5'>
            <div className='flex flex-col gap-3 w-2/4'>
              <p className='text-white'>Date</p>
              <DatePicker onChange={onChangeDate} />
            </div>
          </div>

          <div className='flex flex-col w-full gap-5 py-5'>
            {positions.map((position, index) => (
              <Input
                key={index}
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
