import React, { useEffect, useRef, useState } from 'react'
import commentService from '../../../services/comment'

function Comment(props) {
  const ref = useRef()
  const [ showDropDown, setShowDropDown ] = useState(false)

  const handleKebab = () => {
    setShowDropDown(true)
  }

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowDropDown(false)
      // alert("You clicked outside of me!");
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    }
  })

  // useEffect(() => {
  //   window.onclick = function(event) {
  //     if (!event.target.matches('.dropbtn')) {
  //       var dropdowns = document.getElementsByClassName("dropdown-content");
  //       var i;
  //       for (i = 0; i < dropdowns.length; i++) {
  //         var openDropdown = dropdowns[i];
  //         if (openDropdown.classList.contains('show')) {
  //           openDropdown.classList.remove('show');
  //         }
  //       }
  //     }
  //   } 
  // }, [])

  const handleCommentDelete = async () => {
    try {
      await commentService.deleteComment(props.post, props.commentId)
      props.setComments( props.comments.filter( comment => comment.id !== props.commentId ))
    } catch (error) {
      console.log('Error on attempt to delete comment: ' + error);
      
    }
  }

  return (
    <div className="comment">
      <header>
        <div className="comment_author">
          @{props.author.username} at {props.date}
        </div>
          <div ref={ref}>
            { props.user
            ?
            props.user.id === props.author.id
            ?
            <div className="comment_action_kebab">
            <button onClick={handleKebab} className="dropbtn">...</button>
            <div id={`myDropdown-${props.commentId}`} className={`dropdown-content ${ showDropDown ? 'show' : '' }`}>
            <button className="deleteComment" onClick={handleCommentDelete}>Delete</button>
            </div>
          </div>
            : '' : ''
            }
          </div>
      </header>
      <div className="comment_content">
        {props.content}
      </div>
    </div>
  )
}

export default Comment