import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    const imgRef=useRef()
    const nav=useNavigate();
    
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          imgRef.current.classList.add("visible");
        }
      },
      { threshold: 0.5 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));

    return () => animatedElements.forEach(el => observer.unobserve(el));
  }, []);
  const handleHomeOwner=()=>{
    nav('/HomeOwner')
  };
  const handleHomeOwnerSignup=()=>{
    nav('/HomeOwnerSignup')
  };
  const handleGetStarted=()=>{
    nav('/get-started')
  };
  const handleLearnMore=()=>{
    nav('/learnMore')
  };
  const handleDiscoverMore=()=>{
    nav('/DiscoverMore')
  };
   const handleContactUs=()=>{
    nav('/contactUs')
  };

  return (
    <div className="homepage">
  <div className="position-absolute top-0 end-0 m-3 z-3 btn-group ">
  <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"  viewBox="0 0 16 16">
  <path fillrule5="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
</svg>
  </button>
  <ul className="dropdown-menu dropdown-menu-lg-end">
    <li><button className="dropdown-item" type="button">Renter</button></li>
    <li><button onClick={handleHomeOwnerSignup} className="dropdown-item" type="button">HomeOwner</button></li>
  </ul>
</div> 
      {/* Hero Section */}
      <section className="hero animate-on-scroll">
        <div className="hero-text">
          <h1>Get to know about your place with</h1>
          <img className='mainLogo'
          src="/Room_Dekho-removebg-preview.png"
          alt="roomdekho"/>
          <p className='mainLogoP'>"Discover Your Dream Room with RoomDekho - Your One-Stop Solution for Finding the Perfect Space to Call Home"
</p>
          <button className="btn primary" onClick={handleGetStarted}>Get Started</button>
        </div>
        <div className="hero-image">
          <img src="home-unscreen.gif" alt="Hero" />
        </div>
      </section>

      {/* Services Section */}
      <section className="services animate-on-scroll">
        <h2>We Provide The Best <span>Services</span></h2>
        <div className="service-cards">
          <div className="card"><h4>find Your Dream Room</h4>
          <p>"Search, Compare, and Book your ideal room with ease. Get the best deals on verified rooms."
</p></div>
          <div className="card"><h4>Discover Perfect Spaces</h4>
          <p> "Find comfortable, affordable, and convenient rooms for rent. Browse our collection now!"
</p></div>
          <div className="card"><h4>Your Home Away From Home</h4>
          <p> "Say goodbye to room hunting stress! RoomDekho provides you with the best room options."
</p></div>
          <div className="card"><h4>Browse & Book Rooms</h4>
           "Get instant access to thousands of verified rooms. Book your dream room today!"

</div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="solutions animate-on-scroll">
        <div className="solutions-image">
          <img src="solution-unscreen.gif" alt="Solutions" />
        </div>
        <div className="solutions-text">
          <h3>Simple <span>Solutions!</span></h3>
          <ul>
            <li>Easy Room Search</li>
            <li>Transparent Pricinng</li>
            <li>GSecure Booking</li>
            <li>Dedicated Support</li>
          </ul>
          <button className="btn" onClick={handleLearnMore}>Learn More</button>
        </div>
      </section>

      {/* Agency Section */}
      <section  id="get-started-section" className="agency animate-on-scroll">
        <h2>Our <span>Agency</span></h2>
        <p>At RoomDekho, we're dedicated to empowering renters and landlords with innovative solutions, expert guidance, and unparalleled customer support. Our team of experts works tirelessly to ensure seamless room rental experiences, fostering a community of trust, transparency, and convenience.
</p>
        <button className="btn" onClick={handleDiscoverMore}>Discover More</button>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials animate-on-scroll in-view">
        <h2>What <span>Clients Say!</span></h2>
        <div className="testimonial-cards">
          <div className="testimonial">"Found my dream room with RoomDekho's expert team!"
</div>
          <div className="testimonial"> "RoomDekho made my room rental experience seamless and stress-free."
</div>
          <div className="testimonial">"Highly recommend RoomDekho for verified listings and top-notch support!"
</div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-cta">
          <h3>Ready to get started?</h3>
          <button className="btn primary" onClick={handleContactUs}>Contact Us</button>
        </div>
<div
   style={{
    
        color: "white",
        textAlign: "center",
        padding: "15px 10px",
        marginTop: "20px",
      }}
    >
      <p style={{ margin: 0, fontSize: "14px" }}>
        © {new Date().getFullYear()} RoomDekho. All Rights Reserved.
      </p>
</div>
      </footer>
    </div>
  );
};

export default HomePage;