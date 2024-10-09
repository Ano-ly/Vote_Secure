import React, { useState } from 'react';
import Nav2 from '../../components/dashboard/Nav2';
import { Input, message, Upload, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom'; // Use navigate to move to the next page

import { Link } from 'react-router-dom';

import candidatep from '/assets/CandidateP.png'; // Import the default candidate image

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const { TextArea } = Input;


// for the motoko cannister integration

// const AddCandidates = () => {
//     const [loading, setLoading] = useState(false);
//     const [imageUrls, setImageUrls] = useState({});
//     const [candidates, setCandidates] = useState({});
//     const location = useLocation();
//     const { positions } = location.state || { positions: [] };

//     // Connect to IC and create an actor for your canister
//     const agent = new HttpAgent({ host: 'https://ic0.app' });
//     const canisterActor = Actor.createActor(canisterIdlFactory, {
//         agent,
//         canisterId: canisterIdFromIDL, // Replace with the actual canister ID
//     });

//     const handleChange = (info, position, candidateIndex) => {
//         if (info.file.status === 'uploading') {
//             setLoading(true);
//             return;
//         }
//         if (info.file.status === 'done') {
//             getBase64(info.file.originFileObj, (url) => {
//                 setLoading(false);
//                 setImageUrls((prev) => ({
//                     ...prev,
//                     [`${position}-${candidateIndex}`]: url,
//                 }));
//             });
//         }
//     };











// for web 2 api ignore

const AddCandidates = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrls, setImageUrls] = useState({}); // State to store image URLs for each candidate
    const [candidates, setCandidates] = useState({}); // State to store candidates for each position

    const location = useLocation(); // Get passed state from PollCreation
    const { positions } = location.state || { positions: [] }; // Destructure positions from state

    const navigate = useNavigate(); // To navigate to the next page

    const handleChange = (info, position, candidateIndex) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrls((prev) => ({
                    ...prev,
                    [`${position}-${candidateIndex}`]: url, // Store the image URL using a unique key
                }));
            });
        }
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    // Function to handle adding a new candidate input for a specific position
    const addCandidate = (position) => {
        setCandidates((prev) => ({
            ...prev,
            [position]: [
                ...(prev[position] || []),
                { name: '', description: '', manifesto: '', image: '' }, // Adding image field
            ],
        }));
    };

    // Function to update candidate data
    const updateCandidate = (position, index, key, value) => {
        setCandidates((prev) => {
            const updatedCandidates = [...(prev[position] || [])];
            updatedCandidates[index][key] = value;
            return {
                ...prev,
                [position]: updatedCandidates,
            };
        });
    };




// motoko cannister handle sumbmission funtion


// const handleSubmit = async () => {
//     const preparedData = Object.keys(candidates).map((position) => {
//         return {
//             position,
//             candidates: candidates[position].map((candidate, idx) => ({
//                 ...candidate,
//                 image: imageUrls[`${position}-${idx}`] || '', // Use uploaded image or default
//             })),
//         };
//     });

