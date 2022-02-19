import React from 'react';

function List(props) {
  return (
    <div className='container'>
        <p>{props.id}</p>
        <p>{props.name}</p>
        <p>{props.email}</p>
        <p>{props.body}</p>
        <hr />
    </div>
  )
}

export default List;

