import React from 'react';
import {useRecoilState} from "recoil";
import {userState} from "../utils/userAtom";
import styles from '../styles/Profile.module.css';
import Favico from "./Favico";
import NavBar from "./NavBar";
import Box from "@mui/material/Box";
import StarsIcon from '@mui/icons-material/Stars';
import PersonIcon from '@mui/icons-material/Person';


function ProfileComponent () {

	const [user, setUser] = useRecoilState(userState)

	return (
		<div className={styles.main}>
			<Favico />
			<NavBar />

			<div>
				<Box className={styles.setting__box}>
					<div style={{display: 'flex', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
						<PersonIcon sx={{color: 'white',width:'5rem', height:'5rem'}}/>
					</div>
					<div style={{color:"white", display:'flex', margin: '1rem',justifyContent:'center'}}>
						{user.username}
					</div>
					<div style={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
						<StarsIcon sx={{color: 'white', m:'1.5rem'}}/>
						<h3 style={{color:'gainsboro'}}>{'High Score'}</h3>
						<StarsIcon sx={{color: 'white', m:'1.5rem'}}/>
					</div>
					<div style={{color:"white", display:'flex',justifyContent:'center'}}>
						{user.bestScore}
					</div>
					<div style={{display: 'flex', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
						<StarsIcon sx={{color: 'white', m:'1.5rem'}}/>
						<h3 style={{color:'gainsboro'}}>{'Total Games'}</h3>
						<StarsIcon sx={{color: 'white', m:'1.5rem'}}/>
					</div>
					<div style={{color:"white", display:'flex',marginBottom:'1rem',justifyContent:'center'}}>
						{user.totalMatch}
					</div>
				</Box>
			</div>
		</div>
	)
}

export default ProfileComponent