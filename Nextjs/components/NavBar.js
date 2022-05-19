import React, {useCallback, useEffect} from 'react';
import styles from "../styles/NavBar.module.css";
import Image from 'next/image'
import tetris from '../public/red-Teris.png'
import PersonIcon from '@mui/icons-material/Person';
import {useRouter} from "next/router";
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {useRecoilState} from "recoil";
import {userState} from "../utils/userAtom";

function NavBar () {

	/* const { register, handleSubmit } = useForm(); */
	const router = useRouter()
	const [user, setUser] = useRecoilState(userState)


	const fetchUser = useCallback( async () =>{
		const res = await fetch('/api/validate')
		let user = {}
		if (res.status === 200) {
			user = await res.json()
		}
		setUser(user)
	},[setUser])

	/*
	const onSubmit = (data) => {
		router.push(`/profile/${data.searchBox}`)
	}
	*/
	useEffect( () => {
		fetchUser()
	}, [fetchUser])

	const handleLogout = async () => {
		fetch('/api/logOut')
			.then(router.reload)
	}

	return (
		<div className={styles.container}>
				<div className={styles.main}>
					{/* LOGO */}
					<div className={styles.logo} onClick={() => router.push('/home')}>
						<Image src={tetris} className={styles.imgLogo} alt={"Red_tetris"} width={60} height={60}  />
					</div>

					{/* SearchBox
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
					</div>*/}

					{/* Buttons */}
					<div className={styles.leftElements}>
						<PersonIcon sx={{ marginLeft: '1rem', cursor:'pointer'}}
						            onClick={() => router.push('/profile')}  />
						<ManageAccountsIcon sx={{ marginLeft: '1rem', cursor:'pointer'}}
						                    onClick={() => router.push('/settings')}  />
						<LogoutIcon sx={{ marginLeft: '1rem',  cursor:'pointer'}}
						            onClick={handleLogout} />
					</div>

				</div>
		</div>
	);
}

export default NavBar;