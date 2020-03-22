import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { teal, blue, red, amber, indigo } from '@material-ui/core/colors'

// const theme = createMuiTheme({
//     palette: {
//       primary: {
//           main: red[200],
//           dark: red[700]
//       },
//       secondary: {
//           main: blue[300]
//         // main: '#00004d',
//         // light: blue[300],
//         // dark: blue[900]
//       },
//     },
//   })
const theme = createMuiTheme({
    palette: {
      primary: {
          main: 'rgba(55, 107, 76, 0.6)',
          light: 'rgba(55, 107, 76, 0.3)',
          dark: 'rgba(55, 107, 76, 0.7)'
      },
      secondary: {
        main: '#004d66'
      },
      type: 'dark'
    },
    spacing: 8
  })

render(
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>,
    document.getElementById('root')
)

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
