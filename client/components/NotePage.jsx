import React, { useState } from 'react';
import NavBar from './NavBar.jsx'
import HoverDiv from './HoverDiv.jsx';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import CardDiv from './CardDiv.jsx';
import { Button } from '@mui/material';
import DailyContainer from '../containers/DailyContainer.jsx';
import Joltpad from '../assets/joltpad.png';

export default function NotePage() {

  const [hoverOn, setHoverOn] = useState(false);
  const [dailyDashOn, setDailyDashOn] = useState(true);
  const [calendarViewOn, setCalendarViewOn] = useState(false);
  const [editingOn, setEditingOn] = useState(false)
  const [noteInput, setNoteInput] = useState('')


  //send update note
  const updateNote = () => {
    const body = {
      user_id: localStorage.userID,
      contents: noteInput
    }
    fetch('http://localhost:3000/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).catch(err => console.log('error in updateNote fetch', err));
  }

  //send delete note
  const deleteNote = () => {
    fetch(`http://localhost:3000/deleteNote/`)
  } 
  return (
    // <DailyContainer className="daily-container"/>
    <div className='LandingPage'>
      <Row className='topRow'>
        <Col span={24}> 
          {(hoverOn)? <HoverDiv noteInput={noteInput} hoverOn={hoverOn} setHoverOn={setHoverOn} colorProps={'pink'} className='hoverDiv1'  categoryID = '1'/> : <NavBar />}
        </Col>
      </Row>
      {(dailyDashOn) ?
      <>
      <Row className='middleRow'>
        <Col span={1}>
          <HoverDiv noteInput={noteInput} hoverOn={hoverOn} setHoverOn={setHoverOn} colorProps={'aquamarine'} className='hoverDiv2' categoryID = '2' / > 
        </Col>
        <Col span={22}>
          {/* can export the following div to be its own component */}
          <div className='notepage'>
            <div>.</div>
            <CardDiv noteInput={noteInput} setNoteInput={setNoteInput} hoverOn={hoverOn} setHoverOn={setHoverOn} />
            <img src={Joltpad} className='imgJolt'/> 
            {/* can add a conditional statement to only render the following when hoverOn is false */}

            <Button style ={{position: 'absolute', left:'0', bottom:'0'}} onClick={() => setCalendarViewOn(false)}> Calendar </Button>
            <Button style ={{position: 'absolute', right:'0', bottom:'0'}} onClick={() => setDailyDashOn(false)}> Daily Dash </Button>
          </div>
        </Col>
        <Col span={1}>
        <HoverDiv noteInput={noteInput} hoverOn={hoverOn} setHoverOn={setHoverOn} colorProps={'orange'} className='hoverDiv3' categoryID = '3'/ >
        </Col>
      </Row>
      <Row className='botRow'>
        <Col span={24}> 
          <HoverDiv noteInput={noteInput} hoverOn={hoverOn} setHoverOn={setHoverOn} colorProps={'yellow'} className='hoverDiv4' categoryID = '4'/ >
        </Col>
      </Row></> : <DailyContainer className="daily-container"/>}
    </div>
  )
}