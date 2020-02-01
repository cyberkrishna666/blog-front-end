import React, { useState, useEffect } from 'react'
import postService from '../../../../services/post'
import Carousel from '../../carousel/Carousel'

function MostLikedPosts() {
  const [ mostLiked, setMostLiked ] = useState([])
  const [loading, setLoading] = useState(true)

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
    <>
    { !loading && 
    <div className="category_block">
      <div className="category_heading">Top liked</div>
      <div>
       <Carousel mostLiked={mostLiked} />
      </div>
    </div>
    }
    </>
  )
}

export default MostLikedPosts