import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import { getCurrentUser, logout } from "./services/auth-service";
import IUser from "./types/user.type";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Records from "./pages/Records";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const [containerHeight, setContainerHeight] = useState("80%");

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setContainerHeight("90%");
    }
  }, []);

  const handleLogout = () => {
    logout();
    setCurrentUser(undefined);
    setContainerHeight("100%");
  };

  return (
    <div id="app">
      {currentUser && (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Calculator
          </Link>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/records"} className="nav-link">
                  Records
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link disabled">{currentUser.username}</a>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      )}
      <div
        className="container mt-3 d-flex"
        style={{ height: containerHeight }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/records" element={<Records />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
