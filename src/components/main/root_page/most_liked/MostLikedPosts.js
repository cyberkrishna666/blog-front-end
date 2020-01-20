import React, { useState, useEffect } from 'react'
import postService from '../../../../services/post'
import Carousel from '../../carousel/Carousel'

function MostLikedPosts(props) {
  const [ mostLiked, setMostLiked ] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect( () => {
    async function fetchMostLikedPosts() {
      try {
        const mostLikedPosts = await postService.getMostLikedPosts()
        setMostLiked(mostLikedPosts)
        setTimeout( () => { setLoading(false) }, 300)
      } catch (exception) {
        console.log(exception)
      }
      return () => {
        setLoading(false)
      }
    }

    fetchMostLikedPosts()
  }, [])

  return (
    <div>
      { loading ? 'loading...' : <Carousel mostLiked={mostLiked} /> }
    </div>
  )
}

export default MostLikedPosts