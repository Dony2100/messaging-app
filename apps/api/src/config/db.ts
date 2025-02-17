import chalk from 'chalk'
import mongoose from 'mongoose'
import { logError } from '../common/utils'
import { MONGODB_URI } from './secrets'

export const connectDB = async () => {
	try {
		await mongoose.connect(MONGODB_URI)
		console.log(chalk.green('Connected To DB'))
	} catch (error) {
		if (error instanceof Error) logError(error.message)
	}
}

export const disconnectDB = () => mongoose.disconnect()

export const clearDB = async () => {
	console.log(chalk.red('Clearing DB...'))
	await mongoose.connection.db.dropDatabase()
}
