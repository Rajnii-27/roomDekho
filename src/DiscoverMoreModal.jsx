import React, { useState } from "react";
import "./DiscoverMoreModal.css";
import { useNavigate } from "react-router-dom";

export default function DiscoverMoreModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const nav=useNavigate();

  // When Explore Listings is clicked
  const handleExploreClick = () => {
    setFadeOut(true); // Start fade out animation
    setTimeout(() => {
      setIsOpen(false); // Close modal
      const targetSection = document.getElementById("get-started-section");
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });

        // Bounce animation on section
        targetSection.classList.add("bounce-highlight");
        setTimeout(() => {
          targetSection.classList.remove("bounce-highlight");
        }, 800);
      }
      setFadeOut(false);
    }, 300); // Delay matches fade animation
    
    nav('/get-started');
  };


  // When modal close button or overlay is clicked
  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setIsOpen(false);
      setFadeOut(false);
    }, 300);
  };

  return (
    <div className="discover-section">
      <h2 className="title">
        Our <span>Agency</span>
      </h2>
      <p className="description">
        At RoomDekho, we're dedicated to empowering renters and landlords with
        innovative solutions, expert guidance, and unparalleled customer
        support. Our team of experts works tirelessly to ensure seamless room
        rental experiences, fostering a community of trust, transparency, and
        convenience.
      </p>
      <button className="discover-btn" onClick={() => setIsOpen(true)}>
        Discover More
      </button>

      {isOpen && (
        <div
          className={`modal-overlay ${fadeOut ? "fade-out" : "fade-in"}`}
          onClick={handleClose}
        >
          <div
            className={`modal-content ${fadeOut ? "fade-out" : "fade-in"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={handleClose}>
              &times;
            </button>
            <h3>About RoomDekho</h3>
            <p>
              RoomDekho is your trusted platform for connecting renters and
              landlords with ease. We focus on verified listings, secure
              transactions, and top-notch support.
            </p>

            <h4>Our Services</h4>
            <ul>
              <li>✔ Verified Room listings</li>
              <li>✔ Easy landlord-tenant communication</li>
              <li>✔ Secure rental agreements</li>
              <li>✔ 24/7 customer support</li>
            </ul>

            <div className="stats">
              <div>
                <h2>500+</h2>
                <p>Rooms Listed</p>
              </div>
              <div>
                <h2>200+</h2>
                <p>Happy Landlords</p>
              </div>
              <div>
                <h2>1K+</h2>
                <p>Satisfied Tenants</p>
              </div>
            </div>

            <button className="cta-btn" onClick={handleExploreClick}>
              Explore Listings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
