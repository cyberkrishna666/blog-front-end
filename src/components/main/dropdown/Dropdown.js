import React, { useCallback, useState, useEffect, useRef } from 'react'
import { GoKebabHorizontal } from 'react-icons/go'

function Dropdown(props) {
  const [ showDropDown, setShowDropDown ] = useState(false)
  const dropDownRef = useRef()
  
  const handleClickOutside = useCallback( event => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
       setShowDropDown(false)
    }
  }, [])

  const handleKebab = () => {
    setShowDropDown(!showDropDown)
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  }, [ handleClickOutside ])

  return (
    <div className="action_kebab" >
      <div ref={dropDownRef} onClick={handleKebab} className="dropbtn"><GoKebabHorizontal /></div>
      { showDropDown &&
      <>
      <div id={`myDropdown`} className='dropdown-content'>
      {props.children}
      </div>
      </>
      }
      </div>
  )
}

export default Dropdown