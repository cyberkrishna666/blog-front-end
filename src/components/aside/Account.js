import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '.././context/userContext'
import { Link } from 'react-router-dom'
import Avatar from '../main/common/Avatar'
import ModalWindow from '../main/modal/ModalWindow'
import { ModalContext } from '.././context/modalContext'
import Login from '../main/authentication/Login'

function Account() {
  const { modalState, dispatchModal } = useContext(ModalContext)
  const { userState } = useContext(AuthContext)
  let history = useHistory()

  const userLogged = () => (
    <div className="account">
      <Link to={`/@${userState.globalUser.username}`}>
        <Avatar user={userState.globalUser} size={'100'}/>
      </Link>
      {userState.globalUser.name} {userState.globalUser.lastName}
      <div className="actions_bar">
        <Link to="/add"><button className="default_btn">Write a post</button></Link>
      </div>
    </div>
  )

  const handleModal = () => {
    dispatchModal({ type: 'SHOW_MODAL'})
  }

  const auth = () => (
    <>
    <button className="default_btn" onClick={ () => handleModal() }>Login</button>
    <span>or</span>
    <button className="default_btn" onClick={ () => { history.push('/signup') }}>
      Sign up
    </button>
    </>
  )

  return (
    <div className="aside_container">
      { userState.isAuthenticated ? userLogged() : auth() }
      { modalState.showModal && <ModalWindow><Login /></ModalWindow>}
    </div>
  )
}

export default Account