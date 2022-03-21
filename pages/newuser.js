import React from 'react';
import styles from "../styles/Newuser.module.css";
import Favico from "../components/Favico";
import Input from "@mui/material/Input";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";

function Newuser () {

	const router = useRouter()
	const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
	const { register, handleSubmit, reset, formState: { errors } } = useForm();

	const onSubmit = async ({Username, email, Password}) => {

		const res = await fetch('/api/signUp', {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				Username,
				email,
				Password,
			})
		})
		if (res.status !== 201) {
			const {message} = await res.json()
			if (message.search('email') !== -1)
				window.alert('Email address already in use')
			else
				console.error(res.status, message)
		}
		reset()
		router.push('/home')
	}

	return (
		<div className={styles.main}>
			<Favico/>
			<div className={styles.container}>
				<h1 className={styles.login__neon}>
					{'Sign-Up '}
				</h1>
			</div>

			<Box className={styles.signup__box}>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.signup__form} >
					<Input startAdornment={<PersonIcon sx={{mr:'.5rem'}}/>}
						sx={{color:'white', my:'2rem'}} placeholder={'Username'}
						color={'secondary'}
						{...register("Username", {required:true})}/>
					<Input startAdornment={<PersonIcon sx={{mr:'.5rem'}}/>}
						sx={{color:'white'}} placeholder={'Email'}
						color={'secondary'}
						{...register("email", {required:true})}
					/>
					<Input
						startAdornment={<PasswordIcon sx={{mr:'.5rem'}}/>}
						color={'secondary'}
						type={'password'}
						sx={{color:'white', my:'2rem'}} placeholder={'Password'} {...register("Password",
						{required: 'Password is required',
							pattern: { value: strongRegex,
								message: 'Something Wrong, please check'
							}})}/>
					<Button type={"submit"} className={styles.signup__submit}>{'Enter'}</Button>
				</form>
				{errors.Password && (<p className={styles.errorMsg}>{errors.Password.message}</p>)}
			</Box>
		</div>
	);
}

export default Newuser;