import React from 'react'
import { Link } from 'react-router-dom'

function SingleMostLiked({ post }) {
  return (
    <div className="most_liked_container">
    <Link to ={`/@${post.user.username}/${post.id}`} >
      <h2>{post.title}</h2>
    </Link>
      <p>{post.preview}</p>
    </div>
  )
}

export default SingleMostLiked