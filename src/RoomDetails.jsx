import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaWhatsapp, FaSms } from 'react-icons/fa';
import './RoomDetails.css';

function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/homeowner/getRoomDetails/${id}`)
      .then((res) => setRoom(res.data))
      .catch((err) => console.error(err));

    // Detect mobile
    setIsMobileDevice(/Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }, [id]);

  if (!room) return <div className="text-center mt-5">Loading...</div>;

  const handleSendMessage = () => {
    if (!room.phone) {
      alert("Phone number not available");
      return;
    }

    const message = encodeURIComponent("Hi, I am interested in your room listing.");

    if (isMobileDevice) {
      // Mobile → WhatsApp app
      window.open(`https://wa.me/91${room.phone}?text=${message}`, "_blank");
    } else {
      // Desktop → WhatsApp Web, fallback SMS
      const whatsappURL = `https://web.whatsapp.com/send?phone=91${room.phone}&text=${message}`;
      const newWindow = window.open(whatsappURL, "_blank");

      setTimeout(() => {
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          window.location.href = `sms:91${room.phone}?body=${message}`;
        }
      }, 500);
    }
  };

  return (
    <div className="room-details-container">
      <div className="room-details-header">
        <h2 className="room-details-title">Room Details</h2>
        <button className="send-msg-btn" onClick={handleSendMessage}>
          {isMobileDevice ? (
            <>
              <FaWhatsapp size={18} style={{ marginRight: '8px' }} /> WhatsApp
            </>
          ) : (
            <>
              <FaSms size={18} style={{ marginRight: '8px' }} /> SMS / WhatsApp Web
            </>
          )}
        </button>
      </div>

      <h2>{room.name}</h2>
      <div className="owner-info">
        <p><strong>Email:</strong> {room.email}</p>
        <p><strong>Phone:</strong> {room.phone}</p>
        <p><strong>Address:</strong> {room.address}, {room.pincode}, {room.state}, {room.country}</p>
      </div>

      <div className="details-section">
        <p><strong>Room Cost:</strong> ₹{room.roomDetails?.cost || 'N/A'}</p>
        <p><strong>Resources Available:</strong> {room.roomDetails?.resourcesAvailable || 'N/A'}</p>
        <p><strong>Other Bills:</strong> {room.roomDetails?.otherBills || 'N/A'}</p>
        <p><strong>Status:</strong> {room.isAvailable ? 'Available' : 'Booked'}</p>
      </div>

      <h5>Room Photos</h5>
      <div className="room-gallery d-flex flex-wrap">
        {room.roomPhotos && room.roomPhotos.length > 0 ? (
          room.roomPhotos.map((photo, i) => (
            <img
              key={i}
              src={`http://localhost:5000${photo}`}
              alt={`Room ${i + 1}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/200x150?text=Image+Not+Found";
              }}
              style={{
                width: '200px',
                height: '150px',
                objectFit: 'cover',
                margin: '8px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
          ))
        ) : (
          <p>No photos available.</p>
        )}
      </div>

      {room.roomVideo && (
        <div className="mt-3 room-video">
          <h5>Room Video</h5>
          <video width="400" controls>
            <source src={`http://localhost:5000${room.roomVideo}`} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        </div>
      )}

      <div className="back-button">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Back</button>
      </div>
    </div>
  );
}

export default RoomDetails;
