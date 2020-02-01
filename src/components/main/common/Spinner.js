import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Spinner(props) {
  return (
    <div className="spinner"><FontAwesomeIcon icon="spinner" spin /></div>
  )
}

export default Spinner