import React from 'react';

function Aside(props) {
  return (
  <aside id={props.side}>{props.children}</aside>
)
}

export default Aside;