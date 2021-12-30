import React, { useState, useEffect } from 'react';
const axios = require('axios');



export default function HoverDiv(props) {

  const [style, setStyle] = useState({})
  const [insideText, setInsideText] = useState('')


  const categoryText = {
    '1': 'To Do',
    '2': 'Shopping',
    '3': 'Ideas',
    '4': 'General',
  }

  function divText (a) {
    if (props.hoverOn) {
      return categoryText[a]
    } 
  }
  // function setColor(color) {
  //   const obj = {
  //     box-shadow: `inset 0 0 50px ${color},inset 20px 0 80px ${color},inset - 20px 0 80px ${color},inset 20px 0 300px ${color},inset - 20px 0 300px ${color},0 0 20px ${color},-10px 0 40px ${color},10px 0 40px ${color};`
  
  //   }
  //   console.log(color)
  //   return {box}
  // }

  function isHover() {
    if (props.hoverOn) {
      const myMessage = 'inset 0 0 50px #fff, inset 20px 0 80px #f0f, inset -20px 0 80px #0ff, inset 20px 0 300px #f0f, inset -20px 0 300px #0ff, 0 0 20px #fff, -10px 0 40px #f0f, 10px 0 40px #0ff';
      const newMessage = myMessage.replace(/#f0f/g, props.colorProps);
      return {boxShadow: newMessage}
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

    const params = { user_id: localStorage.userID, category_id: props.categoryID, contents: props.noteInput };
    
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
    console.log(style)
    setInsideText(divText(props.categoryID));
  }, [props.hoverOn]);

  return (
    <div className={props.className}
      onDrop={e => handleDrop(e)}
      onDragOver={e => handleDragOver(e)}
      onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}
      style={style}>
        <div className={'childHoverDiv' + props.categoryID}>{insideText}</div>
    </div>
  )

}