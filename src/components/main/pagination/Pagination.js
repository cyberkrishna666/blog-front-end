import PageLink from './PageLink'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function Pagination({ posts, setPostsToShow, currentPage, setCurrentPage, totalPages, setTotalPages, baseLink, pagelessPagination }) {
  const POSTS_PER_PAGE = 5
  const FIRST_PAGE = 1
  const SECOND_PAGE = 2
  const PAGES_TO_SHOW = 3
  const [ notFound, setNotFound ] = useState(false)
  const location = useLocation()

  
  useEffect( () => {
    const length = Math.ceil( posts.length/POSTS_PER_PAGE )
    setTotalPages([...Array(length)])
    if ( currentPage > length ) {
      console.log(currentPage + ' ' + length);
      
      setNotFound(true)
    } else {
      setNotFound(false)
    }
    console.log('Pages created: ' + length)
  }, [ currentPage, posts, setTotalPages, location.key, totalPages.length ])
  
  
  useEffect( () => {
    let begin = currentPage === FIRST_PAGE ? 0 : ((currentPage * POSTS_PER_PAGE) - POSTS_PER_PAGE)
    let end = currentPage * POSTS_PER_PAGE
    setPostsToShow(posts.slice(begin, end))
  }, [ currentPage, posts, setPostsToShow, location.key ])
  
  const mapAllPages = () => totalPages.map( (page, pageNumber) => (
    currentPage === pageNumber + 1
    ?
    <div className="current" key={pageNumber + 1}>{pageNumber + 1}</div>
    :
    <PageLink key={pageNumber + 1} setCurrentPage={setCurrentPage} pageNumber={pageNumber} pushTo={pageNumber + 1} pagelessPagination={pagelessPagination} />
    )
    )
    
    const mapPagesToShow = () => {
      const allPages = mapAllPages()

      if ( currentPage === FIRST_PAGE ) {
        return allPages.slice( currentPage - FIRST_PAGE, currentPage + PAGES_TO_SHOW )
      }

      if ( currentPage === SECOND_PAGE ) {
        return allPages.slice( currentPage - PAGES_TO_SHOW + 1, currentPage + PAGES_TO_SHOW - 1 )
      }

      return allPages.slice( currentPage - PAGES_TO_SHOW, currentPage + PAGES_TO_SHOW - 1)
    }

  return (
    <>
    { notFound ? <div className="not_found">no posts yet.</div> : 
    <div className="pagination">
      { currentPage !== FIRST_PAGE ? <PageLink key={'first_page'} pushTo={FIRST_PAGE} text={'First'} baseLink={baseLink} pagelessPagination={pagelessPagination} setCurrentPage={setCurrentPage} /> : ''}

      { currentPage !== FIRST_PAGE ? <PageLink key={'previous_page'} pushTo={currentPage - 1} text={'Previous'} baseLink={baseLink} pagelessPagination={pagelessPagination} setCurrentPage={setCurrentPage}  /> : ''}

      {mapPagesToShow()}
      
      { currentPage !== totalPages.length ? <PageLink key={'next_page'} pushTo={currentPage + 1} text={'Next'} baseLink={baseLink} pagelessPagination={pagelessPagination} setCurrentPage={setCurrentPage} /> : ''}

      { currentPage !== totalPages.length ? <PageLink key={'last_page'} pushTo={totalPages.length} text={'Last'} baseLink={baseLink} pagelessPagination={pagelessPagination} setCurrentPage={setCurrentPage} /> : ''}
    </div>
  }
  </>
  )
}

export default Pagination