import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Login from '../../components/Login/login';
import Footer from '../../components/footer/Footer';
const LoginPage = () => {
  return (
    <div>
      <Header/>
      <Login />
      <Footer/>
    </div>
  );
};

export default LoginPage;
