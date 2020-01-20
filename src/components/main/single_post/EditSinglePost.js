import React, { useState } from 'react'
import postService from '../../../services/post'
import { useHistory } from "react-router-dom"

function EditSinglePost({ post, setPosts, posts, user, setEditMode, title, setTitle, content, setContent }) {
  const [ editTitle, setEditTitle ] = useState(title)
  const [ editContent, setEditContent ] = useState(content)
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
          <label htmlFor="title">Title:</label>
          <input 
            type="text"
            id="title"
            name="title"
            value={editTitle}
            onChange={({ target }) => setEditTitle(target.value)}
          />

          <label htmlFor="post_text">Post text:</label>
          <textarea 
            id="post_text"
            name="content"
            rows="25"
            value={editContent}
            onChange={({ target }) => setEditContent(target.value)}
          />

              <button type="submit">Save</button>
              <button type="discard" onClick={ () => { setEditMode()}}>Cancel</button>
    </form>
  )

  return (
    <div id="add_post" >
    { user === null ? 'Please login to add a post' : addPostForm() }
  </div>
  )

}

export default EditSinglePost