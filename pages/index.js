import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Button} from "@mui/material";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{'Red Tetris'}</title>
        <meta name="description" content="Red Tetris by Cromalde@42" />
        <link rel="icon" href="/red-Tetris.jpg" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {'Red Tetris '}
        </h1>

        <Button variant={"outlined"} size="large" className={styles.enter}>
          {'Enter'}</Button>
      </main>

    </div>
  )
}
