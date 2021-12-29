import React, { useState } from 'react';

//dailyCard renders a card, card is the oject from the array
const DailyCard = (props) => {
  
  const { notes, index } = props;
  
  return (
    <>
      <div className="notecard">
        <div className="content-container">
          <div className="contents">
            {notes[index].contents}
          </div>
          <div className="category-name">
          </div>
        </div>
      </div>
    </>
  )
}
export default DailyCard;