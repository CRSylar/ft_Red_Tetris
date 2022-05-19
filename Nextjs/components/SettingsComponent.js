import React, {useState} from 'react';
import styles from '/styles/Settings.module.css';
import NavBar from "./NavBar";
import Box from "@mui/material/Box";
import {useForm} from "react-hook-form";
import {Alert, Button, Input, Snackbar} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Favico from "./Favico";
import {useRecoilState} from "recoil";
import {userState} from "../utils/userAtom";

function SettingsComponent ({id}) {

	const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
	const { register, handleSubmit, reset, formState: { errors } } = useForm();
	const { register:_register, handleSubmit:_handleSubmit, reset:_reset, formState: { errors:_errors } } = useForm();
	const [user, setUser] = useRecoilState(userState)
	const [open, setOpen] = useState(false)
	const [severity, setSeverity] = useState('info')
	const [alertMessage, setAlertMessage] = useState('')

	const NameSubmit = async ({newUserName}) => {
		console.log('NewName: ',newUserName)
		const res  = await fetch('/api/newName', {
			method: "POST",
			headers: {'Content-type': 'Application/json'},
			body: JSON.stringify({newUserName})
		})
		const jsonRes = await res.json()
		setSeverity(jsonRes.status)
		setAlertMessage(jsonRes.message)
		setOpen(true)
		if (res.status === 201)
			setUser(jsonRes.user)
		reset()
	}

	const PassSubmit = async (data) => {
		if (data.password === data.confPassword) {
			const res = await fetch('/api/newPassword', {
				method: "POST",
				headers: {"Content-type": 'Application/json'},
				body: JSON.stringify({data})
			}).then(response => response.json())
			setSeverity(res.status)
			setAlertMessage(res.message)
			setOpen(true)
		}
		else {
			setSeverity('error')
			setAlertMessage('Passwords is not matching !')
			setOpen(true)
		}
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
						       placeholder={user.username}
						       sx={{color:'white'}}
						       {...register("newUserName", {required:true})}/>
					<Button type={"submit"}
					        sx={{color:'gray', textTransform:'none', marginLeft:'2rem',
						        backgroundColor: '#161525',
						        ":hover":{color:'white', borderRadius: '20%', textShadow:'0 0 7px #f00,' +
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
								        backgroundColor: '#161525',
								        ":hover":{color:'white', borderRadius: '20%', textShadow:'0 0 7px #f00,' +
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
			<Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>
				<Alert onClose={() => setOpen(false)} variant={'filled'} severity={severity}>
					{alertMessage}
				</Alert>
			</Snackbar>
		</div>
	);
}

export default SettingsComponent;