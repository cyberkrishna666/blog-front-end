import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { searchService } from '../../../services/search'
import Spinner from '../common/Spinner'

function PostsByAuthor({ Posts }) {
  const [ posts, setPosts ] = useState([])
  const [loading, setLoading] = useState(true)
  const { author } = useParams()
  const pagelessPagination = true
  const pageId = 1
  const { getPostsBySearch, cancelRequest } = searchService()
  let location = useLocation()
  
  useEffect( () => {
    (async function () {
      try {
        const allPosts = await getPostsBySearch({ author: author.substring(author.length - (author.length - 1)) })
        if (allPosts) {
          setLoading(false)
          setPosts(allPosts)
        }
      } catch (exception) {
        setLoading(false)
        console.log(exception)
      }

      setLoading(false)
    })()

    return () => {
      cancelRequest('Posts by search cancelled!')
    }
  }, [ setPosts, location.key, author ])


  return (
    <>
    { loading ? <Spinner />
    :
    <Posts posts={posts} setPosts={setPosts} pageId={pageId} pagelessPagination={pagelessPagination}/>
    }
    </>
  )
}

export default PostsByAuthor