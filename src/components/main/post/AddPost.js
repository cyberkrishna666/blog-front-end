import React, {useState, useContext } from 'react'
import postService from '../../../services/post'
import { useHistory } from "react-router-dom"
import { AuthContext } from '../../context/userContext'

function AddPost() {
  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')
  const [ preview, setPreview ] = useState('')
  const [ tags, setTags ] = useState('')
  const [ file, setFile ] = useState('')
  const { userState } = useContext(AuthContext)
  let history = useHistory()

  const addPost = async (event) => {
    event.preventDefault()

    const postObject = new FormData()
    postObject.append('title', title)
    postObject.append('preview', preview)
    postObject.append('content', content)
    if (event.target.image.files[0]) {
      postObject.append('image', event.target.image.files[0])
    }
    postObject.append('tags', JSON.stringify(tags.split(' ')))
    try {
      const savedPost = await postService.createPost(postObject)
      setTitle('')
      setContent('')
      console.log('Post created')
      history.push(`/${savedPost.postUrl}`)
    } catch (exception) {
      console.log('Cannot create post')
    }
  }

  const handleTagsInput = (value) => {
    const restrictedChars = /[^a-z0-9\s.]/gi
    if ( !restrictedChars.test(value)) {
      setTags(value)
    } 
  }

  const handleImage = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    if (file) {
      reader.readAsDataURL(file)
    }
    reader.onloadend = () => {
      setFile(reader.result)
    }
  }

  const addPostForm = () => (
    <form className="add_post_form" id="add_post" encType="multipart/form-data" onSubmit={addPost}>
          <textarea
            type="text"
            id="title"
            name="title"
            rows="1"
            className="title"
            maxLength="100"
            required
            value={title}
            placeholder="Title"
            onChange={({ target }) => setTitle(target.value)}
          />

          <textarea 
            id="preview"
            name="preview"
            className="preview"
            maxLength="350"
            rows="3"
            required
            value={preview}
            placeholder={'Preview text'}
            onChange={({ target }) => setPreview(target.value)}
          />

          <textarea 
            id="post_text"
            className="post_text"
            name="content"
            rows="10"
            required
            value={content}
            placeholder={'Post text'}
            onChange={({ target }) => setContent(target.value)}
          />

          <div className="form_bar">
          <input 
            type="text"
            id="tags"
            name="tags"
            className="tags"
            required
            value={tags}
            placeholder={'Add some tags separated by spaces'}
            onChange={({ target }) => handleTagsInput(target.value)}
          />

          <label className="image_upload" htmlFor="image">Add image</label>
          <input className="upload" onChange={(event) => handleImage(event)} type="file" id="image" name="image" accept="image/png, image/jpeg" />
          </div>

          { file && <div className="preview_image">
            <img src={file} alt="preview"/>
            </div>
          }
          <button className="default_btn" type="submit">Publish</button>
    </form>
  )

  return (
    <div id="add_post" className="add_post_container">
      { userState.isAuthenticated ? userState.globalUser.role !== 'banned' ?
      addPostForm()
      : 'Sorry, you are banned forever.'
      : 'Please login to add a post' }
    </div>
  )
}

export default AddPost