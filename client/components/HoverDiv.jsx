import React, { useState, useEffect } from 'react';
const axios = require('axios');



export default function HoverDiv(props) {

  const [style, setStyle] = useState({})
  const [insideText, setInsideText] = useState('')


  const categoryText = {
    '1': ['To Do', 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)'],
    '2': ['Shopping', 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)'],
    '3': ['Ideas','linear-gradient(to right, #43e97b 0%, #38f9d7 100%)'],
    '4': ['General','linear-gradient(to top, #5ee7df 0%, #b490ca 100%)'],
  }

  function divText (a) {
    if (props.hoverOn) {
      return categoryText[a][0]
    } 
  }

  function isHover() {
    if (props.hoverOn) {
      const myMessage = categoryText[props.categoryID][1];
      console.log(props.categoryID, myMessage);
      // const newMessage = myMessage.replace(/#f0f/g, props.colorProps);
      return { backgroundImage : myMessage}
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
    console.log('this is the style',style)
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