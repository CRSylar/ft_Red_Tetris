import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {red} from "@mui/material/colors";

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
          Welcome to <span className={styles.name}>{'Red'}</span>
          <span >{'-'}</span>
          <span className={styles.game_1}>{'T'}</span>
          <span className={styles.game_2}>{'e'}</span>
          <span className={styles.game_3}>{'t'}</span>
          <span className={styles.game_4}>{'r'}</span>
          <span className={styles.game_5}>{'i'}</span>
          <span className={styles.game_6}>{'s'}</span>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

    </div>
  )
}
