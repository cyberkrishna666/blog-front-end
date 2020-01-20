import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '.././context/userContext'

function Account({ setShowModal }) {
  const { userState, dispatchUser } = useContext(AuthContext)
  let history = useHistory()

  const handleLogout = (event) => {
    event.preventDefault()
    
    dispatchUser({ type: 'LOGOUT' })
  }

  const userLogged = () => (
    <div>
      <span>Hello, <h2>{userState.globalUser.username}</h2></span>
      <button onClick={handleLogout}>Log out</button>
    </div>
  )

  const handleModal = () => {
    setShowModal(true)
  }

  const auth = () => (
    <>
    <button onClick={ () => handleModal() }>login</button>
    <span>or</span>
    <button onClick={ () => { history.push('/signup') }}>
      Sign up
    </button>
    </>
  )

  return (
    <div className="aside_container">
      { userState.isAuthenticated ? userLogged() : auth() }
    </div>
  )
}

export default Account