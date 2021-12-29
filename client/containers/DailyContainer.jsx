import React, { useEffect, useState } from 'react';
import DailyCard from '../components/DailyCard.jsx';

const DailyContainer = (props) => {
  
  const data = [
    { contents: 'practice yoga', category_name: 'To-Do' }, 
    { contents: 'buy champagne', category_name: 'Shopping' }, 
    { contents: 'When will the NeuralLink be my reality?', category_name: 'Thoughts' },
    { contents: 'order ninja stars', category_name: 'Shopping' }, 
    { contents: 'build the sauna', category_name: 'To-Do' }, 
    { contents: 'Change is the only constant', category_name: 'Thoughts' }
  ]
  //declare state
  const [ notes, setNotes ] = useState([data]);
  const [ index, setIndex ] = useState(0);
  

  // //send fetch request to get daily notes from user_id 
  useEffect(() => {

    const getNotes = async () => {
      
      const notesFromDB = await fetchNotes();
      
      setNotes(notesFromDB);
      
    }
    getNotes();
  }, [])
  
  //send update note
  const updateNote = () => {
    fetch(`http://localhost:3000/updateNote/`)

  }

  //send delete note
  const deleteNote = () => {
    fetch(`http://localhost:3000/deleteNote/`)
  } 

  const handleNext = () => {
    event.preventDefault();
    //if the current index is the last element in the array, return to the beginning 
    setIndex(index === notes.length - 1 ? 0 : index + 1);
  } 

  const handlePrev = () => {
    event.preventDefault();
    //if the current element is the first element, go backwards to the last element
    setIndex(index === 0 ? notes.length - 1 : index - 1);
  } 

  const fetchNotes = async () => {
    const user_id = localStorage.userID;
    const res = await fetch(`http://localhost:3000/daily/${user_id}`);
    const data = await res.json();
    console.log('on load', data);
    return data;
  }
  console.log(notes);
  return(
    <div className='dailyContainer'>
      <h3>Your Daily Cards</h3>
      <DailyCard className="daily-card" notes={notes} index={index} />
      <div className="btn-container" >
        <button className="btn" onClick={handlePrev}>Previous</button>
        <button className="btn" onClick={handleNext}>Next</button>
      </div>
    </div>
  )
}

export default DailyContainer;