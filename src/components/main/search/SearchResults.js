import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import searchService from '../../../services/search'

function SearchResults({ Posts }) {
  const [ posts, setPosts ] = useState([])
  const [loading, setLoading] = useState(true)
  let location = useLocation()
  const baseLink = `search?`
  const pageId = new URLSearchParams(location.search).get('p')
  
  useEffect( () => {
    async function fetchAllPosts() {
      try {
        const allPosts = await searchService.getPostsBySearch({ q: new URLSearchParams(location.search).get('q') })
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
  }, [ setPosts, location.key, location.search])


  return (
    <>
    { loading ? <FontAwesomeIcon icon="spinner" spin /> : <Posts posts={posts} setPosts={setPosts} baseLink={baseLink} pageId={pageId} />}
    </>
  )
}

export default SearchResults