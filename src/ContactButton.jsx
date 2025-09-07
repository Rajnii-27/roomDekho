import React, { useState } from "react";
import "./ContactButton.css";

export default function ContactButton() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Replace this with Homeowner WhatsApp number (with country code, no "+" or spaces)
  const homeownerWhatsApp = "918054212315"; // Example: 91 = India, then number

  const handleSend = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill all fields before sending!");
      return;
    }

    const text = `Hello, I am ${name}.\nEmail: ${email}\n\nMessage:\n${message}`;
    const whatsappURL = `https://wa.me/${homeownerWhatsApp}?text=${encodeURIComponent(
      text
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="contact-container">
      <h2>Contact RoomDekhoOfficial</h2>
      <form onSubmit={handleSend} className="contact-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">Send via WhatsApp</button>
      </form>
    </div>
  );
}
