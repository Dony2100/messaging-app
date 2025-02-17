import { Avatar } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { RecoilRoot, useRecoilCallback } from 'recoil'
import App from './App'

const IS_DEV = import.meta.env.MODE === 'development'

const DebugButton = () => {
	const onClick = useRecoilCallback(
		({ snapshot }) =>
			async () => {
				console.debug('Atom values:')
				for (const node of snapshot.getNodes_UNSTABLE()) {
					const value = await snapshot.getPromise(node)
					console.debug(node.key, value)
				}
			},
		[]
	)

	return (
		<Avatar
			sx={{
				position: 'fixed',
				cursor: 'pointer',
				left: 64,
				bottom: 12,
				zIndex: 99999,
				opacity: 0.5,
			}}
			src='https://recoiljs.org/img/favicon.png'
			onClick={onClick}
		/>
	)
}

const queryClient = new QueryClient({
	defaultOptions: { queries: { suspense: true, useErrorBoundary: false } },
})

export default function MainApp() {
	return (
		<RecoilRoot>
			{IS_DEV && <DebugButton />}
			<QueryClientProvider client={queryClient}>
				<App />
				{IS_DEV && <ReactQueryDevtools initialIsOpen={false} />}
			</QueryClientProvider>
		</RecoilRoot>
	)
}
