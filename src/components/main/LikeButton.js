import React from 'react'

function LikeButton(props) {
  return (
    <>
      <button style={{
          fontSize: '1.5rem',
          margin: '5px',
          padding: '5px',
          backgroundColor: 'white',
          border: 'none',
          cursor: 'pointer'
        }} 
        type="button">
          ❤
      </button>
    </>
  )
}

export default LikeButton