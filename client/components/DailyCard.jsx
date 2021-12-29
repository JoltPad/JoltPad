import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

//dailyCard renders a card, card is the oject from the array
const DailyCard = (props) => {
  
  const { notes, index } = props;
  //page will contain 
  
  return (
    <>
      <Card className="notecard">
        <CardContent className="content-container">
          <div className="contents">
            {notes[index].contents}
          </div>
          <div className="category-name">
            {notes[index].category_name}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
export default DailyCard;