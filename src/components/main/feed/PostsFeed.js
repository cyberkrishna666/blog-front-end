import React, { useEffect, useState, useContext } from 'react'
import postService from '../../../services/post'
import { useLocation, useParams } from "react-router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AuthContext } from '../../context/userContext'

function PostsFeed({ Posts, posts, setPosts }) {
  const { userState } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const { pageId } = useParams()
  let location = useLocation()
  
  useEffect( () => {
    async function fetchAllPosts() {
      try {
        const allPosts = await postService.getAllPosts()
        setPosts(allPosts)
        setTimeout( () => { setLoading(false) }, 300)
      } catch (exception) {
        console.log(exception)
      }
      return () => {
        setLoading(false)
      }
    }

    fetchAllPosts()
  }, [userState, setPosts, location.key])


  return (
    <>
    { loading ? <div className="spinner"><FontAwesomeIcon icon="spinner" spin /></div> : <Posts posts={posts} setPosts={setPosts} pageId={pageId} />}
    </>
  )
}

export default PostsFeed