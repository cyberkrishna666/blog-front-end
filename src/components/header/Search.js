import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function Search(props) {
  const [ search, setSearch ] = useState('')
  let history = useHistory()

  async function handleSearchSubmit (event) {
    event.preventDefault()
    const url = new URL('../search', 'http://localhost:3000/')
    url.searchParams.set('q', search)
    url.searchParams.append('p', 1)

    // const response = await searchService.getPostsBySearch(search)
    history.push(url.pathname + url.search)
    // console.log('Response for search query: ' + JSON.stringify(response))
  }

  return (
    <div className="search_bar">
      <form onSubmit={handleSearchSubmit}>
      <input value={search} onChange={({ target }) => setSearch(target.value)} type="search" name="q"></input>
      <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default Search