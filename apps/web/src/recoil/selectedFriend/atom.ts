import { atom } from 'recoil'
import { IUser } from 'shared'

const selectedFriendState = atom<IUser | null>({
	key: 'selectedFriendState',
	default: null,
})

export default selectedFriendState