//     try {
//         // Send data to the Motoko canister using the actor
//         const response = await canisterActor.submitCandidates(preparedData);
//         message.success(response); // Show success message from canister
//     } catch (error) {
//         console.error('Error submitting data to canister:', error);
//         message.error('Failed to submit candidates. Please try again.');
//     }
// };
















    // Handle API submission when the Proceed button is clicked web2 api method ignore
    const handleSubmit = async () => {
        const preparedData = Object.keys(candidates).map((position) => {
            return {
                position,
                candidates: candidates[position].map((candidate, idx) => ({
                    ...candidate,
                    image: imageUrls[`${position}-${idx}`] || candidatep, // Use uploaded image or default
                })),
            };
        });

        try {
            // Submit the data to your API (adjust the URL and method as per your API design)
            const response = await fetch('https://your-api-endpoint.com/candidates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(preparedData),
            });

            if (response.ok) {
                message.success('Candidates data submitted successfully!');
                // Navigate to the next page after successful submission
                navigate('/next-page'); // Adjust the path to the actual page you want to navigate to
            } else {
                message.error('Failed to submit candidates data. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            message.error('An error occurred while submitting candidates data.');
        }
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
                    <p className='text-center lg:text-sm text-xs text-white text-opacity-40'>
                        Set up polls effortlessly on VoteSecure, with blockchain ensuring
                        every vote is protected. Customize <br /> options, track real-time
                        results, and guarantee transparent, tamper-proof outcomes.
                    </p>
                </div>

                {/* Candidate Input Form */}
                <div className='bg-footer_t flex-1 w-full h-full px-5 pb-7 lg:w-5/6 rounded-lg lg:py-10 sm:py-14 sm:px-14 lg:px-24 flex flex-col gap-8'>
                    <p className='text-center text-white text-opacity-40 text-sm py-5'>Please add the Candidates for each Position</p>
                    <p className='text-white lg:text-base text-sm px-5 pt-5'>Input list of candidates</p>

                    {positions.length > 0 ? (
                        positions.map((position, index) => (
                            <div key={index} className='flex flex-col px-4 gap-5'>
                                <Input
                                    className='bg-slate-600 bg-opacity-50 focus:bg-opacity-70 focus:ring-2 hover:ring-2 placeholder-slate-300 text-white hover:bg-slate-600 focus:bg-slate-600 border-0'
                                    placeholder={` ${position}`}
                                />
                                <a
                                    className='text-xs px-2 text-right cursor-pointer'
                                    onClick={() => addCandidate(position)}
                                >
                                    +Add Candidate
                                </a>

                                {/* Candidates list view */}
                                <div className='flex flex-col gap-3 mt-5'>
                                    {candidates[position] && candidates[position].map((candidate, idx) => (
                                        <div key={idx} className='flex gap-3 items-center'>
                                            <img
                                                src={imageUrls[`${position}-${idx}`] || candidatep} // Use uploaded image or default
                                                alt={candidate.name || 'Candidate'}
                                                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                            />
                                            <p className='text-white text-xs'>{candidate.name}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Render candidate input fields */}
                                {candidates[position] && candidates[position].map((candidate, idx) => (
                                    <div key={idx} className='flex flex-col gap-3'>
                                        <p className='text-white text-opacity-40 text-xs'>Candidate {idx + 1}</p>
                                        <div className='flex flex-col gap-3'>
                                            <p className='text-white text-opacity-40 text-xs'>Name</p>
                                            <Input
                                                className='bg-slate-600 bg-opacity-0 ring-white ring-opacity-10 ring-2 focus:bg-opacity-10 focus:ring-2 hover:ring-2 placeholder-slate-500 hover:bg-opacity-10 text-white hover:bg-slate-600 focus:bg-slate-600 border-0'
                                                placeholder='Input Name'
                                                value={candidate.name}
                                                onChange={(e) => updateCandidate(position, idx, 'name', e.target.value)}
                                            />
                                        </div>
                                        <div className='flex flex-col gap-3'>
                                            <p className='text-white text-opacity-40 text-xs'>Description</p>
                                            <TextArea
                                                className='bg-slate-600 bg-opacity-0 ring-white ring-opacity-10 ring-2 focus:bg-opacity-10 focus:ring-2 hover:ring-2 placeholder-slate-500 hover:bg-opacity-10 text-white hover:bg-slate-600 focus:bg-slate-600 border-0'
                                                rows={3}
                                                placeholder='Please Enter Description'
                                                value={candidate.description}
                                                onChange={(e) => updateCandidate(position, idx, 'description', e.target.value)}
                                            />
                                        </div>
                                        <div className='flex flex-col gap-3'>
                                            <p className='text-white text-opacity-40 text-xs'>Manifesto</p>
                                            <TextArea
                                                className='bg-slate-600 bg-opacity-0 ring-white ring-opacity-10 ring-2 focus:bg-opacity-10 focus:ring-2 hover:ring-2 placeholder-slate-500 hover:bg-opacity-10 text-white hover:bg-slate-600 focus:bg-slate-600 border-0'
                                                rows={3}
                                                placeholder='Please Enter Manifesto'
                                                value={candidate.manifesto}
                                                onChange={(e) => updateCandidate(position, idx, 'manifesto', e.target.value)}
                                            />
                                        </div>
                                        <div className='flex flex-col gap-3 justify-center items-center'>
                                            {/* upload image button for each candidate */}
                                            <Upload
                                                name="avatar"
                                                listType="picture-circle"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                                beforeUpload={beforeUpload}
                                                onChange={(info) => handleChange(info, position, idx)}
                                            >
                                                {imageUrls[`${position}-${idx}`] ? (
                                                    <img
                                                        src={imageUrls[`${position}-${idx}`]}
                                                        alt="avatar"
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    />
                                                ) : (
                                                    uploadButton
                                                )}
                                            </Upload>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        ))
                    ) : (
                        <p className='text-white'>No positions available. Please go back and create positions first.</p>
                    )}

                    {/* Proceed button */}
                    <div className='lg:w-1/6 w-1/3'>
                    <Link to={'/Csvupload'} className='w-full'>
                    <Button
                            className='my-7 text-sm w-full'
                            size='large'
                            type='primary'
                            
                        >
                            Proceed
                        </Button>
                    </Link>
                        
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddCandidates;
