import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { GoSearch } from 'react-icons/go'

function Search() {
  const [ search, setSearch ] = useState('')
  let history = useHistory()
  let location = useLocation()

  useEffect(() => {
    if ( !location.search ) {
      setSearch('')
    } else {
      const query = new URLSearchParams(location.search).get('q')
      if (query) {
        setSearch(query)
      }
    }
  },[ location.key, location.search ])

  async function handleSearchSubmit (event) {
    event.preventDefault()
    const url = new URL('../search', 'http://localhost:3000/')
    url.searchParams.set('q', search)
    url.searchParams.append('p', 1)
    history.push(url.pathname + url.search)
  }

  return (
    <div className="search_bar">
      <form className="search" onSubmit={handleSearchSubmit}>
        <input value={search} onChange={({ target }) => setSearch(target.value)} type="search" name="q"></input>
        <button type="submit"><GoSearch /></button>
      </form>
    </div>
  )
}

export default Search