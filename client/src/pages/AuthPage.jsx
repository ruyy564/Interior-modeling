import React, { useState } from 'react';
import AuthForm from '../components/Auth/AuthForm';
import RegForm from '../components/Auth/RegForm';
import './authPage.css';

export default function AuthPage() {
  const [auth, setAuth] = useState(true);
  const authHandler = () => {
    setAuth(!auth);
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
