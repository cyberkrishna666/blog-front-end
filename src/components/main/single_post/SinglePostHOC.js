import React, { useState } from 'react'
import useDataFetching from '../../../hooks/useDataFetching'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import postService from '../../../services/post'

import { useParams } from 'react-router-dom'

function SinglePostHOC({ SinglePost, posts, setPosts }) {
  const [ editMode, setEditMode ] = useState(false)
  let { postId } = useParams()
  const [ error, loading, post ] = useDataFetching(postService.getOnePost, postId)

  return (
    <>
    { loading ? <FontAwesomeIcon icon="spinner" spin /> : <SinglePost post={post} posts={posts} setPosts={setPosts} editMode={editMode} setEditMode={setEditMode} />}
    { error ? console.log(error) : '' }
    </>
  )
}

export default SinglePostHOC