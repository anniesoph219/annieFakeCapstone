import { createMuiTheme } from "@material-ui/core/styles";

const arcPink = "#ff99bb";
const arcHotPink = "#ed4b82";

export default createMuiTheme({
  palette: {
    common: {
      pink: arcPink,
      hotPink: arcHotPink,
    },
    primary: {
      main: arcPink,
    },
    secondary: {
      main: arcHotPink,
    },
    typography: {
      h3: {
        fontWeight: 300,
      },
    },
  },
});
