import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({ palette: { mode: 'light' } });


export default function CardDiv(props) {

  return (
    <ThemeProvider theme={theme} >
      <Paper elevation={3} draggable={true} onDrop={(e) => (e.preventDefault, console.log('bombito'))} onDragStart={() => { props.setHoverOn(true) }} style={{
        width: "95%",
        backgroundColor: "white",
        height: "45%",
        margin: 'auto',
        marginTop: "20%",
      }}>
        <textarea name="paragraph_text" cols="50" rows="10"onChange={(e) => (props.setNoteInput(e.target.value))}></textarea>
      </Paper>
    </ThemeProvider>
  )
}