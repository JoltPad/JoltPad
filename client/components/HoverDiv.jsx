import * as React from 'react';




export default function HoverDiv(props) {

  return (
    <div className={props.className} style={{backgroundColor: props.colorProps}}> This is a HoverDiv component</div>
  )

}