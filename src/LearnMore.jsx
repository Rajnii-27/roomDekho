import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaMoneyBillWave, FaLock, FaHeadset } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "./LearnMore.css";

const LearnMore = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-out" });
  }, []);

  return (
    <div className="learn-more-wrapper">
      <h1 className="page-title" data-aos="fade-up" data-aos-delay="50">
        How We Make Your Room Search Easy
      </h1>

      <div className="feature-card fade-up-blur" data-aos="fade-up" data-aos-delay="100">
        <div className="icon-title">
          <FaSearch className="feature-icon" />
          <h2>Easy Room Search</h2>
        </div>
        <p>
          Quickly find your ideal room with our advanced filters for location,
          price and availability. No more endless scrolling—just
          smart search results.
        </p>
        <img src="roomsearch.jpg" alt="Easy Room Search" />
      </div>

      <div className="feature-card fade-up-blur" data-aos="fade-up" data-aos-delay="200">
        <div className="icon-title">
          <FaMoneyBillWave className="feature-icon" />
          <h2>Transparent Pricing</h2>
        </div>
        <p>
          We believe in honesty. All prices are clearly shown with a detailed
          cost breakdown—no hidden charges, no last-minute surprises.
        </p>
        <img src="TransparentPrice.png" alt="Transparent Pricing" />
      </div>

      <div className="feature-card fade-up-blur" data-aos="fade-up" data-aos-delay="300">
        <div className="icon-title">
          <FaLock className="feature-icon" />
          <h2>Secure Booking</h2>
        </div>
        <p>
          Your safety is our priority. We use secure payment gateways and give
          you instant booking confirmations for peace of mind.
        </p>
        <img src="secure booking.jpeg" alt="Secure Booking" />
      </div>

      <div className="feature-card fade-up-blur" data-aos="fade-up" data-aos-delay="400">
        <div className="icon-title">
          <FaHeadset className="feature-icon" />
          <h2>Dedicated Support</h2>
        </div>
        <p>
          Need help? Our support team is available 24/7 via chat, call, or
          email—ready to assist you anytime.
        </p>
        <img src="servies Headset.avif" alt="Dedicated Support" />
      </div>

      <div className="cta-container" data-aos="zoom-in" data-aos-delay="500">
        <button
          className="cta-button"
          onClick={() => navigate("/get-started")}
        >
          Start Your Search
        </button>
      </div>
    </div>
  );
};

export default LearnMore;
