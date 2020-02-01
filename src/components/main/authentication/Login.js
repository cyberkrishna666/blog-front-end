import React, {useState, useContext, useEffect} from 'react'
import loginService from '../../../services/login'
import { AuthContext } from '../../context/userContext'
import { ModalContext } from '../../context/modalContext'

function Login({ setShowMobileMenu }) {
  const { dispatchUser } = useContext(AuthContext)
  const { dispatchModal } = useContext(ModalContext)
  const [ username, setUsername ] = useState([])
  const [ password, setPassword ] = useState([])
  const [ errorMessage, setErrorMessage ] = useState('')

  useEffect( () => {
    setErrorMessage('')
  }, [username, password])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })

      console.log('USER!: ' + JSON.stringify(user))
      dispatchUser({ type: 'LOGIN', payload: { globalUser: user } })
      setUsername('')
      setPassword('')
      dispatchModal({ type: 'HIDE_MODAL'})
      if (setShowMobileMenu) {
        setShowMobileMenu(false)
      }
    } catch (exception) {
      exception.response
      ?
      setErrorMessage(exception.response.data.error)
      :
      console.log(exception)
    }
  }

  const loginForm = () => (
    <form className="signup_form" onSubmit={handleLogin}>
    <div className="form_field">
        <label htmlFor="username">Username:</label>
        <input
        type="text"
        value={username}
        name="Username"
        id="username"
        required
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div className="form_field">
        <label htmlFor="password">Password:</label>
        <input
        type="password"
        value={password}
        name="Password"
        id="password"
        required
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button className="default_btn" type="submit">Login</button>
    { errorMessage && <div className="error_message">{errorMessage}</div> }
  </form>
  )

  return (
    <div className="signup_container">
      {loginForm()}
      {/* <div className="signup">Don't have an account? <Link to="/signup">Sign Up</Link></div> */}
    </div>
  )
}

export default Login