import React, { useState, useEffect } from 'react';
const axios = require('axios');



export default function HoverDiv(props) {

  const [style, setStyle] = useState({})


  const categoryText = {
    '1': 'To Do',
    '2': 'Shopping',
    '3': 'Ideas',
    '4': 'General',
  }

  function isHover() {
    if (props.hoverOn) {
      return { backgroundColor: props.colorProps }
    }
  }
  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log('dropped');
    console.log(props.className);
    props.setHoverOn(false);
    const cardText = document.querySelector('#card-input').value
    document.querySelector('#card-input').value = ''

    const params = { user_id: localStorage.userID, category_id: props.categoryID, contents: cardText };
    
    axios
      .post("/add", params)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log("error adding a card: ", err);
      });
  };

  useEffect(() => {
    setStyle(isHover());
  }, [props.hoverOn]);

  return (
    <div className={props.className}
      onDrop={e => handleDrop(e)}
      onDragOver={e => handleDragOver(e)}
      onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}
      style={style}>
        {categoryText[props.user_id]}
    </div>
  )

}