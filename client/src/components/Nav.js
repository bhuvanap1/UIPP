import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from "react-router-dom";
import axios from 'axios';

function Nav() {
  const [isLogged, setIsLogged] = useState(false);
      const navigate = useNavigate();
      useEffect(() => {
          refreshToken();
      }, []);

      const refreshToken = async () => {
          await axios.get('http://localhost:3005/user/token')
              .then(function (response) {
                  
                  setIsLogged(true);
              })
              .catch(function (error) {
                  
                  console.log(error);
                  if (error.response) {
                      setIsLogged(false);
                  }
              })
      }

      const logout = async () => {
          await axios.get('http://localhost:3005/user/logout')
              .then(function (response) {
                  // handle success
                  navigate("/");
              })
              .catch(function (error) {
                  // handle error
                  console.log(error);
              })
    }
  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><h3>My App</h3></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            {!isLogged &&
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">Registration</Link>
                    </li>
                  </>
                }
                {isLogged &&
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                      <href onClick={logout} style={{width:"auto"}} className="nav-link">Logout</href>
                    </li>
                  </>
                } 
            </ul>
          </div>
        </div>
      </nav>
  );
}
  
  export default Nav;