import React, { useEffect, useState, useContext } from 'react'
import postService from '../../../services/post'
import { useLocation, useParams } from "react-router"
import { AuthContext } from '../../context/userContext'
import Spinner from '../common/Spinner'

function PostsFeed({ Posts, posts, setPosts }) {
  const { userState } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const { pageId } = useParams()
  let location = useLocation()
  
  useEffect( () => {
    async function fetchAllPosts() {
      try {
        const allPosts = await postService.getAllPosts()
        if (allPosts) {
          setPosts(allPosts)
        }
        setLoading(false)
      } catch (exception) {
        console.log(exception)
      }
      return () => {
        setLoading(true)
      }
    }

    fetchAllPosts()
  }, [userState.isAuthenticated, setPosts, location.key])


  return (
    <>
    { loading ? <Spinner /> : <Posts posts={posts} setPosts={setPosts} pageId={pageId} />}
    </>
  )
}

export default PostsFeed