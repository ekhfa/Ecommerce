import React, { useState } from 'react';
import axios from 'axios';

const RegistrationAndPaymentSidebar = ({ onClose }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handlePayment = async () => {
    try {
      // Make a POST request to your backend for user registration
      const registrationResponse = await axios.post('/register', userData);

      // Registration successful, now you can handle payment
      console.log('User registered:', registrationResponse.data);

      // You might want to navigate to a payment gateway here
      // For this example, we'll just close the sidebar
      onClose();
    } catch (error) {
      // Handle registration error
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="registration-payment-sidebar">
      <h2>Register and Pay</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleUserInputChange}
      />
      {/* ...other user registration fields... */}
      <button onClick={handlePayment}>Buy and Pay</button>
    </div>
  );
};

export default RegistrationAndPaymentSidebar;
