import React, { useContext } from 'react'
import { AuthContext } from '../../context/userContext'

function Avatar({ user, size }) {
  const { userState } = useContext(AuthContext)
  const avatarUser = user ? user : userState.globalUser

  return (
    <>
      { avatarUser.avatar ?
        <img className="avatar" src={avatarUser.avatar} width={size} height={size} alt="imageuser" />
        : 
        <div className="no_avatar" style={{ backgroundColor: avatarUser.noAvatarColor, width: size, height: size }}>
          <div className="text" style={{ fontSize: `${size / 2}px`}}>
            {avatarUser.name.slice(0, 1)}
            {avatarUser.lastName.slice(0, 1)}
          </div>
        </div> }
      </>
  )
}

export default Avatar