import React, { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './ResetPassword.css';

const ResetPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  const handleSendOTP = async () => {
    if (!email) return toast.error('Please enter your email');

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/homeowner/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        toast.success('OTP sent to your email');
        setStep(2);
      } else {
        toast.error(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setLoading(false);
      toast.error('Something went wrong');
    }
  };

  const handleOtpChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) inputs.current[index + 1].focus();
      if (!value && index > 0) inputs.current[index - 1].focus();
    }
  };

  const handleResetPassword = async () => {
    const enteredOtp = otp.join('');
    if (!enteredOtp || !newPassword) {
      toast.error('Please enter OTP and new password');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://192.168.29.40:5000/api/homeowner/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: enteredOtp, newPassword }),
      });

      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        toast.success('Password reset successful');
        setTimeout(() => navigate('/HomeOwnerLogin'), 2000);
      } else {
        toast.error(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setLoading(false);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="reset-password-wrapper">
      <ToastContainer />
      <div className="reset-password-box">
        <h2 className="text-center mb-4">Reset Password</h2>

        {step === 1 && (
          <>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                placeholder="Enter your registered email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary w-100"
              onClick={handleSendOTP}
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="form-group mb-3">
              <label>Enter OTP</label>
              <div className="otp-inputs">
                {otp.map((value, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    ref={(el) => (inputs.current[idx] = el)}
                    className="otp-box"
                  />
                ))}
              </div>
            </div>

            <div className="form-group mb-3">
              <label>New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-btn mt-1"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'} Password
              </button>
            </div>

            <button
              className="btn btn-success w-100"
              onClick={handleResetPassword}
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
