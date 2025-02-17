import { TCurrentUser } from '@/common/types'
import { atom } from 'recoil'
import currentUserPersistEffect from './effect'

const currentUserState = atom<TCurrentUser | null>({
	key: 'currentUserState',
	default: null,
	effects: [currentUserPersistEffect],
})

export default currentUserState
