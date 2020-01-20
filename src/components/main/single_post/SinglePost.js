import React, {useState, useEffect, useRef, useContext, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { FaRegHeart, FaHeart } from 'react-icons/fa'

import likeService from '../../../services/like'
import postService from '../../../services/post'
import Comments from '../comments/Comments'
import AddComment from '../comments/AddComment'
import EditSinglePost from './EditSinglePost'
import { AuthContext } from '../../context/userContext'

function SinglePost({ post, posts, setPosts }) {
  const { userState } = useContext(AuthContext)
  const [likes, setLikes] = useState(0)
  const [ title, setTitle] = useState(post.title)
  const [ content, setContent ] = useState(post.content)
  const [ isLiked, setIsLiked ] = useState(false)
  const [ showKebab, setShowKebab ] = useState(false)
  const [ comments, setComments ] = useState([])
  const [ editMode, setEditMode ] = useState(false)
  const [ showDropDown, setShowDropDown ] = useState(false)
  const ref = useRef()
  const history = useHistory()

  const handleClickOutside = useCallback( event => {
    if (ref.current && !ref.current.contains(event.target)) {
       setShowDropDown(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  }, [])
  

  useEffect( () => {
    setLikes(post.usersLiked.length)
    setComments(post.comments)
  }, [ post, editMode ])

  useEffect( () => {
    if (userState.isAuthenticated) {
      post.usersLiked.forEach( userLiked => {
        console.log('users that liked: ' + JSON.stringify(post.usersLiked))
        if (userLiked.user === userState.globalUser.id) {
          setIsLiked(true)
        }
      })
    } else {
      setIsLiked(false)
    }
  },[ userState, post.usersLiked ])

  useEffect( () => {
    console.log('isLiked: ' + isLiked )
  }, [isLiked])

  useEffect( () => {
    if(userState.isAuthenticated) {
      if (post.user.id === userState.globalUser.id) {
        setShowKebab(true)
      }
    } else {
      setShowKebab(false)
    }
  }, [ posts, userState, post.user.id ])

  async function handleLike() {    
    setLikes(likes + 1)
    setIsLiked(true)
    try {
      await likeService.createLike(post.id)
      console.log('like added')
    } catch (error) {
      console.log('error occured on attempt to add like')
    }
  }

  
  async function handleLikeRemoval() {
    setLikes(likes - 1)
    setIsLiked(false)
    await likeService.removeLike(post.id)
    
    console.log('like removed')
  }
  
  async function handleDeletePost() {
    await postService.deletePost(post.id)
    
    setPosts( posts.filter( current => current.id !== post.id ))
    history.push('/')
  }
  
  const handleKebab = () => {
    setShowDropDown(!showDropDown)
  }

  function handleEditPost() {
    setEditMode(!editMode)
  }

  function fullPost () {
    return (
      <>
      <header className="full_post_header">
        <div className="full_post_title">
          <h2>{title}</h2>
        </div>
      </header>
    <div className="full_post_content">
      <div dangerouslySetInnerHTML={{__html: content}}/>
    </div>
    </>
    )
  }

  return (
    <div className="full_post_container">
      <header className="container_top">
        <div className="author_name">
          <Link to={`/@${post.user.username}`}>@{post.user.username}</Link>
        </div>
        <div ref={ref}>
          {
            showKebab
            ?
            <div className="comment_action_kebab">
              <button onClick={handleKebab} className="dropbtn">...</button>
              <div id={`myDropdown`} className={`dropdown-content ${ showDropDown ? 'show' : '' }`} >
              <button className="deleteComment" onClick={handleDeletePost}>Delete</button>
              { editMode ?
              <button className="dropdown" onClick={handleEditPost}>Discard changes</button>
              :
              <button className="dropdown" onClick={handleEditPost}>Edit</button>
              }
              </div>
            </div>
            :
            ''
          }
          </div>
      </header>
      <article className="full_post">
            <img src={post.image} alt="alt text" />
            { editMode ? <EditSinglePost post={post} posts={posts} setPosts={setPosts} setEditMode={handleEditPost} title={title} setTitle={setTitle} content={content} setContent={setContent} /> : fullPost() }

      <section className="actions_bar">
        <span className="post_like_button" onClick={isLiked ? handleLikeRemoval : handleLike}>
          {isLiked
          ?
          <FaHeart />
          :
          <FaRegHeart />
          }
          <span className="likes_counter">{likes}</span>
        </span>
      </section>
    </article>
    
    <AddComment comments={comments} setComments={setComments} postId={post.id} />

    <Comments comments={comments} setComments={setComments} />
    
    </div>
  )
}

export default SinglePost