import React from 'react';

const FeedbackTimeline = ({ feedbacks, onAcknowledge }) => {
  if (!feedbacks || feedbacks.length === 0) {
    return <p className="mt-4 text-muted">No feedback received yet.</p>;
  }

  return (
    <div className="mt-4 feedback-timeline">
      <h5 className="mb-3">📜 Feedback Timeline</h5>
           {feedbacks.map((feedback) => (
        <div className="card mb-3 p-3" key={feedback.id}>
          <div className="d-flex justify-content-between align-items-center">
            <h5>Feedback #{feedback.id}</h5>
            {!feedback.acknowledged && (
              <button
                className="btn btn-sm btn-success"
                onClick={() => onAcknowledge(feedback.id)}
              >
                ✅ Acknowledge
              </button>
            )}
          </div>
          <p><strong>Strengths:</strong> {feedback.strengths}</p>
          <p><strong>Areas to Improve:</strong> {feedback.areas_to_improve}</p>
          <span className={`badge bg-${feedback.sentiment === 'positive' ? 'success' : feedback.sentiment === 'neutral' ? 'warning' : 'danger'}`}>
            <p>{feedback.sentiment.charAt(0).toUpperCase() + feedback.sentiment.slice(1)}</p>
</span>

          <p className="text-muted mb-0 mt-3">
            {feedback.acknowledged ? "✅ Acknowledged" : "❌ Not Acknowledged"}
          </p>
          <p className='pt-2'> <span className='fw-bold'>Created :  </span>
            {new Date(feedback.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackTimeline;
