import { useQuery } from 'react-query'
import { IUser } from 'shared'
import { axiosInstance } from '../services/axios'

export type TMockAccount = Pick<IUser, 'id' | 'avatar' | 'email' | 'userName'>

export const getAccountsQuery = async (): Promise<TMockAccount[]> => {
	const { data } = await axiosInstance.get('/users/accounts', {
		withCredentials: true,
	})
	return data
}

const useGetAccounts = () =>
	useQuery('accounts', getAccountsQuery, {
		suspense: false,
	})

export default useGetAccounts
