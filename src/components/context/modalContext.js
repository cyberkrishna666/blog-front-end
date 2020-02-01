import { createContext } from 'react'

export const ModalContext = createContext()

export const modalInitialState = {
  refToModal: null,
  showModal: false
}

export const modalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_REF':
      return {
        ...state,
        refToModal: action.payload.refToModal
      }
    case 'SHOW_MODAL':
      return {
        ...state,
        showModal: true
      }

      case 'HIDE_MODAL':
        return {
          ...state,
          showModal: false,
        }

      default:
        return state
  }
}