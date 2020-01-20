import React from 'react'
import Comment from './Comment'

function Comments({ comments, setComments, user }) {

  const mapAllComments = () => comments.map( comment =>
    <Comment
      key={comment.id}
      content={comment.commentContent}
      user={user}
      author={comment.user}
      commentId={comment.id}
      comments={comments}
      setComments={setComments}
      post={comment.post}
      date={comment.date}
    />
  )

  return (
    <div className="comments_container">
      {mapAllComments()}
    </div>
  )
}

export default Comments