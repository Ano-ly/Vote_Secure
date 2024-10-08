import React, { useState } from 'react';
import Nav2 from '../../components/dashboard/Nav2';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Spin, Button } from 'antd';
import { Link } from 'react-router-dom';
import biometric from '/assets/Biometric.webp';

const { Dragger } = Upload;

const Csvupload = () => {
  const [uploading, setUploading] = useState(false); // For showing the loading container
  const [uploaded, setUploaded] = useState(false);   // For showing the success container
  const [fileSubmitted, setFileSubmitted] = useState(true); // For showing/hiding the CSV upload container

  // Simulated file upload function for development
  const simulateUpload = (info) => {
    console.log("Simulating file upload...", info);
    setUploading(true);

    setTimeout(() => {
      message.success(`${info.name} file uploaded successfully.`);
      setUploading(false);  // Hide loading spinner
      setUploaded(true);    // Show success container
    }, 2000); // Simulating 2 seconds delay
  };

  // Upload props with logic to handle different stages
  const props = {
    name: 'file',
    multiple: true,
    action:
      process.env.NODE_ENV === 'production'
        ? 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload' // Real API
        : '', // Leave empty during development, as we'll simulate the upload
    customRequest: ({ file, onSuccess }) => {
      if (process.env.NODE_ENV !== 'production') {
        // Simulate successful upload in development
        simulateUpload(file);
      } else {
        // Real API submission in production (this can use the onSuccess callback)
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload');
        xhr.onload = () => {
          onSuccess(xhr.response);
          message.success(`${file.name} file uploaded successfully.`);
        };
        xhr.onerror = () => {
          message.error(`${file.name} file upload failed.`);
        };
        const formData = new FormData();
        formData.append('file', file);
        xhr.send(formData);
      }
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        setUploading(false);  // Hide loading spinner
        setUploaded(true);    // Show success container
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        setUploading(false);  // Hide loading spinner in case of error
        setFileSubmitted(true); // Show file upload container again if there's an error
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const handleFileSubmit = () => {
    setFileSubmitted(false);  // Hide CSV upload container
    setUploading(true);       // Show loading spinner
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

        {/* CSV File upload Container (Only show when fileSubmitted is true) */}
        {fileSubmitted && (
          <div className='bg-footer_t flex-1 w-full px-3 lg:w-5/6 rounded-lg py-10 lg:px-24 flex flex-col gap-5'>
            <p className='text-center text-white text-opacity-40 text-sm'>
              Upload CSV file of eligible voters
            </p>

            <p className='text-white lg:text-base text-sm px-5 pt-5'>Files upload</p>
            <div className='w-full'>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="text-white text-sm">Click or drag file to this area to upload</p>
                <p className="text-white text-xs">
                  Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                  banned files.
                </p>
              </Dragger>
            </div>
            <div className='flex gap-3 w-1/2'>
              <Button
                className='my-7 w-1/2'
                size='large'
                type='primary'
                onClick={handleFileSubmit}
              >
                Create
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

            {/* Loading container (Only show when uploading is true) */}
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
          {/* Successful container (Only show when uploaded is true) */}
        {uploaded && (
          <div className='w-full items-center p-10 rounded-3xl text-center justify-center flex flex-col gap-4 bg-dialogue_box'>
            <p className='text-white text-sm text-opacity-40'>
              Successful, voters can now check their mail to <br /> vote
            </p>
            <div className='w-1/6 items-center justify-center'>
              <img src={biometric} className='w-full' alt="biometric icon" />
            </div>
            <div className='w-1/4'>
              <Link to={'/dashboard'} className='w-full'>
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
