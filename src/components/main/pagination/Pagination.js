import PageLink from './PageLink'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function Pagination({ posts, setPostsToShow, currentPage, setCurrentPage, totalPages, setTotalPages, baseLink, pagelessPagination }) {
  const POSTS_PER_PAGE = 5
  const FIRST_PAGE = 1
  const SECOND_PAGE = 2
  const PAGES_TO_SHOW = 3
  // const [ pagesToShow, setPagesToShow ] = useState([])
  // const [ lastPage, setLastPage ] = useState(posts.length/POSTS_PER_PAGE)
  const location = useLocation()

  
  useEffect( () => {
    const length = Math.ceil( posts.length/POSTS_PER_PAGE )
    setTotalPages([...Array(length)])
    console.log('Pages created: ' + length)
  }, [ currentPage, posts, setTotalPages, location.key ])
  
  
  useEffect( () => {
    let begin = currentPage === FIRST_PAGE ? 0 : ((currentPage * POSTS_PER_PAGE) - POSTS_PER_PAGE)
    let end = currentPage * POSTS_PER_PAGE
    setPostsToShow(posts.slice(begin, end))
  }, [ currentPage, posts, setPostsToShow, location.key ])
  
  const mapAllPages = () => totalPages.map( (page, pageNumber) => (
    currentPage === pageNumber + 1
    ?
    <span key={pageNumber + 1} style={ { marginLeft: "1rem", marginRight: "1rem" }}>{pageNumber + 1}</span>
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
    <div>
      { currentPage !== FIRST_PAGE ? <PageLink key={'first_page'} pushTo={FIRST_PAGE} text={'First'} baseLink={baseLink} pagelessPagination={pagelessPagination} setCurrentPage={setCurrentPage} /> : ''}

      { currentPage !== FIRST_PAGE ? <PageLink key={'previous_page'} pushTo={currentPage - 1} text={'Previous'} baseLink={baseLink} pagelessPagination={pagelessPagination} setCurrentPage={setCurrentPage}  /> : ''}

      {mapPagesToShow()}
      
      { currentPage !== totalPages.length ? <PageLink key={'next_page'} pushTo={currentPage + 1} text={'Next'} baseLink={baseLink} pagelessPagination={pagelessPagination} setCurrentPage={setCurrentPage} /> : ''}

      { currentPage !== totalPages.length ? <PageLink key={'last_page'} pushTo={totalPages.length} text={'Last'} baseLink={baseLink} pagelessPagination={pagelessPagination} setCurrentPage={setCurrentPage} /> : ''}
    </div>
  )
}

export default Pagination