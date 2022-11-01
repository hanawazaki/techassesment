import React from 'react'
import '../css/Header.css'
import logobooku from '../assets/images/logo.svg'

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src={logobooku} alt="logo" />
        <h1>Booku</h1>
      </div>
      <nav>
        <a href="/">Home</a>
        <a href="/categories">Categories</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
      <div className="profile">
        <h3>EN</h3>
        <div className="user-avatar">
          <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" alt="User Profile Default Image Png Clipart , Png Download - Default User Profile" />
        </div>
      </div>
    </header>
  )
}

export default Header