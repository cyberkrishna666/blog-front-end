import React, { useContext } from 'react'
import likeService from '../../../services/like'
import { FaHeart, FaRegHeart, FaComment } from 'react-icons/fa'
import { AuthContext } from '../../context/userContext'
import { ModalContext } from '../../context/modalContext'
import { HashLink } from 'react-router-hash-link'

function ActionsBar({ likes, isLiked, setLikes, setIsLiked, comments, postId, username }) {
  const { userState } = useContext(AuthContext)
  const { dispatchModal } = useContext(ModalContext)

  async function handleLike() {
    setLikes(likes + 1)
    setIsLiked(true)
    try {
      await likeService.createLike(postId)
      console.log('like added')
    } catch (error) {
      console.log('error occured on attempt to add like')
    }
  }

  async function handleLikeRemoval() {
    setLikes(likes - 1)
    setIsLiked(false)
    await likeService.removeLike(postId)
    
    console.log('like removed')
  }

  const processLike = () => isLiked ? handleLikeRemoval : handleLike
  const processAuth = () => () => dispatchModal({ type: 'SHOW_MODAL'})

  return (
    <div className="full_post_bar">
    <div onClick={ userState.isAuthenticated ?
      userState.globalUser.role === 'banned' ?
      null
      :
      processLike()
      :
      processAuth()
      } className="likes" >
      {
      isLiked
      ?
      <button className="icon"><FaHeart /></button>
      :
      <button className="icon" style={{color: 'black'}}><FaRegHeart /></button>
      }
      <div className="badge" >
        {likes}
      </div>
    </div>

    <div className="comments">
      <HashLink
      to={`/@${username}/${postId}#comments`}
      scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'center' })}
      className="icon">
        <FaComment />
      </HashLink>
      <div className="badge" >
        {comments}
      </div>
    </div>

  </div>
  )
}

export default ActionsBar
