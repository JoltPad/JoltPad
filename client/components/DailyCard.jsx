import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

//dailyCard renders a card, card is the oject from the array
const DailyCard = (props) => {
  
  const { notes, index } = props;
  
  
  return (
    <>
      <div className="notecard">
        <div className="content-container">
          <div className="contents">
            {/* {notes[index].note_id} */}
          </div>
          <div className="category-name">
            
          </div>
        </div>
      </div>
    </>
  )
}
export default DailyCard;