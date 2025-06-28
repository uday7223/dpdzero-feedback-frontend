import React, { useEffect, useState } from "react";
import FeedbackForm from "../components/FeedbackForm";
import Navbar from "../components/Navbar";
import FeedbackTimeline from "../components/FeedbackTimeline";
import TeamFeedbackList from "../components/TeamFeedbackList";
import SentimentPieChart from "../components/SentimentPieChart";

const ManagerDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchFeedbacks = async () => {
    try {
      const res = await fetch("http://localhost:8000/feedback/team", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      console.error("Failed to fetch feedbacks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleFeedbackSubmit = async (feedbackData, feedbackId = null) => {
    try {
      const url = feedbackId
        ? `http://localhost:8000/feedback/${feedbackId}`
        : "http://localhost:8000/feedback/";

      const method = feedbackId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok)
        throw new Error("Error in submitting/updating feedback");

      alert(feedbackId ? "✅ Feedback updated!" : "✅ Feedback submitted!");
      fetchFeedbacks();
      setEditMode(false);
      setEditData(null);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong.");
    }
  };

  const handleEdit = (feedback) => {
    setEditMode(true);
    setEditData(feedback);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditData(null);
  };

  return (
    <>
      <Navbar role="manager" />
      <div className="container mt-5">
        <h3>👔 Manager Dashboard</h3>
        <p>
          Welcome, Manager! Here you can view your team feedback, analytics, and
          submit feedback.
        </p>
        <FeedbackForm
          onSubmit={handleFeedbackSubmit}
          initialData={editData}
          isEdit={editMode}
          onCancel={handleCancelEdit}
        />
        <SentimentPieChart feedbacks={feedbacks} /> {/* 📊 Add Chart */}
        {/* <TeamFeedbackList />  */}
        {loading && <p>Loading feedbacks...</p>}
        <div className="mt-5">
          <h5 className="mb-3">📝 Previous Feedbacks</h5>
          <div className="table-responsive">
            <table className="table table-striped text-center">
              {feedbacks.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="7">
                      <span className="text-muted">
                        No feedbacks submitted yet.
                      </span>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Strengths</th>
                    <th>Areas to Improve</th>
                    <th>Sentiment</th>
                    <th>Acknowledged</th>
                    <th>Created</th>
                    <th>Edit</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {feedbacks.map((fb) => (
                  <tr key={fb.id}>
                    <td>{fb.employee_id}</td>
                    <td>{fb.strengths}</td>
                    <td>{fb.areas_to_improve}</td>
                    <td>
                      <span
                        className={`badge text-bg-${
                          fb.sentiment === "positive"
                            ? "success"
                            : fb.sentiment === "neutral"
                            ? "warning"
                            : "danger"
                        }`}
                      >
                        {fb.sentiment}
                      </span>
                    </td>
                    <td >{fb.acknowledged ? "✅" : "❌"}</td>
                    <td>{new Date(fb.created_at).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning mt-2"
                        onClick={() => handleEdit(fb)}
                      >
                        ✏️ Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* <FeedbackTimeline/> */}
      </div>
    </>
  );
};

export default ManagerDashboard;
