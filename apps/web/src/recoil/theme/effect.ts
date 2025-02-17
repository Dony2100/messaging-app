import { ITheme } from '@/common/interfaces'
import { AtomEffect } from 'recoil'

const themePersistEffect: AtomEffect<ITheme> = ({ setSelf, onSet }) => {
	const savedValue = localStorage.getItem('themeState')
	if (savedValue != null) {
		setSelf(JSON.parse(savedValue))
	}

	onSet((newValue, _, isReset) => {
		isReset
			? localStorage.removeItem('themeState')
			: localStorage.setItem('themeState', JSON.stringify(newValue))
	})
}

export default themePersistEffect
