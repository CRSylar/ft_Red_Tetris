import React from 'react';
import {useRecoilState} from "recoil";
import {userState} from "../utils/userAtom";

function ProfileComponent () {

	const [user, _] = useRecoilState(userState)


	return (
		<div>{user.username}</div>
	)
}

export default ProfileComponent