import React, { useState } from 'react'
import SingleMostLiked from '../root_page/most_liked/SingleMostLiked'

function Carousel({ mostLiked }) {
  const [ transformStyle, setTransformStyle ] = useState({})
  const [ currentSlide, setCurrentSlide ] = useState(1)
  const SLIDES = 3

  const mapPosts = () => mostLiked.map( post =>
    <SingleMostLiked 
      key={post.id}
      post={post}
    />
  )

  function handleRight () {
    setCurrentSlide( currentSlide + 1)
    setTransformStyle({ transform: `translateX(-${currentSlide * 100}%)` })

  }

  function handleLeft () {
    // setTransformStyle({ transform: `translateX(-${currentOffset - OFFSET}px)` })
    setCurrentSlide( currentSlide - 1)
    setTransformStyle({ transform: `translateX(-${(currentSlide - 2) * 100}%)` })

  }

  function handleLast () {
    setTransformStyle({ transform: `translateX(-0%)` })
    setCurrentSlide( 1 )
  }

  return (
    <div className="carousel_container">
      <div className="carousel" style={transformStyle}>
        {mapPosts()}
      </div>
        <div className="button_wrapper">
  <button onClick={currentSlide === 1 ? null : handleLeft}>{'<'}</button>
  <button onClick={currentSlide === SLIDES ? handleLast : handleRight}>{'>'}</button>
        </div>
    </div>
  )
}

export default Carousel