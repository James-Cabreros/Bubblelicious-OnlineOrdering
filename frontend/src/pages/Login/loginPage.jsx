import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Login from '../../components/Login/login';
const LoginPage = () => {
  return (
    <div>
      <Header/>
      <Login />
    </div>
  );
};

export default LoginPage;
