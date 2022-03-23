import React, {useState} from 'react';
import styles from '/styles/Login.module.css';
import Box from "@mui/material/Box";
import {useForm} from "react-hook-form";
import Input from "@mui/material/Input";
import {Alert, Button, Snackbar} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import Favico from "../components/Favico";
import {useRouter} from "next/router";
import {userState} from "../utils/userAtom";
import {useRecoilState} from "recoil";

function Login () {

	const router = useRouter()
	const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
	const { register, handleSubmit, reset, formState: { errors } } = useForm();
	const [bg, setBg] = useState(false)
	const [open, setOpen] = useState(false)
	const [alertMessage, setAlertMessage] = useState("")
	const [severity, setSeverity] = useState("info")
	const [_, setUser] = useRecoilState(userState)

	const onSubmit = async ({Email, Password}) => {

		const res = await fetch('/api/logIn', {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				Email,
				Password,
			})
		})
		const jsonRes = await res.json()
		if (res.status === 200) {
			setUser(jsonRes)
			await router.push('/home')
		}
		else if (res.status === 404) {
			setSeverity(jsonRes.status)
			setAlertMessage(jsonRes.message)
			setOpen(true)
		}
		else if (res.status === 401) {
			setSeverity(jsonRes.status)
			setAlertMessage(jsonRes.message)
			setOpen(true)
		}
		reset()
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div className={styles.main}>
			<Favico/>
			<div className={styles.container}>
				<h1 className={styles.login__neon}>
					{'Log-In '}
				</h1>
			</div>
			<div className={styles.new__box} onClick={() => router.push('/newuser')}>
				<h3 className={styles.signup__neon}>
					{'New ?'}
				</h3>
			</div>
			<Box className={styles.login__box} onMouseEnter={() => setBg(true)}
			     onMouseLeave={()=> setBg(false)}
			>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.login__form} >
					<Input startAdornment={<PersonIcon sx={{mr:'.5rem'}}/>}
					       sx={{color: bg? 'black' : 'white', my:'2rem'}} placeholder={'Email'}
					       color={'secondary'}
					       {...register("Email", {required:true})}/>
					<Input
						startAdornment={<PasswordIcon sx={{mr:'.5rem'}}/>}
						color={'secondary'}
						type={'password'}
						sx={{color: bg? 'black' : 'white', mb:'2rem'}}
						placeholder={'Password'}
						{...register("Password",
						{required: 'Password is required',
							pattern: { value: strongRegex,
								message: 'Something Wrong, please check'
							}})}/>
					<Button type={"submit"} className={styles.login__submit} sx={{color: bg? 'black' : 'white'}}>{'Enter'}</Button>
				</form>
				{errors.Password && (<p className={styles.errorMsg}>{errors.Password.message}</p>)}
			</Box>
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>
				<Alert onClose={handleClose} variant={'filled'} severity={severity}>
					{alertMessage}
				</Alert>
			</Snackbar>
		</div>
	);
}

export default Login;