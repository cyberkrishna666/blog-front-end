import React, { useEffect, useState, useContext } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import userService, { banUserService } from '../../../services/user'
import { AuthContext } from '../../context/userContext'
import Avatar from '../common/Avatar'
import { Redirect } from 'react-router-dom'

function AuthorProfile() {
  const { userState, dispatchUser } = useContext(AuthContext)
  const [ user, setUser ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ file, setFile ] = useState(null)
  const [ bio, setBio ] = useState('')
  const { author } = useParams()
  const [ notFound, setNotFound ] = useState(false)
  const { cancelRequest, banUser } = banUserService()
  let history = useHistory()

  useEffect( () => {
    (async function () {
      try {
        const response = await userService.getUser(author.substring(author.length - (author.length - 1)))
        console.log(response);
        
        setUser(response)
        setLoading(false)
      } catch(error) {
        console.log('ERROR: ' + error.message );
        
        setLoading(false)
        setNotFound(true)
      }
    })()

  return function cleanup() {
    setLoading(false)
    cancelRequest()
  }
  }, [ ])


  async function handleAvatar(event) {
    const reader = new FileReader()
    reader.onload = () => {
      setFile(reader.result)
    }
    reader.readAsDataURL(event.target.files[0])

    const avatar = new FormData()
    avatar.append('avatar', event.target.files[0])
    const response = await userService.uploadAvatar(avatar)
    setUser({...user, avatar: response.avatar })
    // dispatchUser({ type: 'LOGIN', payload: { globalUser: {...userState, avatar: response.avatar}}})
    console.log(response.status)
  }

  async function handleBio (event) {
    event.preventDefault()
    userService.addBio(bio)
    setUser({...user, bio: bio })
  }

  const handleBanUser = async () => {
    try {
      await banUser(user.id)
      history.push('/')
    } catch(error) {
      console.log(error)
    }
  }

  function addAvatar() {
    return (
    <>
      <input type="file" className="upload" onChange={(event) => handleAvatar(event)} id="avatar" name="avatar" accept="image/png, image/jpeg" />
      <label className="upload_button" htmlFor="avatar" aria-label="Upload avatar">Upload avatar</label>
    </>
    )
  }

  const handleLogout = (event) => {
    event.preventDefault()
    
    dispatchUser({ type: 'LOGOUT' })
    history.push('/')
  }

  function addBio() {
    return (
      <>
      <form className="add_bio" >
          <textarea 
            id="bio"
            name="bio"
            value={bio}
            onChange={({ target }) => setBio(target.value)}
          />
      </form>
      <button className="upload_button" onClick={handleBio} type="submit">Add bio</button>
      </>
    )
  }

  function authorProfile() {
    return (
      <div className="profile_container">
        <div className="avatar_container">
          <Avatar user={user} size={'100'} />
          { !user.avatar && !file ? addAvatar() : null }
          <div>
            <div className="name">{`${user.name} ${user.lastName}`}</div>
            <div className="username">@{user.username}</div>
            { user.role === 'banned' && <div>banned</div>}
            { userState.isAuthenticated ? userState.globalUser.id === user.id && <button className="upload_button" onClick={handleLogout}>Logout</button> : null}
            { userState.isAuthenticated ? userState.globalUser.role === 'admin' &&userState.globalUser.id !== user.id && user.role !== 'banned' && <button className="upload_button" onClick={handleBanUser}>Ban</button> : null}
          </div>
        </div>
        <div className="profile_info">
        { userState.globalUser ? userState.globalUser.id === user.id ? !user.bio ? addBio() :
          <div className="user_bio"><div>Bio: </div> {user.bio}</div>
          : null : null}
        </div>
      </div>
    )
  }

  return (
    <>
      { notFound && <Redirect to="/404" />  }
      { !loading && authorProfile() }
    </>
  )
}

export default AuthorProfile