// import React from "react";
// // import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
// // import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
// const createMuiTheme = Material.import('styles/createMuiTheme')
// // import purple from "material-ui/colors/purple";
// // import green from "material-ui/colors/green";
// // import CssBaseline from "material-ui/CssBaseline";
// import CssBaseline from '@material-ui/core/CssBaseline';

// // A theme with custom primary and secondary color.
// // It's optional.
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#00695c',
//     },
//     secondary: {
//       main: '#80cbc4',
//     },
//   },
// });

// function withRoot(Component) {
//   function WithRoot(props) {
//     // MuiThemeProvider makes the theme available down the React tree
//     // thanks to React context.
//     return (
//       <MuiThemeProvider theme={theme}>
//         {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
//         <CssBaseline />
//         <Component {...props} />
//       </MuiThemeProvider>
//     );
//   }

//   return WithRoot;
// }

// export default withRoot;