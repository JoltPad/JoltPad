import React, { useState } from 'react';
import NavBar from './NavBar.jsx'
import HoverDiv from './HoverDiv.jsx';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';

export default function NotePage() {

  const [hoverOn, setHoverOn] = useState(false)
  
  return (
    
    <div className='LandingPage'>
      {(hoverOn)? <HoverDiv colorProps={'blue'} className='hoverDiv1' / > : <NavBar />}
      <Row className='middleRow'>
        <Col span={1}>
          <HoverDiv hoverOn="hoverOn" colorProps={'blue'} className='hoverDiv2' / > 
        </Col>
        <Col span={22}>
          <div> Card Div, create a component for this [has 3 buttons]</div>
        </Col>
        <Col span={1}>
        <HoverDiv hoverOn="hoverOn" colorProps={'blue'} className='hoverDiv3' / >
        </Col>
      </Row>
      <Row>
        <Col span={24}> 
          <HoverDiv hoverOn="hoverOn" colorProps={'blue'} className='hoverDiv4' / >
        </Col>
      </Row>
    </div>
  )
}