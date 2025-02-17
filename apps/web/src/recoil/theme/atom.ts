import { ITheme } from '@/common/interfaces'
import { atom } from 'recoil'
import themePersistEffect from './effect'

const themeState = atom<ITheme>({
	key: 'themeState',
	default: {
		mode: 'light',
		isUserPicked: false,
	},
	effects: [themePersistEffect],
})

export default themeState
