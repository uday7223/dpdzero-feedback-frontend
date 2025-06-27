import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = {
  positive: '#28a745', // green
  neutral: '#ffc107',  // yellow
  negative: '#dc3545', // red
};

const SentimentPieChart = () => {
  const [sentimentData, setSentimentData] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch('http://localhost:8000/feedback/team', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const feedbacks = await res.json();

        const counts = {
          positive: 0,
          neutral: 0,
          negative: 0,
        };

        feedbacks.forEach(fb => {
          counts[fb.sentiment] += 1;
        });

        const formatted = Object.entries(counts).map(([key, value]) => ({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          value,
        }));

        setSentimentData(formatted);
      } catch (err) {
        console.error('Failed to fetch sentiment data', err);
      }
    };

    fetchFeedbacks();
  }, []);

  if (!sentimentData) return <p>Loading chart...</p>;

  return (
    <div className="mt-5">
      <h5 className="mb-3">📊 Sentiment Overview</h5>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={sentimentData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label
          >
            {sentimentData.map((entry, index) => (
              <Cell key={index} fill={COLORS[entry.name.toLowerCase()]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentPieChart;
