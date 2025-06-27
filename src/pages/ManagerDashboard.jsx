import React from 'react';
import FeedbackForm from '../components/FeedbackForm';
import Navbar from '../components/Navbar';

const ManagerDashboard = () => {
   const handleFeedbackSubmit = async (feedbackData) => {
    try {
      const response = await fetch('http://localhost:8000/feedbacks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) throw new Error('Failed to submit feedback');
      alert('✅ Feedback submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('❌ Error submitting feedback');
    }
  };
  return (

    <>
    <Navbar role="manager" />
    <div className="container mt-5">
      <h3>👔 Manager Dashboard</h3>
      <p>Welcome, Manager! Here you can view your team feedback, analytics, and submit feedback.</p>
       <FeedbackForm onSubmit={handleFeedbackSubmit} />
    </div>
    
    </>
  );
};

export default ManagerDashboard;
