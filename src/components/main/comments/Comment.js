import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import commentService from '../../../services/comment'
import Dropdown from '../dropdown/Dropdown'
import Avatar from '../common/Avatar'
import { AuthContext } from '../../context/userContext'

function Comment(props) {
  const { userState } = useContext(AuthContext)
  const [ showKebab, setShowKebab ] = useState(false)
  const date = new Date(Date.parse(props.date)).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'})

  useEffect( () => {
    if ( userState.isAuthenticated ) {
      if ( userState.globalUser.id === props.author.id ) {
        setShowKebab(true)
      } else {
        setShowKebab(false)
      }
    }
  }, [userState.isAuthenticated, props.author.id, userState ])

  const handleCommentDelete = async () => {
    try {
      await commentService.deleteComment(props.post, props.commentId)
      props.setComments( props.comments.filter( comment => comment.id !== props.commentId ))
    } catch (error) {
      console.log('Error on attempt to delete comment: ' + error);
    }
  }

  return (
    <div className="comment">
      <header>
        <div className="comment_author">
          <Link to={`/@${props.author.username}`}>@{props.author.username}</Link>
          <span className="date">at {date}</span>
        </div>
        { showKebab &&
          <Dropdown>
            <div className="dropdown_button" onClick={handleCommentDelete}>Delete</div>
          </Dropdown>
        }
      </header>
      <div className="comment_content">
        <Avatar user={props.author} size={50} />
        <div className="comment_text">{props.content}</div>
      </div>
    </div>
  )
}

export default Comment