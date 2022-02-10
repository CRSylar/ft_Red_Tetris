import React from 'react';
import styles from '/styles/Login.module.css';
import Box from "@mui/material/Box";
import {useForm} from "react-hook-form";
import Input from "@mui/material/Input";
import {Button} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import Favico from "../components/Favico";
import {useRouter} from "next/router";

function Login () {

	const router = useRouter()
	const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
	const { register, handleSubmit, reset, formState: { errors } } = useForm();

	const onSubmit = (data) => {
		console.log(data)
		reset()
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
			<Box className={styles.login__box}>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.login__form} >
					<Input startAdornment={<PersonIcon sx={{mr:'.5rem'}}/>}
					       sx={{color:'white', my:'2rem'}} placeholder={'Email'}
					       color={'secondary'}
					       {...register("Email", {required:true})}/>
					<Input
						startAdornment={<PasswordIcon sx={{mr:'.5rem'}}/>}
						color={'secondary'}
						type={'password'}
						sx={{color:'white', mb:'2rem'}} placeholder={'Password'} {...register("Password",
						{required: 'Password is required',
							pattern: { value: strongRegex,
								message: 'Something Wrong, please check'
							}})}/>
					<Button type={"submit"} className={styles.login__submit}>{'Enter'}</Button>
				</form>
				{errors.Password && (<p className={styles.errorMsg}>{errors.Password.message}</p>)}
			</Box>
		</div>
	);
}

export default Login;