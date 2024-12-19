import React from 'react'
import Header2 from '../../components/header2/header2'
import Footer from '../../components/footer/Footer'

import Category1 from '../../components/MenuCards/Category1'
import Category2 from '../../components/MenuCards/Category2'
import Category3 from '../../components/MenuCards/Category3'
import Welcome1 from '../../components/welcome2/welcome1'

const Menu = () => {
  return (
    <div>
        <Header2/>
        <Welcome1/>

        
        <Category1 />
        <Category2 />
        <Category3 />

        <Footer/>
    </div>
  )
}

export default Menu