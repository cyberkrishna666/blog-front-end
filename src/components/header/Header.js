import React from 'react'
import Nav from './Nav'

const Header = ({ showMobileMenu, setShowMobileMenu }) => {
  return (
    <header className="main_header">
      <Nav showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
    </header>
  )
}

export default Header