import React from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

function Footer(props) {
  let history = useHistory()

  return (
  <footer className="main_footer">
    <button onClick={ () => history.push('/about')} className="about_us"><FaInfoCircle /></button>
  </footer>
  )
}

export default Footer