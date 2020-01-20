import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import searchService from '../../services/search'

function PostsByAuthor({ Posts }) {
  const [ posts, setPosts ] = useState([])
  const [loading, setLoading] = useState(true)
  let location = useLocation()
  const { author } = useParams()
  const pagelessPagination = true
  const pageId = 1
  
  useEffect( () => {
    async function fetchAllPosts() {
      try {
        const allPosts = await searchService.getPostsBySearch({ author: author.substring(author.length - (author.length - 1)) })
        setPosts(allPosts)
        setTimeout( () => { setLoading(false) }, 300)
      } catch (exception) {
        console.log(exception)
      }
      return () => {
        setTimeout( () => { setLoading(false) }, 3000)
      }
    }

    fetchAllPosts()
  }, [ setPosts, location.key, author ])


  return (
    <>
    { loading ? <FontAwesomeIcon icon="spinner" spin /> : <Posts posts={posts} setPosts={setPosts} pageId={pageId} pagelessPagination={pagelessPagination} />}
    </>
  )
}

export default PostsByAuthor