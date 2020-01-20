import React, { useState, useContext } from 'react'
import loginService from '../../../services/login'
import signupService from '../../../services/signup'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/userContext'

function Signup() {
  const [ username, setUsername ] = useState('')
  const [ name, setName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')
  const { dispatchUser } = useContext(AuthContext)
  let history = useHistory()

  const handleSignUp = async (event) => {
    event.preventDefault()

    if ( password === confirmPassword ) {
      const newUser = {
        username: username,
        name: name,
        password: password
      }
  
      try {
        await signupService.signup(newUser)
        const user = await loginService.login({ username: username, password: password })
        dispatchUser({ type: 'LOGIN', payload: { globalUser: user } })
        history.push('/')
      } catch (error) {
        console.log('Cannot create new user: ' + error)
      }
    }

  }

  return (
    <div className="signup_container">
    <form className="signup_form" onSubmit={handleSignUp}>
    <div className="form_field">
      <label htmlFor="Username">Username:</label>
        <input
        type="text"
        value={username}
        name="Username"
        required
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>

    <div className="form_field">
    <label htmlFor="Name">Name:</label>
        <input
        type="text"
        value={name}
        name="Name"
        required
        onChange={({ target }) => setName(target.value)}
      />
    </div>

    <div className="form_field">
    <label htmlFor="Password">Password:</label>
        <input
        type="password"
        value={password}
        name="Password"
        required
        minLength="8"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>

    <div className="form_field">
    <label htmlFor="Confirm Password">Confirm password:</label>
        <input
        type="password"
        value={confirmPassword}
        name="Confirm Password"
        required
        onChange={({ target }) => setConfirmPassword(target.value)}
      />
    </div>

    <div>

    </div>
    <button type="submit">Sign Up</button>
  </form>
  </div>
  )
}

export default Signup