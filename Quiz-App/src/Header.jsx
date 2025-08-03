import React from 'react'
import image from './logo512.png'

const Header = () => {
  return (
    <div className='app-header'>
       <img src={image} alt="logo" />
      <h1>The React Quiz App </h1>
    </div>
  )
}

export default Header