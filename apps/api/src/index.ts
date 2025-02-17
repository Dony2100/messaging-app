import './config/dbPlugin'

import chalk from 'chalk'
import { setDefaultResultOrder } from 'dns'
import { connectDB } from './config/db'

import { IS_PROD, PORT } from './config/secrets'
import createServer from './config/server'

if (!IS_PROD) setDefaultResultOrder('ipv4first')

const main = async () => {
	const mode = IS_PROD
		? chalk.underline.green('Production')
		: chalk.underline.yellow('Development')

	const logMsg = IS_PROD
		? chalk.blue(`Server 🚀 in ${mode} mode on port: ${PORT}`)
		: chalk.blue(`Server 🚀 in ${mode} mode at: http://localhost:${PORT}`)

	await connectDB()
	createServer().listen(PORT, () => console.log(logMsg))
}

main()
