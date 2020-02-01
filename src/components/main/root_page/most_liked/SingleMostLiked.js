import React from 'react'
import { Link } from 'react-router-dom'

function SingleMostLiked({ post }) {
  return (
    <div className="most_liked_container">
    { post.image ? <div className="preview_img" style={{ background: post.image }} /> : <div className="preview_img" style={{ background: 'center / cover ' + post.noimage + ' no-repeat' }} />}
      <div className="post_content">
        <h2 className="post_title"><Link to={`/@${post.user.username}/${post.id}`}>{post.title}</Link></h2>
        </div>
    </div>
  )
}

export default SingleMostLiked