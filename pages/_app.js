import '../styles/globals.css'
import {createTheme} from "@mui/material";
import {ThemeProvider} from '@mui/material/styles'
import tetrisContext from "../utils/tetrisContext";
import {useState} from "react";


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

  const [user, setUser] = useState({})

  return (
    <tetrisContext.Provider value={{user, setUser}}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </tetrisContext.Provider>
  )
}

export default MyApp
