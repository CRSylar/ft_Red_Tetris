import '../styles/globals.css'
import {createTheme} from "@mui/material";
import {ThemeProvider} from '@mui/material/styles'
import tetrisContext from "../utils/tetrisContext";
import {useCallback, useEffect, useState} from "react";


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

  const fetchUser = useCallback(async () => {
    const res = await fetch('/api/validate')
    if (res.status === 200) {
      const jsonRes = await res.json()
      setUser(jsonRes)
    } else
      setUser({})
  }, [])

  useEffect( () => {
    fetchUser()
  }, [fetchUser])

  return (
    <tetrisContext.Provider value={{user, setUser}}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </tetrisContext.Provider>
  )
}

export default MyApp
