import React, { useEffect, useState } from 'react';
import NotePage from './components/NotePage.jsx';
import { LoginContainer } from './containers/LoginContainer.jsx'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import '../client/style.scss'


export function App() {
  // const [authenticated, setAuthenticated] = useState(false)

  // useEffect(() => {
  //   setAuthenticated(localStorage.isAuthenticated);
  // }, [authenticated]);

  if (localStorage.isAuthenticated) return <NotePage />
  else return (
    <MuiThemeProvider>
      <LoginContainer />
    </MuiThemeProvider>
  )
}