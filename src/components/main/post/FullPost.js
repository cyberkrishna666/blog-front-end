import React, {useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import ActionsBar from './ActionsBar'
import postService from '../../../services/post'
import Comments from '../comments/Comments'
import AddComment from '../comments/AddComment'
import EditSinglePost from './EditFullPost'
import { AuthContext } from '../../context/userContext'
import Dropdown from '../dropdown/Dropdown'
import Avatar from '../common/Avatar'

function SinglePost({ post, posts, setPosts }) {
  const { userState } = useContext(AuthContext)
  const [likes, setLikes] = useState(0)
  const [ title, setTitle] = useState(post.title)
  const [ content, setContent ] = useState(post.content)
  const [ isLiked, setIsLiked ] = useState(false)
  const [ showKebab, setShowKebab ] = useState(false)
  const [ comments, setComments ] = useState([])
  const [ editMode, setEditMode ] = useState(false)
  const history = useHistory()
  const date = new Date(Date.parse(post.date)).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })

  useEffect( () => {
    setLikes(post.usersLiked.length)
    setComments(post.comments)
  }, [ post, editMode ])

  useEffect( () => {
    if (userState.isAuthenticated) {
      post.usersLiked.forEach( userLiked => {
        if (userLiked.user === userState.globalUser.id) {
          setIsLiked(true)
        }
      })
    } else {
      setIsLiked(false)
    }
  },[ userState, post.usersLiked ])

  useEffect( () => {
    if(userState.isAuthenticated) {
      if (post.user.id === userState.globalUser.id) {
        setShowKebab(true)
      }
    } else {
      setShowKebab(false)
    }
  }, [ posts, userState, post.user.id ])
  
  async function handleDeletePost() {
    await postService.deletePost(post.id)
    
    setPosts( posts.filter( current => current.id !== post.id ))
    history.push('/')
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
        <div className="author">
        <Avatar user={post.user} size={34} />
        <div className="author_name">
          <Link to={`/@${post.user.username}`}>@{post.user.username}</Link>
          <div className="date">{date}</div>
        </div>
        </div>
          { showKebab &&
              <Dropdown>
                <div className="dropdown_button" onClick={handleDeletePost}>Delete</div>
                { editMode ?
                <div className="dropdown_button" onClick={handleEditPost}>Discard changes</div>
                :
                <div className="dropdown_button" onClick={handleEditPost}>Edit</div>
                }
              </Dropdown>
          }
      </header>
      { post.image && <div style={{ background: 'center / cover ' + post.image + ' no-repeat' }} className="post_img" />}
      <article className="full_post">
            { editMode ?
            <EditSinglePost
            post={post}
            posts={posts}
            setPosts={setPosts}
            setEditMode={handleEditPost}
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent} />
            :
            fullPost() }
            <ActionsBar
            likes={likes}
            isLiked={isLiked}
            setLikes={setLikes}
            setIsLiked={setIsLiked}
            comments={post.comments.length}
            postId={post.id} />
    </article>
    
    <AddComment comments={comments} setComments={setComments} postId={post.id} />

    <Comments comments={comments} setComments={setComments} />
    
    </div>
  )
}

export default SinglePost