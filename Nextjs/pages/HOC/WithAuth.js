import {useRouter} from "next/router";
import userSWR from "swr";

const fetcher = (url) => fetch(url)

const WithAuth = ( WrappedComponent) => {

	const { data, error } = userSWR('api/validate', fetcher)
	const router = useRouter()

	if (!data) return <div>loading...</div>
	else if (error || data.status !== 200){
		router.replace('/')
		return <></>
	}
	else return <WrappedComponent />
}

export default WithAuth