import React from 'react';
import styles from "../styles/NavBar.module.css";
import Image from 'next/image'
import tetris from '../public/red-Teris.png'
import SearchIcon from '@mui/icons-material/Search';
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

function NavBar () {

	const { register, handleSubmit } = useForm();
	const router = useRouter()


	const onSubmit = (data) => {
		router.push(`/profile/${data.searchBox}`)
	}

	return (
		<div className={styles.container}>
				<div className={styles.main}>
					{/* LOGO */}
					<div className={styles.logo}>
						<Image src={tetris} className={styles.imgLogo} alt={"Red_tetris"} width={60} height={60}/>
					</div>

					{/* SearchBox */}
					<div style={{maxWidth:'20rem'}}>
						<div className={styles.searchBox}>
							<div className={styles.searchIcon}>
								<SearchIcon style={{height:'1.25rem', width:'1.25rem', color:'gray'}}/>
							</div>
							<form onSubmit={handleSubmit(onSubmit)}>
								<input className={styles.searchField}
								       disabled={false}
								       type={'text'}
								       placeholder={'Search...'}
								       {...register("searchBox", {required:true})}
								/>
							</form>
						</div>
					</div>

					{/* Buttons */}
					<div className={styles.leftElements}>
						<ManageAccountsIcon sx={{ marginLeft: '1rem'}}/>
						<LogoutIcon sx={{ marginLeft: '1rem'}}/>
					</div>

				</div>
		</div>
	);
}

export default NavBar;