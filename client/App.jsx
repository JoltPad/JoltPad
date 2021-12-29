import React, { useState } from 'react';
import NotePage from './components/NotePage.jsx';
import { LoginContainer } from './containers/LoginContainer.jsx'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import '../client/style.scss'


export function App() {

  if (localStorage.isAuthenticated) return <NotePage />
  else return (
    <MuiThemeProvider>
      <LoginContainer />
    </MuiThemeProvider>
  )
}