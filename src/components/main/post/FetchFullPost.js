import React, { useState, useEffect } from 'react'
import postService from '../../../services/post'
import Spinner from '../common/Spinner'
import { Redirect } from 'react-router-dom'

import { useParams } from 'react-router-dom'

function FetchFullPost({ FullPost, posts, setPosts }) {
  const [ data, setData ] = useState({})
  const [ errorFetching, setErrorFetching ] = useState(false)
  const [ loading, setLoading ] = useState(true)
  const [ editMode, setEditMode ] = useState(false)
  let { postId } = useParams()

  useEffect(() => {
    (async function () {
      try {
        const fetchedPost = await postService.getOnePost(postId)
          setData(fetchedPost)
          setTimeout( () => { setLoading(false) }, 300)
      } catch (exception) {
        setErrorFetching(exception)
        setLoading(false)
      }
      setLoading(false)
    })()

  }, [ postId ])

  return (
    <>
    { loading ? <Spinner />
    :
    <FullPost
    post={data}
    posts={posts}
    setPosts={setPosts}
    editMode={editMode}
    setEditMode={setEditMode} />
    }
    { errorFetching && <Redirect to="/404" /> }
    </>
  )
}

export default FetchFullPost
