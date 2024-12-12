import React from 'react';
import Welcome from '../../components/Welcome/welcome';
import Footer from '../../components/footer/Footer';  
import Header from '../../components/header/Header'; 
import ItemCards from '../../components/itemCards/itemCards';
const Home = () => {
  return (
    <div>
      <Header />
      <Welcome />
      <ItemCards />
      <Footer />
     
    </div>
  );
};

export default Home;
