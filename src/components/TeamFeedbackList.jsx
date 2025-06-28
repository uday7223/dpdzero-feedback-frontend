import React, { useEffect, useState } from 'react';

const TeamFeedbackList = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch('http://localhost:8000/feedback/team', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setFeedbackList(data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) return <p>Loading feedbacks...</p>;
  if (feedbackList.length === 0) return <p>No feedbacks submitted yet.</p>;

  return (
    <div className="mt-5">
      <h5 className="mb-3">📝 Previous Feedbacks</h5>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Strengths</th>
              <th>Areas to Improve</th>
              <th>Sentiment</th>
              <th>Acknowledged</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {feedbackList.map((fb) => (
              <tr key={fb.id}>
                <td>{fb.employee_id}</td>
                <td>{fb.strengths}</td>
                <td>{fb.areas_to_improve}</td>
                <td>
                  <span
                    className={`badge text-bg-${
                      fb.sentiment === 'positive'
                        ? 'success'
                        : fb.sentiment === 'neutral'
                        ? 'warning'
                        : 'danger'
                    }`}
                  >
                    {fb.sentiment}
                  </span>
                </td>
                <td className=''>{fb.acknowledged ? '✅' : '❌'}</td>
                <td>{new Date(fb.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamFeedbackList;
