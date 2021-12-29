import React, { useState, useEffect } from 'react';



export default function HoverDiv(props) {

const [style, setStyle] = useState({})
function isHover () {
  if (props.hoverOn) {
    return {backgroundColor: props.colorProps}
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
  console.log(props.className)
};

useEffect(() => {
  setStyle(isHover());
  console.log(style);
}, [props.hoverOn]);

  return (
    <div className={props.className} 
      onDrop={e => handleDrop(e)}
      onDragOver={e => handleDragOver(e)}
      onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}    
      style={style}> 
    </div>
  )

}