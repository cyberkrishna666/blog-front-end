import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/userContext'
import { MdClose } from 'react-icons/md'
import Login from '.././main/authentication/Login'
import ReactDOM from 'react-dom'

function MobileNav({ showMobileMenu, setShowMobileMenu }) {
  const { userState } = useContext(AuthContext)
  const [ showLogin, setShowLogin ] = useState(false)
  let navRef = useRef()

  useEffect(() => {
    document.body.style.position = 'fixed'

    return () => {
      document.body.style.position = 'unset'
    }
  }, [showMobileMenu])

  const handleCloseMenu = () => {
      if ( showMobileMenu ) {
        navRef.current.style = 'opacity: 1'
      } else {
        navRef.current.style = 'opacity: 0'
      }
      setTimeout( () => { setShowMobileMenu(false) }, 300)
  }

  return ReactDOM.createPortal(
    <div ref={navRef} className="mobile_nav">
      <div className="close_button" onClick={handleCloseMenu}><MdClose /></div>
      { showLogin ? <Login setShowMobileMenu={setShowMobileMenu} /> :
      <>
      <Link className="item" to="/" onClick={handleCloseMenu}>Home</Link>
      <Link className="item" to="/feed/1" onClick = {handleCloseMenu}>Feed</Link>
      { userState.isAuthenticated ?
      <>
      <Link className="item" to={`/@${userState.globalUser.username}`} onClick={handleCloseMenu}>My account</Link>
      <Link className="item" to={'/add'} onClick={handleCloseMenu}>Write a post</Link>
      </>
      : 
      <div className="item" onClick={() => {
        setShowLogin(true)
       }}>Login</div>
      }
      </>
    }
    </div>,
    document.body
  )
}

export default MobileNav