import '../styles/globals.css'
import {createTheme} from "@mui/material";
import {ThemeProvider} from '@mui/material/styles'
import {RecoilRoot} from "recoil";

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff'
    },
    secondary: {
      main: '#000000'
    }
  }
})

function MyApp({ Component, pageProps }) {

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default MyApp
