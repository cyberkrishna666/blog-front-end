import React, {useState} from 'react'
import postService from '../../services/post'
import { useHistory } from "react-router-dom"

function AddPost({ setPosts, posts, user }) {
  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')
  const [ preview, setPreview ] = useState('')
  const [ tags, setTags ] = useState('')
  let history = useHistory()

  const addPost = async (event) => {
    event.preventDefault()

    const postObject = new FormData()
    postObject.append('title', title)
    postObject.append('preview', preview)
    postObject.append('content', content)
    if (event.target.image.files[0]) {postObject.append('image', event.target.image.files[0])}
    postObject.append('tags', tags.split(' '))
    try {
      const savedPost = await postService.createPost(postObject)
      setTitle('')
      setContent('')
      // setPosts(posts.concat(savedPost))
      console.log('Post created')
      history.push(`/${savedPost.postUrl}`)
    } catch (exception) {
      console.log('Cannot create post')
    }
  }

  const addPostForm = () => (
    <form id="add_post" encType="multipart/form-data" onSubmit={addPost}>
          <label htmlFor="title">Title:</label>
          <input 
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />

          <label htmlFor="preview">Preview text:</label>
          <textarea 
            id="preview_text"
            name="preview"
            value={preview}
            placeholder={'HTML tags have no effect here'}
            onChange={({ target }) => setPreview(target.value)}
          />

          <label htmlFor="post_text">Post text:</label>
          <textarea 
            id="post_text"
            name="content"
            value={content}
            placeholder={'You can use html tags here'}
            onChange={({ target }) => setContent(target.value)}
          />

          {/* <label htmlFor="title">Tags:</label> */}
          <input 
            type="text"
            id="tags"
            name="tags"
            value={tags}
            placeholder={'Add some tags separated by spaces'}
            onChange={({ target }) => setTags(target.value)}
          />

          <label htmlFor="post_text">Image:</label>
          <input type="file" id="image" name="image" accept="image/png, image/jpeg" />

              <button type="submit">Send</button>
    </form>
  )

  return (
    <div id="add_post" className="add_post_container">
    { user === null ? 'Please login to add a post' : addPostForm() }
  </div>
  )
}

export default AddPost