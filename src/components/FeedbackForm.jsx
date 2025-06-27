import React, { useEffect, useState } from 'react';

const FeedbackForm = ({ onSubmit, initialData = null, isEdit = false, onCancel }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [strengths, setStrengths] = useState('');
  const [improvements, setImprovements] = useState('');
  const [sentiment, setSentiment] = useState('positive');

  useEffect(() => {
    if (initialData) {
      setEmployeeId(initialData.employee_id);
      setStrengths(initialData.strengths);
      setImprovements(initialData.areas_to_improve);
      setSentiment(initialData.sentiment);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedback = { employee_id: employeeId, strengths, areas_to_improve: improvements, sentiment };
    onSubmit(feedback, initialData?.id); // Pass feedbackId if editing
    if (!isEdit) {
      setEmployeeId('');
      setStrengths('');
      setImprovements('');
      setSentiment('positive');
    }
  };

  return (
    <form className="card p-4 mt-4" onSubmit={handleSubmit}>
      <h5 className="mb-3">{isEdit ? 'Edit Feedback' : 'Submit Feedback'}</h5>

      <div className="mb-3">
        <label className="form-label">Employee ID</label>
        <input
          type="number"
          className="form-control"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          disabled={isEdit} // prevent changing employee on edit
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
        <label className="form-label">Sentiment</label>
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

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Update Feedback' : 'Submit Feedback'}
        </button>
        {isEdit && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default FeedbackForm;
