import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { searchService } from '../../../services/search'
import Spinner from '../common/Spinner'

function SearchResults({ Posts }) {
  const [ posts, setPosts ] = useState([])
  const [loading, setLoading] = useState(true)
  let location = useLocation()
  const baseLink = `search?`
  const query = new URLSearchParams(location.search).get('q')
  const pageId = new URLSearchParams(location.search).get('p')
  const tag = new URLSearchParams(location.search).get('tag')
  const { cancelRequest, getPostsBySearch } = searchService()
  
  useEffect( () => {
    async function fetchAllPosts() {
      let fetchedPosts = []
      try {
        if (query) {
          fetchedPosts = await getPostsBySearch({ q: query })
        }
        if (tag) {
          fetchedPosts = await getPostsBySearch({ tag: tag })
        }
        if (fetchedPosts) {
          setPosts(fetchedPosts)
        }
        setTimeout( () => { setLoading(false) }, 300)
      } catch (exception) {
        setPosts([])
        setLoading(false)
      }
      return () => {
        setLoading(false)
        cancelRequest()
      }
    }

    fetchAllPosts()
  }, [ setPosts, location.key, cancelRequest, getPostsBySearch, query, tag ])


  return (
    <>
    { loading ?
    <Spinner />
    :
    posts.length ?
    <Posts posts={posts} setPosts={setPosts} baseLink={baseLink} pageId={pageId} />
    :
    <div className="not_found">NOTHING FOUND</div> }
    </>
  )
}

export default SearchResults