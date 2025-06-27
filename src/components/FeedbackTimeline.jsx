import React from 'react';

const FeedbackTimeline = ({ feedbacks, onAcknowledge }) => {
  if (!feedbacks || feedbacks.length === 0) {
    return <p className="mt-4 text-muted">No feedback received yet.</p>;
  }

  return (
    <div className="mt-4">
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
          <p><strong>Sentiment:</strong> {feedback.sentiment}</p>
          <p className="text-muted mb-0">
            {feedback.acknowledged ? "✅ Acknowledged" : "❌ Not Acknowledged"}
          </p>
        </div>
      ))}
    </div>
  );
};

const getSentimentColor = (sentiment) => {
  switch (sentiment) {
    case 'positive':
      return 'success';
    case 'neutral':
      return 'secondary';
    case 'negative':
      return 'danger';
    default:
      return 'light';
  }
};

export default FeedbackTimeline;
