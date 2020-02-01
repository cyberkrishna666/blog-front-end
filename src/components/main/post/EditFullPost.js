import React, { useState, useContext } from 'react'
import postService from '../../../services/post'
import { useHistory } from "react-router-dom"
import { AuthContext } from '../../context/userContext'

function EditSinglePost({ post, setPosts, posts, setEditMode, title, setTitle, content, setContent }) {
  const [ editTitle, setEditTitle ] = useState(title)
  const [ editContent, setEditContent ] = useState(content)
  const { userState } = useContext(AuthContext)
  let history = useHistory()

  const putPost = async (event) => {
    event.preventDefault()

    const postObject = {
      title: editTitle,
      content: editContent
    }
    
    try {
      await postService.updatePost(postObject, post.id)
      setTitle(editTitle)
      setContent(editContent)
      setPosts(posts.map( currentPost => {
        if (currentPost.id === post.id ) {
          currentPost.title = title
          currentPost.content = content
        }
        
        return currentPost
      }))
      setEditMode()
      console.log('Post updated')
      history.push(`/blogs/${post.id}`)
    } catch (exception) {
      console.log('Cannot update post: ' + exception)
    }
  }

  const addPostForm = () => (
    <form className="edit_post" onSubmit={putPost}>
          <input 
            type="text"
            id="title"
            name="title"
            value={editTitle}
            autoFocus
            onChange={({ target }) => setEditTitle(target.value)}
          />

          <textarea 
            id="post_text"
            name="content"
            rows="25"
            value={editContent}
            onChange={({ target }) => setEditContent(target.value)}
          />
          <section className="edit_btns">
              <button className="default_btn" type="submit">Save</button>
              <button className="default_btn" type="discard" onClick={ () => { setEditMode()}}>Cancel</button>
          </section>
    </form>
  )

  return (
    <div id="add_post" >
      { userState.isAuthenticated ? addPostForm() : 'Please login to add a post' }
    </div>
  )

}

export default EditSinglePost