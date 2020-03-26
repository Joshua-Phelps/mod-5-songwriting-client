import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgba(55, 107, 76, 0.6)',
      light: 'rgba(55, 107, 76, 0.3)',
      dark: 'rgba(55, 107, 76, 0.8)'
    },
    secondary: {
      main: '#004d66'
    },
  },
  spacing: 8
})

render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
)

serviceWorker.unregister();
