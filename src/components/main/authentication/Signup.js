import React, { useState, useContext } from 'react'
import loginService from '../../../services/login'
import signupService from '../../../services/signup'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/userContext'

function Signup() {
  const [ username, setUsername ] = useState('')
  const [ name, setName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')
  const [ error, setError ] = useState('')
  const { dispatchUser } = useContext(AuthContext)
  let history = useHistory()

  const handleSignUp = async (event) => {
    event.preventDefault()

    if ( password === confirmPassword ) {
      const newUser = {
        username: username,
        name: name,
        lastName: lastName,
        password: password
      }
  
      try {
        await signupService.signup(newUser)
        const user = await loginService.login({ username: username, password: password })
        dispatchUser({ type: 'LOGIN', payload: { globalUser: user } })
        history.push(`/@${user.username}`)
      } catch (error) {
        console.log('Cannot create new user: ' + error.response.data.error)
        setError(error.response.data.error)
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
        onChange={({ target }) => {
          setError('')
          return setUsername(target.value)}}
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
    <label htmlFor="Name">Last name:</label>
        <input
        type="text"
        value={lastName}
        name="lastName"
        required
        onChange={({ target }) => setLastName(target.value)}
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
        onChange={({ target }) => { 
          if ( password !== target.value ) {
            setError('Passwords don\'t match!')
          } else {
            setError('')
          }
          return setConfirmPassword(target.value) }}
      />

    </div>
    <button className="default_btn" type="submit">Sign Up</button>
  </form>
  { error && <div className="error_message">{error}</div> }
  </div>
  )
}

export default Signup