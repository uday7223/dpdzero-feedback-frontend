import React, { useEffect, useState } from "react";
import FeedbackTimeline from "../components/FeedbackTimeline";
import Navbar from "../components/Navbar";

const EmployeeDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch("http://localhost:8000/feedback/employee", {
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

   const handleAcknowledge = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/feedback/acknowledge/${id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Acknowledgement failed");

      // Update UI
      setFeedbacks((prev) =>
        prev.map((fb) =>
          fb.id === id ? { ...fb, acknowledged: true } : fb
        )
      );
    } catch (err) {
      alert("Failed to acknowledge feedback");
    }
  };

  return (
    <>
      <Navbar role="employee" />
      <div className="container mt-5">
        <h3>🧑‍💼 Employee Dashboard</h3>
        <p className="text-muted">View and acknowledge feedback shared by your manager.</p>
        <FeedbackTimeline feedbacks={feedbacks} onAcknowledge={handleAcknowledge} />
      </div>
    </>
  );
};

export default EmployeeDashboard;
