import React, { useState } from 'react'
import commentService from '../../../services/comment'

function AddComment({ user, comments, setComments, postId }) {
  const [ content, setContent ] = useState('')

  const addComment = async (event) => {
    event.preventDefault()

    const commentObject = {
      commentContent: content,
      user: user
    }

    try {
      const savedComment = await commentService.createComment( commentObject, postId )
      setContent('')
      setComments( comments.concat(savedComment))
      console.log('Comment added')
    } catch (error) {
      console.log('Comment not added ' + error)
    }
  }

  const addCommentForm = () => (
    <form className="add_comment" onSubmit={addComment}>
          <textarea 
            id="comment_content"
            name="content"
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />

              <button type="submit">Send</button>
    </form>
  )

  return (
    <div className="add_comment_container">
      { user === null ? 'Please login to add a comment' : addCommentForm() }
    </div>
  )
}

export default AddComment