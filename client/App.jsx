import React, { useState } from 'react';
import { SignUpPage } from './components/SignUpPage.jsx';
import NotePage from './components/NotePage.jsx';
import { SignUpContainer } from './containers/SignUpContainer.jsx'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ReactDOM from 'react-dom';



import '../client/style.scss'

//delete this later
import DailyContainer from '../client/containers/DailyContainer.jsx';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);


  return (
    <MuiThemeProvider>
      {(isLoggedIn) ? <NotePage /> : <SignUpContainer />}
    </MuiThemeProvider>
  )
}