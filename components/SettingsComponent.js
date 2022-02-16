import React from 'react';
import styles from '/styles/Settings.module.css';
import NavBar from "./NavBar";
import Box from "@mui/material/Box";
import {useForm} from "react-hook-form";
import {Button, Input} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Favico from "./Favico";

function SettingsComponent ({id}) {

	const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
	const { register, handleSubmit, reset, formState: { errors } } = useForm();
	const { register:_register, handleSubmit:_handleSubmit, reset:_reset, formState: { errors:_errors } } = useForm();


	const NameSubmit = (data) => {
		console.log(data.username)
		reset()
	}

	const PassSubmit = (data) => {
		if (data.password === data.confPassword)
			console.log('PASS CHECK OK!')
		else
			console.log('PASS CHECK KO !')
		_reset()
	}

	return (
		<div className={styles.container}>
			<Favico/>

			<NavBar/>

			<Box className={styles.setting__box}>
				<form onSubmit={handleSubmit(NameSubmit)} >
					<div className={styles.username__box}>
						<Input startAdornment={<PersonIcon sx={{mr:'.5rem', color:'white'}}/>}
						       placeholder={'Username'}
						       sx={{color:'white'}}
						       {...register("username", {required:true})}/>
					<Button type={"submit"}
					        sx={{color:'gray', textTransform:'none', marginLeft:'2rem',
						        backgroundColor: 'black',
						        ":hover":{color:'white', textShadow:'0 0 7px #f00,' +
								        '0 0 10px #bc13fe,' +
								        '0 0 21px #f00,' +
								        '0 0 42px #f00,' +
								        '0 0 82px #bc13fe,' +
								        '0 0 92px #bc13fe,' +
								        '0 0 102px #f00,' +
								        '0 0 151px #f00;' }}}>
						{'Change'}  </Button>
					</div>
				</form>
				<form onSubmit={_handleSubmit(PassSubmit)}>
						<div className={styles.passwd__box}>
							<div>
								<Input startAdornment={<PersonIcon sx={{mr:'.5rem', color:'white'}}/>}
								       type={'password'}
								       sx={{mt:'2rem', color:'white'}} placeholder={'Password'}
								       {..._register("password", {required:true,
									       pattern: { value: strongRegex,
										       message: 'Something Wrong, please check'
									       }})}/>
								<Input startAdornment={<PersonIcon sx={{mr:'.5rem', color:'white'}}/>}
								       type={'password'}
								       sx={{my:'2rem', color:'white'}} placeholder={'Confirm Password'}
								       {..._register("confPassword", {required:true,
									       pattern: { value: strongRegex,
										       message: 'Something Wrong, please check'
									       }})}/>
							</div>
							<Button type={"submit"}
							        sx={{color:'gray', textTransform:'none', marginLeft:'1rem',
								        backgroundColor: 'black',
								        ":hover":{color:'white', textShadow:'0 0 7px #f00,' +
										        '0 0 10px #bc13fe,' +
										        '0 0 21px #f00,' +
										        '0 0 42px #f00,' +
										        '0 0 82px #bc13fe,' +
										        '0 0 92px #bc13fe,' +
										        '0 0 102px #f00,' +
										        '0 0 151px #f00;' }}}>
								{'Change'}  </Button>
							</div>
				</form>
			</Box>
		</div>
	);
}

export default SettingsComponent;