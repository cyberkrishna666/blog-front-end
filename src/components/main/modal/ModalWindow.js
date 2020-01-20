import React, { useRef, useEffect } from 'react'

function ModalWindow({ Component, ...props}) {
  const refToModal = useRef()

  function handleClickOutside(event) {
    if (refToModal.current && !refToModal.current.contains(event.target)) {
      props.setShowModal(false)
      // alert("You clicked outside of me!");
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    }
  })

  return (
    <div className="overlay">
      <div ref={refToModal} className="modal">
        <div className="close_button" onClick={ () => { props.setShowModal(false)}}>close</div>
        <Component setShowModal={props.setShowModal} />
      </div>
    </div>
  )
}

export default ModalWindow