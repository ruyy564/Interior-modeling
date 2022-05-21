import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import RegForm from '../components/RegForm';
import './Auth.css';

export default function Auth() {
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
