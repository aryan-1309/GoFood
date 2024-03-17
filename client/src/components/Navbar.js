import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">MY FOOD</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {
                (localStorage.getItem("token")) &&
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/orders">My Orders</Link>
                </li>
              }
            </ul>
            {
              !(localStorage.getItem("token")) ?
                <div className="d-flex">
                  <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                  <Link className="btn bg-white text-success mx-1" to="/signup">SignUp</Link>
                </div>
                :
                <div className="d-flex">
                  <Link className="btn bg-white text-success mx-1" to="/cart">My Cart</Link>
                  <button className="btn bg-white text-danger mx-1" onClick={handleLogout}>Logout</button>
                </div>
            }
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
