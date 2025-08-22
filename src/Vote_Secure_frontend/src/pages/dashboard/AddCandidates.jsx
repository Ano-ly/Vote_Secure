import React, { useState, useEffect } from 'react';
import Nav2 from '../../components/dashboard/Nav2';
import { Input, message, Upload, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import candidatep from '/assets/CandidateP.png';
import { backendActorPromise } from "../../utils/backend";  // ✅ add at top

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

const AddCandidates = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState({});
  const [candidates, setCandidates] = useState({});
  const [positions, setPositions] = useState([]);
  const navigate = useNavigate();

  // ✅ Load positions from localStorage
  useEffect(() => {
    const storedElection = localStorage.getItem("currentElection");
    if (storedElection) {
      const { positions } = JSON.parse(storedElection);
      setPositions(positions || []);

      // Initialize candidates state with empty arrays
      const initialCandidates = {};
      (positions || []).forEach((pos) => {
        initialCandidates[pos] = [];
      });
      setCandidates(initialCandidates);
    }
  }, []);

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
          [`${position}-${candidateIndex}`]: url,
        }));
      });
    }
  };

const handleProceed = async () => {
  try {
    const storedElection = JSON.parse(localStorage.getItem("currentElection"));
    if (!storedElection) {
      message.error("No election data found.");
      return;
    }

    const { title, description, date } = storedElection;

    // ✅ fetch from localStorage (set at signup/login)
    const adminName = localStorage.getItem("username");
    const adminPass = localStorage.getItem("password");

    if (!adminName || !adminPass) {
      message.error("Missing admin credentials. Please sign up or log in again.");
      return;
    }

    // build Motoko pollList
    const pollList = Object.entries(candidates).map(([position, cands]) => [
      position,
      cands.map(c => [c.name, c.manifesto, c.description]),
    ]);

    const backendActor = await backendActorPromise;
    const [status, msg] = await backendActor.createNewElection(
      date,
      adminName,
      adminPass,
      title,
      description,
      pollList
    );

    if (status === "Success") {
            // ✅ Store election ID for other pages
      localStorage.setItem("electionId", msg);
      
      message.success("Election created successfully!");
      navigate("/Csvupload");
    } else {
      message.error(`Failed: ${msg}`);
    }
  } catch (err) {
    console.error("Error creating election:", err);
    message.error("An error occurred while creating election.");
  }
};


  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const addCandidate = (position) => {
    setCandidates((prev) => ({
      ...prev,
      [position]: [
        ...(prev[position] || []),
        { name: '', description: '', manifesto: '', image: '' },
      ],
    }));
  };

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

  return (
    <div className="bg-main_bg_color container-r flex flex-col pb-9">
      <Nav2 />

      <div className="flex items-center flex-1 flex-col gap-4 m-4">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-xl text-white font-bold">Create your Poll</h1>
          <p className="text-center lg:text-sm text-xs text-white text-opacity-40">
            Please add the Candidates for each Position
          </p>
        </div>

        <div className="bg-footer_t flex-1 w-full h-full text-white px-5 pb-7 lg:w-5/6 rounded-lg lg:py-10 sm:py-14 sm:px-14 lg:px-24 flex flex-col gap-8">
          {positions.length > 0 ? (
            positions.map((position, index) => (
              <div key={index} className="flex flex-col px-4 gap-5">
                <Input
                  className="bg-slate-600  bg-opacity-50 placeholder-slate-300 !text-white border-0"
                  value={position}
                  disabled
                />
                <a
                  className="text-xs px-2 text-right cursor-pointer"
                  onClick={() => addCandidate(position)}
                >
                  +Add Candidate
                </a>

                {/* Candidate list preview */}
                <div className="flex flex-col gap-3 mt-5">
                  {candidates[position] &&
                    candidates[position].map((candidate, idx) => (
                      <div key={idx} className="flex gap-3 items-center">
                        <img
                          src={imageUrls[`${position}-${idx}`] || candidatep}
                          alt={candidate.name || 'Candidate'}
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                          }}
                        />
                        <p className="text-white text-xs">{candidate.name}</p>
                      </div>
                    ))}
                </div>

                {/* Candidate input fields */}
                {candidates[position] &&
                  candidates[position].map((candidate, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                      <p className="text-white text-opacity-40 text-xs">
                        Candidate {idx + 1}
                      </p>

                      <Input
                        className="bg-slate-600 bg-opacity-0 ring-white ring-opacity-10 ring-2 placeholder-slate-500 text-white focus:text-black border-0"
                        placeholder="Input Name"
                        value={candidate.name}
                        onChange={(e) =>
                          updateCandidate(position, idx, 'name', e.target.value)
                        }
                      />

                      <TextArea
                        className="bg-slate-600 bg-opacity-0 ring-white ring-opacity-10 ring-2 placeholder-slate-500 focus:text-black text-white border-0"
                        rows={3}
                        placeholder="Please Enter Description"
                        value={candidate.description}
                        onChange={(e) =>
                          updateCandidate(position, idx, 'description', e.target.value)
                        }
                      />

                      <TextArea
                        className="bg-slate-600 bg-opacity-0 ring-white ring-opacity-10 ring-2 placeholder-slate-500 focus:text-black text-white border-0"
                        rows={3}
                        placeholder="Please Enter Manifesto"
                        value={candidate.manifesto}
                        onChange={(e) =>
                          updateCandidate(position, idx, 'manifesto', e.target.value)
                        }
                      />

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
                            style={{ width: '100%' }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <p className="text-white">
              No positions available. Please go back and create positions first.
            </p>
          )}

          {/* Proceed button */}
          <div className="lg:w-1/6 w-1/3">
            <Link to={'/Csvupload'} className="w-full">
              <Button
                className="my-7 text-sm w-full"
                 size="large"
                type="primary"
                onClick={handleProceed}
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
