import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

function PageLink({ pushTo, text, baseLink, pagelessPagination, setCurrentPage }) {
  const history = useHistory()
  const location = useLocation()

  function handlePageChange () {
    history.push(`${pushTo}`)
  }

  function handleQueryChange () {
    const url = new URLSearchParams(location.search)
    url.set('p', pushTo)
    history.push(`${location.pathname}?${url}`)
  }

  function handlePagelessPagination () {
    setCurrentPage(pushTo)
  }

  return (
    <button className="page_link" onClick={ location.search ? handleQueryChange : pagelessPagination? handlePagelessPagination : handlePageChange }>
      { text ? text : pushTo }
    </button>
  )
}

export default PageLink