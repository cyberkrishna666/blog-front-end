import { createContext } from 'react'

export const PostsContext = createContext()

export const postsInitialState = {
  posts: []
}

export const postsReducer = ( state, action ) => {
  switch(action.type) {
    case 'SET_POSTS':
      return {
        posts: action.newPosts
      }
    
    case 'CONCAT_POSTS':
      return {
        posts: state.posts.concat(action.newPosts)
      }

      default:
        return state
  }
}