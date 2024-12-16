import React from 'react'
import Header2 from '../../components/header2/header2'
import Footer from '../../components/footer/Footer'
import Welcome from '../../components/Welcome/welcome'
import MenuCards from '../../components/MenuCards/MenuCards'
const Menu = () => {
  return (
    <div>
        <Header2/>
        <Welcome/>
        <MenuCards/>
        <Footer/>
    </div>
  )
}

export default Menu