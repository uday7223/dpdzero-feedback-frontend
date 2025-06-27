import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <span className="navbar-brand fw-bold">Feedback Portal</span>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav mb-2 mb-lg-0">
            {role === 'manager' && (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate('/manager')}
                  >
                    Dashboard
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate('/give-feedback')}
                  >
                    Give Feedback
                  </button>
                </li>
              </>
            )}
            {role === 'employee' && (
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={() => navigate('/employee')}
                >
                  My Feedback
                </button>
              </li>
            )}
            <li className="nav-item">
              <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
