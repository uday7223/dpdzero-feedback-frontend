import React, { useEffect, useState } from "react";
import FeedbackTimeline from "../components/FeedbackTimeline";
import Navbar from "../components/Navbar";

const EmployeeDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch("http://localhost:8000/my-feedbacks/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        setFeedbacks(data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <>
      <Navbar role="employee" />
      <div className="container mt-5">
        <h3>🧑‍💼 Employee Dashboard</h3>
        <p className="text-muted">View feedback shared by your manager</p>
        <FeedbackTimeline feedbacks={feedbacks} />
      </div>
    </>
  );
};

export default EmployeeDashboard;
