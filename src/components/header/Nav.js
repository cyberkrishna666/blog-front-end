import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Search from '../header/Search'
import MobileNav from './MobileNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Nav = () => {
  const mobileQuery = window.matchMedia('(max-width: 768px)')
  const [ mobile, setMobile ] = useState(mobileQuery.matches)
  const [ showMobileMenu, setShowMobileMenu ] = useState(false)

  const handleMobile = useCallback((event) => {
    if (event.matches) {
      setMobile(true)
    } else {
      setMobile(false)
    }
  }, [])

  useEffect( () => {
    mobileQuery.addListener(handleMobile)
    
    return () => {
      mobileQuery.removeListener(handleMobile)
    }
  }, [ handleMobile, mobileQuery ])

  return (
    <>
    <nav className="menu">
      { mobile ?
        <div onClick={() => setShowMobileMenu(true)} className="burger"><FontAwesomeIcon icon={faBars} /></div>
      :
      <>
        <Link className="item" to="/">Home</Link>
        <Link className="item" to="/feed/1">Feed</Link>
        <Search />
      </>
      }
    </nav>
      { showMobileMenu && <MobileNav setShowMobileMenu={setShowMobileMenu} />}
    </>
      )

}

export default Nav