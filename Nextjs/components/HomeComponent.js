import React, {useCallback, useEffect, useState} from 'react';
import Favico from "./Favico";
import NavBar from "./NavBar";
import styles from "../styles/Home.module.css"
import Box from "@mui/material/Box";
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import {Backdrop, Fade, Input, Modal, Typography} from "@mui/material";
import {useRecoilState} from "recoil";
import {userState} from "../utils/userAtom";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";

function HomeComponent () {

	const router = useRouter()
	const [open, setOpen] = useState(false);
	const [roomModal, setRoomModal] = useState(false)
	const { register, handleSubmit, reset, formState: {errors} } = useForm();
	const [user, setUser] = useRecoilState(userState)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const handleRoomModal = () => setRoomModal(true)

	const fetchUser = useCallback( async () =>{
		const res = await fetch('/api/validate')
		let user = {}
		if (res.status === 200) {
			user = await res.json()
		}
		setUser(user)
	},[setUser])

	const onSubmit = async ({roomName}) => {
			reset()
			router.push({
				pathname: '/match',
				hash :  `${roomName}[${user.username}]` })
	}

	useEffect( () => {
		fetchUser()
	}, [fetchUser])

	const ModalStyle = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'gainsboro',
		border: '1px solid gainsboro',
		borderRadius: 2,
		boxShadow: 24,
		p: 4,
	};

	return (
		<div className={styles.container}>
			<Favico/>
			{/* NAVBAR */}
			<NavBar/>

			{/* START NEW GAME */}
			<div className={styles.play__box}>
				<h1 className={styles.play__button}
				    onClick={handleRoomModal} >
				{'Play'}</h1>
			</div>

			<Modal open={roomModal}
			       onClose={() => setRoomModal(false)}
			       closeAfterTransition
			       BackdropComponent={Backdrop}
			       BackdropProps={{
							 timeout: 500,
			       }} >
				<Fade in={roomModal}>
					<Box sx={ModalStyle}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Input startAdornment={<VideogameAssetIcon sx={{mr: '0.5rem' }}/>}
							       placeholder={'Room name...'}
							       sx={{color: 'black'}}
							       {...register("roomName", {
											 required: true,
							       pattern: {value: new RegExp('^[a-zA-Z]+$')}})}/> {/* Pattern to match String made by letters only */}
						</form>
						{errors.roomName && (<p className={styles.errorMsg}>{'Room Name must be only Letters [a-zA-Z]'}</p>)}
					</Box>
				</Fade>
			</Modal>

			{/* RULES & SETTINGS */}

			<div className={styles.info__box}>
				<h1 className={styles.info__button}
				    onClick={handleOpen}  >
					{'Rules'}
					<Box sx={{marginLeft:'1.5rem' }}>{'&'}</Box>
					{'Usage'}
				</h1>
			</div>

			<Modal open={open}
			       onClose={handleClose}
			       closeAfterTransition
			       BackdropComponent={Backdrop}
			       BackdropProps={{
							 timeout: 500,
			       }} >
				<Fade in={open}>
					<Box sx={ModalStyle}>
						<Typography variant={"h6"} component={"h2"}
						            sx={{textAlign:'center', borderBottom: '1px solid gray'}} >
							{'Rules & Usage'}
						</Typography>
						<Typography sx={{mt: 2}}>
							{'Tetris has very simple rules: you can only move the pieces in specific ways; ' +
								'your game is over if your pieces reach the top of the screen; and you can only ' +
								'remove pieces from the screen by filling all the blank space in a line. '}
							<br/>
							{
								'As soon as a player destroys lines on his ground, the opposing players receive n - 1 lines\n' +
								'in penalty, then indestructible, which fit at the bottom of their playground.'}
						</Typography>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}

export default HomeComponent;