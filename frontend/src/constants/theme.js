import { defaultTheme } from "react-admin"
import { createTheme } from '@material-ui/core/styles';
import merge from "lodash/merge";

const theme = createTheme(
  merge({}, defaultTheme, {
    palette: {
      // Your theme goes here
      // Write the following code to have an orange app bar. We'll explain it later in this article.
      type : 'light',

      secondary: {
        main: "#ff9800", // Not far from orange
      },
    }
  })
);

// const theme = createMuiTheme({
//   palette: {
//     type: 'light', // Switching the dark mode on is a single property value change.
//   },
// });


export default theme