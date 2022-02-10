import React from 'react';
import Head from "next/head";

function Favico () {
	return (
		<Head>
			<title>{'Red Tetris'}</title>
			<meta name="description" content="Red Tetris by Cromalde@42" />
			<link rel="icon" href="/red-Tetris.svg" />
		</Head>
	);
}

export default Favico;