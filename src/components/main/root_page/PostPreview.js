import React from 'react'
import { Link } from 'react-router-dom'


function PostPreview({post}) {
  return (
    <div className="post_prview_container">
      { post.image ? <div className="preview_img" style={{ background: 'center / cover ' + post.image }} /> : <div className="preview_img" style={{ background: post.noimage }} />}
      <div className="post_content">
        <h2 className="post_title"><Link to={`/@${post.user.username}/${post.id}`}>{post.title}</Link></h2>
        <p className="preview">{post.preview}</p>

      </div>
    </div>
  )
}

export default PostPreview