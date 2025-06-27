import React, { useState } from 'react';

const FeedbackForm = ({ onSubmit }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [strengths, setStrengths] = useState('');
  const [improvements, setImprovements] = useState('');
  const [sentiment, setSentiment] = useState('positive');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      employee_id: parseInt(employeeId),
      strengths,
      areas_to_improve: improvements,
      sentiment,
    });

    // Reset form
    setEmployeeId('');
    setStrengths('');
    setImprovements('');
    setSentiment('positive');
  };

  return (
    <form className="card p-4 mt-4" onSubmit={handleSubmit}>
      <h5 className="mb-3">Submit Feedback</h5>

      <div className="mb-3">
        <label className="form-label">Employee ID</label>
        <input
          type="number"
          className="form-control"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Strengths</label>
        <textarea
          className="form-control"
          value={strengths}
          onChange={(e) => setStrengths(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Areas to Improve</label>
        <textarea
          className="form-control"
          value={improvements}
          onChange={(e) => setImprovements(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Overall Sentiment</label>
        <select
          className="form-select"
          value={sentiment}
          onChange={(e) => setSentiment(e.target.value)}
        >
          <option value="positive">Positive</option>
          <option value="neutral">Neutral</option>
          <option value="negative">Negative</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
