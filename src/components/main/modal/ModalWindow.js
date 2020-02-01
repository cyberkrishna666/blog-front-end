import React, { useRef, useCallback, useContext, useLayoutEffect } from 'react'
import { MdClose } from 'react-icons/md'
import { createPortal } from 'react-dom'
import { ModalContext } from '../.././context/modalContext'

function ModalWindow(props) {
  const { modalState, dispatchModal } = useContext(ModalContext)
  const refToModal = useRef()

  const handleClickOutside = useCallback((event) => {
    if ( refToModal.current && !refToModal.current.contains(event.target)) {
      if ( modalState.showModal ) {
        refToModal.current.style = 'opacity: 0'
        refToModal.current.parentNode.style = 'opacity: 0'
      } else {
        refToModal.current.style = 'opacity: 1'
        refToModal.current.parentNode.style = 'opacity: 1'
      }
      setTimeout( () => dispatchModal({ type: 'HIDE_MODAL'}), 300 )
    } 
  }, [ dispatchModal, modalState ])

  const handleEscapeButton = useCallback( (event) => {
    if (event.keyCode === 27) {
      if ( modalState.showModal ) {
        modalState.refToModal.current.style = 'opacity: 0'
        modalState.refToModal.current.parentNode.style = 'opacity: 0'
      } else {
        modalState.refToModal.current.style = 'opacity: 1'
        modalState.refToModal.current.parentNode.style = 'opacity: 1'
      }
      setTimeout( () => dispatchModal({ type: 'HIDE_MODAL'}), 300 )
    }
  }, [ dispatchModal, modalState ] )

  const handleCloseModal = () => {
    if ( modalState.showModal ) {
      refToModal.current.style = 'opacity: 0'
      refToModal.current.parentNode.style = 'opacity: 0'
    } else {
      refToModal.current.style = 'opacity: 1'
      refToModal.current.parentNode.style = 'opacity: 1'
    }
    setTimeout( () => dispatchModal({ type: 'HIDE_MODAL'}), 300 )
  }

  useLayoutEffect(() => {
    document.addEventListener("click", handleClickOutside)
    document.addEventListener("keydown", handleEscapeButton)
    return () => {

      document.removeEventListener("click", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeButton)
    }
  }, [ handleEscapeButton, handleClickOutside ])

  return createPortal(
    <div className="overlay">
      <div ref={refToModal} className="modal">
      <div className="close_button" onClick={handleCloseModal}><MdClose /></div>
        {props.children}
      </div>
    </div>,
    document.body
  )
}

export default ModalWindow