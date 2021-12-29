import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

export default function CardDiv(props) {

  return (
    <Paper elevation={3} draggable={true} onDrop={(e)=>(e.preventDefault, console.log('bombito'))} onDragStart={()=>{props.setHoverOn(true)}} style={{
      width: "95%",
      backgroundColor: "white",
      height: "45%",
      margin: 'auto',
      marginTop: "20%",
    }}>
    <input type="text"></input>
    </Paper>
  )
}