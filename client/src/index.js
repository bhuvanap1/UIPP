import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Profile from "./components/Profile"
import axios from "axios";
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
      </BrowserRouter>
);


