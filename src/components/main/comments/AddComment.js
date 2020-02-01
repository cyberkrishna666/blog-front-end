import React, { useState, useContext } from 'react'
import commentService from '../../../services/comment'
import { AuthContext } from '../../context/userContext'
import { ModalContext } from '../../context/modalContext'
import ModalWindow from '../modal/ModalWindow'
import Login from '../authentication/Login'

function AddComment({ comments, setComments, postId }) {
  const [ content, setContent ] = useState('')
  const { userState } = useContext(AuthContext)
  const { modalState, dispatchModal } = useContext(ModalContext)

  const addComment = async (event) => {
    event.preventDefault()

    const commentObject = {
      commentContent: content,
      user: userState.globalUser
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
            required
            onChange={({ target }) => setContent(target.value)}
          />

          <button className="default_btn" type="submit">Send</button>
    </form>
  )

  const handleModal = () => {
    dispatchModal({ type: 'SHOW_MODAL'})
  }

  return (
    <div className="add_comment_container">
      {
      !userState.isAuthenticated
      ?
      <div>Please <button className="link_button" onClick={handleModal}>login</button> to add a comment</div>
      :
      userState.globalUser.role !== 'banned'
      ?
      addCommentForm()
      :
      'Sorry, you are banned forever.'
      }
      { modalState.showModal && <ModalWindow><Login /></ModalWindow>}
    </div>
  )
}

export default AddComment