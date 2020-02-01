import React, {useState, useEffect, useContext} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/userContext'
import ActionsBar from '../post/ActionsBar'

function Post({ post }) {
  const { userState } = useContext(AuthContext)
  const [likes, setLikes] = useState(0)
  const [ isLiked, setIsLiked ] = useState(false)
  const location = useLocation()

  useEffect ( () => {
    setLikes(post.usersLiked.length)
  }, [ post.usersLiked, location.key ])

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

  const mapTags = () => post.tags.map( (tag, index) => (
    <Link
    className="tag_link"
    title="Search for posts with same tag"
    key={index}
    to={`/search?tag=${tag}&p=1`}>
      #{tag}
    </Link>
  ))

  return (
    <article className="post_container">
      { post.image ? <div className="preview_img" style={{ background: 'center / cover ' + post.image + ' no-repeat' }} /> : <div className="preview_img" style={{ background: post.noimage }} />}
      <div className="post_content">
        <header>
          <h2 className="post_title">
            <Link to={`/@${post.user.username}/${post.id}`} title="Go to full post page">{post.title}</Link>
          </h2>
        </header>
        <p className="preview">{post.preview}</p>
        <ActionsBar
          likes={likes}
          isLiked={isLiked}
          setLikes={setLikes}
          setIsLiked={setIsLiked}
          comments={post.comments.length}
          postId={post.id}
          username={post.user.username}
        />
        <div className="tags">{ mapTags() }</div>
      </div>
    </article>
  )
}

export default Post