import React, { useState, useEffect } from 'react'
import Post from './Post'
import Pagination from '../pagination/Pagination'

function Posts({ posts, setPosts, pageId, pagelessPagination }) {
  const [ postsToShow, setPostsToShow ] = useState(posts)
  const [ currentPage, setCurrentPage ] = useState(Number(pageId))
  const [ totalPages, setTotalPages ] = useState([null])

  useEffect( () => {
    setCurrentPage(Number(pageId))
  }, [ pageId ])

  const mapAllPosts = () => postsToShow.map( post =>
      <Post
      key={post.id}
      post={post}
      posts={posts}
      setPosts={setPosts}
      />
    )

  return (
    <>
      {mapAllPosts()}

      <Pagination
      posts={posts}
      setPostsToShow={setPostsToShow}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
      setTotalPages={setTotalPages}
      pagelessPagination={pagelessPagination}
      />
    </>
  )
}

export default Posts