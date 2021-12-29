import React, { useState } from 'react';
import NavBar from './NavBar.jsx'
import HoverDiv from './HoverDiv.jsx';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import CardDiv from './CardDiv.jsx';
import { Button } from '@mui/material';
import DailyContainer from '../containers/DailyContainer.jsx';

export default function NotePage() {

  const [hoverOn, setHoverOn] = useState(false);
  const [dailyDashOn, setDailyDashOn] = useState(true);
  const [calendarViewOn, setCalendarViewOn] = useState(false);
  const [editingOn, setEditingOn] = useState(false)
  const [noteInput, setNoteInput] = useState('')

  return (
    // <DailyContainer className="daily-container"/>
    <div className='LandingPage'>
      <Row className='topRow'>
        <Col span={24}> 
          {(hoverOn)? <HoverDiv hoverOn={hoverOn} colorProps={'pink'} className='hoverDiv1' / > : <NavBar />}
        </Col>
      </Row>
      {(dailyDashOn) ?
      <>
      <Row className='middleRow'>
        <Col span={1}>
          <HoverDiv hoverOn={hoverOn} colorProps={'blue'} className='hoverDiv2' / > 
        </Col>
        <Col span={22}>
          {/* can export the following div to be its own component */}
          <div className='notepage'>
            <div>Cool Logo here</div>
            <CardDiv noteInput={noteInput} setNoteInput={setNoteInput} hoverOn={hoverOn} setHoverOn={setHoverOn} />
            {/* can add a conditional statement to only render the following when hoverOn is false */}
            <Button style ={{position: 'absolute', left:'0', bottom:'0'}} onClick={() => setCalendarViewOn(false)}> Calendar </Button>
            <Button style ={{position: 'absolute', right:'0', bottom:'0'}} onClick={() => setDailyDashOn(false)}> Daily Dash </Button>
          </div>
        </Col>
        <Col span={1}>
        <HoverDiv hoverOn={hoverOn} colorProps={'orange'} className='hoverDiv3' / >
        </Col>
      </Row>
      <Row className='botRow'>
        <Col span={24}> 
          <HoverDiv hoverOn={hoverOn} colorProps={'yellow'} className='hoverDiv4' / >
        </Col>
      </Row></> : <DailyContainer className="daily-container"/>}
    </div>
  )
}