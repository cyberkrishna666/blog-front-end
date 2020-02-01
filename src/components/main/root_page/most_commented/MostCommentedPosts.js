import React, { useState, useEffect } from 'react'
import postService from '../../../../services/post'
import PostPreview from '../PostPreview'
import Spinner from '../../common/Spinner'

function MostCommentedPosts() {
  const [ mostCommented, setMostCommented ] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    async function fetchMostLikedPosts() {
      try {
        const mostLikedPosts = await postService.getMostCommentedPosts()
        setMostCommented(mostLikedPosts)
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

  const mapMostCommented = () => mostCommented.map( post => (
    <PostPreview
    key={post.id}
    post={{...post, preview: post.preview.slice(0, 100).concat('...')}}
    />
  ))

  return (
    <>
      { loading ? <Spinner />
      :
      <>
      <span className="category_heading">Top discussed</span>
      <div className="most_recent_container">
        {mapMostCommented()}
      </div>
      </>
      }
    </>
  )
}

export default MostCommentedPosts