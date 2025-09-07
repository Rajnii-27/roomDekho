import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ Only import Routes, Route
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Pages
import HomePage from './HomePage';
import HomeOwnerSignup from './HomeOwnerSignup';
import HomeOwnerLogin from './HomeOwnerLogin';
import ResetPassword from './ResetPassword';
import HomeOwnerProfile from './HomeOwnerProfile';
import 'bootstrap/dist/css/bootstrap.min.css';

// Route Guard
import ProtectedRoute from './Components/ProtectedRoute';
import RoomDetails from './RoomDetails';
import GetStarted from './GetStartedRooms';
import LearnMore from './LearnMore';
import DiscoverMoreModal from './DiscoverMoreModal';
import ContactButton from './ContactButton';


function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/HomeOwnerSignup" element={<HomeOwnerSignup />} />
      <Route path="/HomeOwnerLogin" element={<HomeOwnerLogin />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/room/:id" element={<RoomDetails />} />
      <Route path='/learnMore' element={<LearnMore/>}/> 
      <Route path='/DiscoverMore' element={<DiscoverMoreModal/>}/>
      <Route path='/contactUs' element={<ContactButton/>}/>


      {/* Protected route */}
      <Route
        path="/ownerProfile"
        element={
          <ProtectedRoute>
            <HomeOwnerProfile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
