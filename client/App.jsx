import React, { useState } from 'react';
import { SignUpPage } from './components/SignUpPage.jsx';
import { LoginPage } from './components/LoginPage.jsx';
import { NotePage } from './components/NotePage.jsx';
import { SignUpContainer } from './containers/SignUpContainer.jsx'
import { LoginContainer } from './containers/LoginContainer.jsx'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ReactDOM from 'react-dom';
import '../client/style.scss'

export function App() {
  return (
    <MuiThemeProvider>
      <SignUpPage />
    </MuiThemeProvider>
  )
}