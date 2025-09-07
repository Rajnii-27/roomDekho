import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle } from 'react-icons/fa';
import './HomeOwnerProfile.css';

const BASE_URL = 'http://localhost:5000';
const states = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat", "Punjab","Chandigarh","Bihar","Patna","Uttar Pradesh","Bengluru","Madhya Pradesh","Rajisthan"];

const HomeOwnerProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [justSaved, setJustSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', pincode: '',
    state: '', country: '', resourcesAvailable: '', otherBills: '', cost: ''
  });
  const [originalData, setOriginalData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState('');
  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');
  const [editMode, setEditMode] = useState(false);
  // const [isEditMode, setIsEditMode] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/HomeOwnerLogin');

      try {
        const res = await axios.get(`${BASE_URL}/api/homeowner/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.user;
        const profileData = {
          name: data.name || '', email: data.email || '', phone: data.phone || '',
          address: data.address || '', pincode: data.pincode || '', state: data.state || '',
          country: data.country || '', resourcesAvailable: data.roomDetails?.resourcesAvailable || '',
          otherBills: data.roomDetails?.otherBills || '', cost: data.roomDetails?.cost || ''
        };

        setFormData(profileData);
        setOriginalData(profileData);
        if (data.profileImage) setProfileImagePreview(`${BASE_URL}${data.profileImage}`);
        if (data.roomPhotos) setPhotoPreviews(data.roomPhotos.map(p => `${BASE_URL}${p}`));
        if (data.roomVideo) setVideoPreview(`${BASE_URL}${data.roomVideo}`);
      } catch (err) {
        toast.error("Session expired or invalid token.");
        localStorage.removeItem('token');
        navigate('/HomeOwnerLogin');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
    setPhotoPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const isFormChanged = () => {
    return (
      Object.keys(formData).some(key => formData[key] !== originalData[key]) ||
      profileImage || photos.length > 0 || video
    );
  };
const validateForm = () => {
  const { name, email, phone, address, pincode, state, country, cost } = formData;

  if (!name || !email || !phone || !address || !pincode || !state || !country || !cost) {
    toast.error('Please fill all required fields.');
    return false;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    toast.error('Phone number must be 10 digits.');
    return false;
  }

  if (!/^[0-9]{6}$/.test(pincode)) {
    toast.error('Pincode must be 6 digits.');
    return false;
  }

  if (isNaN(cost) || Number(cost) <= 0) {
    toast.error('Room cost must be a valid number.');
    return false;
  }

  return true;
};


 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('🟡 Save button clicked');

  if (!isFormChanged()) {
    toast.info("No changes detected.");
    return;
  }

  if (!validateForm()) {
    console.log("🚫 Validation failed.");
    return;
  }

  try {
    const form = new FormData();

    // Append all text fields
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    // Append media if available
    if (profileImage) form.append('profileImage', profileImage);
    photos.forEach((photo) => form.append('roomPhotos', photo));
    if (video) form.append('roomVideo', video);

    setIsSaving(true);

    const response = await axios.put(
      `${BASE_URL}/api/homeowner/profile`,
      form,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    toast.success("Profile updated successfully!");
    setEditMode(false);
    setIsSaving(false);
    console.log("✅ Profile updated:", response.data);
  } catch (error) {
    console.error("❌ Error during save:", error);
    toast.error("Failed to update profile. Please try again.");
    setIsSaving(false);
  }
};

const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/HomeOwnerLogin');
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>
            Welcome, {formData.name} {justSaved && <FaCheckCircle className="text-success ms-2" title="Saved!" />}
          </h2>
          <button onClick={handleLogout} className="btn btn-dark btn-sm logout">Logout</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            <img
              src={profileImagePreview || '/default-avatar.png'}
              alt="Profile"
              className="profile-image"
            />
            {editMode && (
              <input type="file" accept="image/*" className="form-control mt-2" onChange={handleProfileImageChange} />
            )}
          </div>

          <div className="form-grid">
            {[{ label: "Name", name: "name" },
              { label: "Email", name: "email" },
              { label: "Phone", name: "phone" },
              { label: "Address", name: "address" },
              { label: "Pincode", name: "pincode" },
              { label: "Country", name: "country" },
              { label: "Resources Available", name: "resourcesAvailable" },
              { label: "Other Bills", name: "otherBills" },
              { label: "Room Cost", name: "cost" }
            ].map((field, idx) => (
              <div className="form-group" key={idx}>
                <label  className='form-label'>{field.label}</label>
                <input
                  type="text"
                  className='form-control'
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            ))}

            <div className="  form-group form-group-select">
              <label className='form-label'>State</label>
              <select
              className='form-select'
                name="state"
                value={formData.state}
                disabled={!editMode}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                {states.map((s, i) => <option key={i} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="room-photo">
              <label  className='form-label'>Room Photos</label>
              <input className='input form-control'
             
                type="file"
                multiple
                disabled={!editMode}
                accept="image/*"
                onChange={handlePhotosChange}
              />
              <div className="d-flex flex-wrap mt-2">
                {photoPreviews.map((src, i) => (
                  <img key={i} src={src} className="me-2 mb-2" style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt="preview" />
                ))}
              </div>
            </div>

            <div className=" form-group form-group-vedio">
              <label className='form-label'>Room Video</label>
              <input
              className='input-vedio form-control'
                type="file"
                disabled={!editMode}
                accept="video/*"
                onChange={handleVideoChange}
              />
              {videoPreview && <video src={videoPreview} controls className="mt-2 w-10 vedio" style={{ maxHeight: '300px' }} />}
            </div>
          </div>

          <div className="button-group">
            {!editMode ? (
              <button type="button" className="btn-save btn btn-dark btn-sm" onClick={() => setEditMode(true)}>Edit</button>
            ) : (
              <>
                <button type="submit" className="btn-save " disabled={isSaving || !isFormChanged()}>
                  {isSaving ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : 'Save'}
                </button>
                <button type="button" className="btn-cancel" onClick={() => setEditMode(false)}>Cancel</button>
              </>
            )}
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HomeOwnerProfile;
