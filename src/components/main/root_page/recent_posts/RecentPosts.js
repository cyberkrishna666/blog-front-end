import React, { useState, useEffect } from 'react'
import postService from '../../../../services/post'
import PostPreview from '../PostPreview'
import Spinner from '../../common/Spinner'

function MostCommentedPosts() {
  const [ recent, setRecent ] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    async function fetchMostLikedPosts() {
      try {
        const mostLikedPosts = await postService.getRecentPosts()
        setRecent(mostLikedPosts)
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

  const mapRecent = () => recent.map( post => {
    let previewText = post.preview
    if ( post.preview.length > 80 ) {
      previewText = post.preview.slice(0, 80).concat('...')
    }

    return (<PostPreview
    key={post.id}
    post={{...post, preview: previewText }}
    />)
  })

  return (
    <>
    { !loading &&
    <>
    <span className="category_heading">Most recent</span>
    <div className="most_recent_container">
      { mapRecent() }
    </div>
    </>
    }
    </>
  )
}

export default MostCommentedPosts