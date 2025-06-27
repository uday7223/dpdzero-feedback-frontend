import React from 'react';

const FeedbackTimeline = ({ feedbacks }) => {
  if (!feedbacks.length) {
    return <p className="mt-4 text-muted">No feedback received yet.</p>;
  }

  return (
    <div className="mt-4">
      <h5 className="mb-3">📜 Feedback Timeline</h5>
      {feedbacks.map((item, index) => (
        <div key={index} className="card mb-3 shadow-sm">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">
              Submitted By: {item.manager_email}
            </h6>
            <p><strong>Strengths:</strong> {item.strengths}</p>
            <p><strong>Areas to Improve:</strong> {item.improvements}</p>
            <p><strong>Sentiment:</strong> <span className={`badge bg-${getSentimentColor(item.sentiment)}`}>{item.sentiment}</span></p>
            <small className="text-muted">Date: {new Date(item.created_at).toLocaleDateString()}</small>
          </div>
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
