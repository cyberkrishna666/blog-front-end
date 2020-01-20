import React from 'react'
import { Link } from 'react-router-dom'
import Search from '../header/Search'

const Nav = () => {
  return (
    <nav className="menu">
      <Link className="item" to="/">home</Link>
      <Link className="item" to="/feed/1">feed</Link>
	    <Link className="item" to="/add">add post</Link>
      <Search />
    </nav>
  )
}

export default Nav