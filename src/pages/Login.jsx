import React, { useState } from 'react';
import axios from 'axios';
import './login.scss';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleLogin = async (e) => {
  e.preventDefault();
  setError('');

  const formData = new URLSearchParams();
  formData.append('username', form.email); // FastAPI uses 'username'
  formData.append('password', form.password);

  try {
    const res = await axios.post('http://localhost:8000/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    localStorage.setItem('token', res.data.access_token);
    localStorage.setItem('role', res.data.role);

    // 👇 Redirect based on role
    if (res.data.role === 'manager') {
      navigate('/manager');
    } else if (res.data.role === 'employee') {
      navigate('/employee');
    } else {
      setError('Unknown role');
    }

  } catch (err) {
    setError(err.response?.data?.detail || 'Login failed');
  }
};



  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center vh-100">
      <div className="login-card shadow p-4 rounded bg-white">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="text"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="alert alert-danger py-1">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
