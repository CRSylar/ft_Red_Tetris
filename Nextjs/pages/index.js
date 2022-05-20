import styles from '../styles/Home.module.css'
import {Button} from "@mui/material";
import {useRouter} from "next/router";
import Favico from "../components/Favico";
import LoginIcon from '@mui/icons-material/Login';
import {useEffect} from "react";

export default function Home({cookie}) {

  const router = useRouter()

  useEffect(() => {
    if (cookie)
      router.push('/home')
  }, [])

  return (
    <div className={styles.container}>
      <Favico/>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {'Red Tetris '}
        </h1>

        <Button variant={"outlined"} size="large" className={styles.enter}
                onClick={() => router.push('/login')} >
          {'Enter'}
          <LoginIcon sx={{ml: '1rem'}}/>
        </Button>
      </main>

    </div>
  )
}

export async function getServerSideProps({req}) {
  const cookie = req.headers.cookie || null

  return {
    props : {
      cookie
    }
  }
}
