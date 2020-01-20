import { createContext } from 'react'

export const AuthContext = createContext()

export const userInitialState = {
  isAuthenticated: false,
  globalUser: window.localStorage.getItem('loggedUser')
}

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      window.localStorage.setItem('loggedUser', JSON.stringify(action.payload.globalUser))
      return {
        ...state,
        isAuthenticated: true,
        globalUser: action.payload.globalUser
      }

      case 'LOGOUT':
        window.localStorage.removeItem('loggedUser')
        return {
          ...state,
          isAuthenticated: false,
          globalUser: null
        }

      default:
        return state
  }
}