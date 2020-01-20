import React, {useState, useEffect, useContext} from 'react'
import likeService from '../../services/like'
import postService from '../../services/post'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '.././context/userContext'

function Post({post, posts, setPosts}) {
  const { userState } = useContext(AuthContext)
  const [likes, setLikes] = useState(0)
  const [ isLiked, setIsLiked ] = useState(false)
  const [ showDelete, setShowDelete ] = useState(false)
  const location = useLocation()

  useEffect ( () => {
    setLikes(post.usersLiked.length)
  }, [ post.usersLiked ])

  useEffect( () => {
    if (userState.isAuthenticated) {
      post.usersLiked.forEach( userLiked => {
        if (userLiked.user === userState.globalUser.id ) {
          setIsLiked(true)
        }
      })
    } else {
      setIsLiked(false)
    }
  },[userState, post.usersLiked, isLiked, location.key])

  useEffect( () => {
    console.log('isLiked: ' + isLiked )
  }, [isLiked, location.key])

  useEffect( () => {
    if(userState.isAuthenticated) {
      if (post.user.id === userState.globalUser.id) {
        setShowDelete(true)
      }
    } else {
      setShowDelete(false)
    }
  }, [posts, userState, post.user.id, location.key])

  async function handleLike(event) {
    event.preventDefault()
    
    post.usersLiked = post.usersLiked.concat({ user: userState.globalUser.id })
    setLikes(likes + 1)
    setIsLiked(true)
    try {
      
      await likeService.createLike(post.id)
      console.log(post.usersLiked)
      console.log('like added')
    } catch (error) {

    }
  }

  async function handleLikeRemoval(event) {
    event.preventDefault()
    
    post.usersLiked = post.usersLiked.filter( userLiked => userLiked.user !== userState.globalUser.id )
    setLikes(likes - 1)
    setIsLiked(false)
    try {
      await likeService.removeLike(post.id)
      console.log(post.usersLiked)
    } catch(error) {
      console.log(error);
    }

    console.log('like removed')
  }

  async function handleDeletePost(event) {
    await postService.deletePost(post.id)

    setPosts( posts.filter( current => current.id !== post.id ))
  }

  return (
    <div className="post_container">
      <h2 className="post_title"><Link to={`/@${post.user.username}/${post.id}`}>{post.title}</Link></h2>
      <p className="post_content">{post.preview}</p>

      {
      showDelete
      ?
      <span className="post_delete" onClick={handleDeletePost}>
        <i className="fas fa-trash"></i>
      </span>
      :
      ''
      }

      <div className="post_likes">
      <span onClick={isLiked ? handleLikeRemoval : handleLike}>
        {
        isLiked
        ?
        <FontAwesomeIcon icon={faHeart} />
        :
        <i className="far fa-heart" style={{ marginLeft: '10px'}}></i>
        }
      </span>
        {likes}
        <FontAwesomeIcon icon={faComment} />
        {post.comments.length}
      </div>
    </div>
  )
}

export default Post