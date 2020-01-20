import React, {useState, useContext} from 'react'
import loginService from '../../services/login'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '.././context/userContext'

function Login({ setShowModal }) {
  const { dispatchUser } = useContext(AuthContext)
  const [ username, setUsername ] = useState([])
  const [ password, setPassword ] = useState([])
  const [ errorMessage, setErrorMessage ] = useState('')
  let history = useHistory()

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })

      dispatchUser({ type: 'LOGIN', payload: { globalUser: user } })
      setUsername('')
      setPassword('')
      setShowModal(false)
    } catch (exception) {
      exception.response
      ?
      setErrorMessage(exception.response.data.error)
      :
      console.log(exception)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    { errorMessage? <span>{errorMessage}</span> : '' }
    <button type="submit">login</button>
    <span>or</span>
    <button onClick={ () => { history.push('/signup') }}>
      Sign up
    </button>
  </form>
  )

  return (
    <div className="aside_container">
      {loginForm()}
    </div>
  )
}

export default Login