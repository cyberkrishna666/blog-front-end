import React, { useState } from 'react'
import SingleMostLiked from '../root_page/most_liked/SingleMostLiked'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

function Carousel({ mostLiked }) {
  const [ transformStyle, setTransformStyle ] = useState({})
  const [ currentSlide, setCurrentSlide ] = useState(1)
  const SLIDES = 2

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
    <div className="carousel_wrapper">
        <div className="button_wrapper">
          <button onClick={currentSlide === 1 ? null : handleLeft}><FaArrowLeft/></button>
          <button onClick={currentSlide === SLIDES ? handleLast : handleRight}><FaArrowRight/></button>
        </div>
    <div className="carousel_container">
      <div className="carousel" style={transformStyle}>
        {mapPosts()}
      </div>
    </div>
    </div>
  )
}

export default Carousel