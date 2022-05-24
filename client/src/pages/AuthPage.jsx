import React, { useState } from 'react';
import AuthForm from '../components/Auth/AuthForm';
import RegForm from '../components/Auth/RegForm';
import './authPage.css';

export default function AuthPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [auth, setAuth] = useState(true);

  const authHandler = () => {
    setAuth(!auth);
  };
  const changeFormHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-page">
      <div className="wrapper">
        {auth ? (
          <AuthForm authHandler={authHandler} />
        ) : (
          <RegForm authHandler={authHandler} />
        )}
      </div>
    </div>
  );
}
