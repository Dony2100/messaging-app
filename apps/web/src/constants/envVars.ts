const getEnvVar = (varName: string) => {
	const varValue = import.meta.env[varName]
	if (!varValue) throw new Error('missing env var')
	return varValue
}

export const API_ORIGIN = getEnvVar('VITE_API_ORIGIN')

export const WS_ORIGIN = getEnvVar('VITE_WS_ORIGIN')
